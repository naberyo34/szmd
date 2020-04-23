import Slugger from 'github-slugger';
import { normalizeSlug } from '../blog-helpers';
import { values } from './rpc';
import queryCollection from './queryCollection';

export default async function loadTable(collectionBlock: any, isPosts = false) {
  // getWorksIndexで取ってきたWORKSテーブルの情報
  const { value } = collectionBlock;
  // 最終的に返却するテーブル ここに色々ぶちこんでいく
  let table: any = {};
  // valueをもとにNotionから取得してきた生データ かなりいかつい
  const col = await queryCollection({
    collectionId: value.collection_id,
    collectionViewId: value.view_ids[0],
  });
  const entries = values(col.recordMap.block).filter((block: any) => {
    return block.value && block.value.parent_id === value.collection_id;
  });

  // Object.keysは対象のオブジェクトが持つプロパティ名を配列として返す
  const colId = Object.keys(col.recordMap.collection)[0];
  /*
    対象テーブルのデータ構造が格納される
    ex:
    {
      '1|>d': { name: 'Description', type: 'text' },
      'A]4q': { name: 'Image', type: 'file' },
      'K@[d': {
      name: 'Category',
      type: 'multi_select',
      options: [ [Object], [Object], [Object] ]
      },
      title: { name: 'Title', type: 'title' }
    }
  */
  const { schema } = col.recordMap.collection[colId].value;
  // '1|>d'のようなスキーマに与えられるプロパティ名の配列
  const schemaKeys = Object.keys(schema);

  for (const entry of entries) {
    /*
      カラムの各要素がオブジェクトとして格納されている. プロパティ名はschemaと紐付く
      valueが存在しない場合はfalseが返る
      ex:
      properties: {
        '1|>d': [ [Array] ],
        'A]4q': [ [Array] ],
        'K@[d': [ [Array] ],
        title: [ [Array] ]
      } 
    */
    const props = entry.value && entry.value.properties;
    const row: any = {};

    // falseが帰ってきていた場合は次の処理に移る
    if (!props) continue;
    if (entry.value.content) {
      row.id = entry.value.id;
    }

    schemaKeys.forEach(key => {
      // might be undefined
      let val = props[key] && props[key][0][0];
      console.log('props', props);
      console.log('propskey', props[key], props[key][0][0]);
      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0];
        console.log('type', type);

        switch (type[0]) {
          case 'a': // link
            val = type[1];
            break;
          case 'u': // user
            val = props[key]
              .filter((arr: any[]) => arr.length > 1)
              .map((arr: any[]) => arr[1][0][1]);
            break;
          case 'p': // page (block)
            const page = col.recordMap.block[type[1]];
            row.id = page.value.id;
            val = page.value.properties.title[0][0];
            break;
          case 'd': // date
            // start_date: 2019-06-18
            // start_time: 07:00
            // time_zone: Europe/Berlin, America/Los_Angeles

            // 日付の整形処理と思われる
            if (!type[1].start_date) {
              break;
            }
            // initial with provided date
            const providedDate = new Date(
              `${type[1].start_date} ${type[1].start_time || ''}`
            ).getTime();

            // calculate offset from provided time zone
            const timezoneOffset =
              new Date(
                new Date().toLocaleString('en-US', {
                  timeZone: type[1].time_zone,
                })
              ).getTime() - new Date().getTime();

            // initialize subtracting time zone offset
            val = new Date(providedDate - timezoneOffset).getTime();
            break;
          default:
            console.error('unknown type', type[0], type);
            break;
        }
      }

      if (typeof val === 'string') {
        val = val.trim();
      }
      row[schema[key].name] = val || null;
    });

    if (isPosts && !key) continue;

    if (key) {
      table[key] = row;
    } else {
      if (!Array.isArray(table)) table = [];
      table.push(row);
    }
  }

  return table;
}
