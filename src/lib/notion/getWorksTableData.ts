import Slugger from 'github-slugger';
import { normalizeSlug } from '../blog-helpers';
import { values } from './rpc';
import queryCollection from './queryCollection';

export default async function loadTable(collectionBlock: any, isPosts = false) {
  const slugger = new Slugger();
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
  console.log('schema', schema);
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

      // Imageの項目だけスキーマの形が違うため整形してからrowに格納している. 要リファクタリング
      // authors and blocks are centralized
      if (val && props[key][0][1]) {
        const type = props[key][0][1][0];
        val = type[1];
      }

      if (typeof val === 'string') {
        val = val.trim();
      }
      row[schema[key].name] = val || null;
    });

    // TitleからSlugを取得し、rowにプロパティとして加える
    row.Slug = normalizeSlug(row.Slug || slugger.slug(row.Title || ''));
    const key = row.Slug;
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
