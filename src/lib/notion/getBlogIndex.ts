import { Sema } from 'async-sema';
import rpc, { values } from './rpc';
import createTable from './createTable';
import getTableData from './getTableData';
import { getPostPreview } from './getPostPreview';
import { readFile, writeFile } from '../fs-helpers';
import { BLOG_INDEX_ID, BLOG_INDEX_CACHE } from './server-constants';

export default async function getBlogIndex(previews = true) {
  let postsTable: any = null;
  const useCache = process.env.USE_CACHE === 'true';
  const cacheFile = `${BLOG_INDEX_CACHE}${previews ? '_previews' : ''}`;

  // キャッシュを持っている場合はキャッシュからpostsTableをつくる
  if (useCache) {
    try {
      postsTable = JSON.parse(await readFile(cacheFile, 'utf8'));
    } catch (_) {
      /* not fatal */
    }
  }

  // キャッシュを持っていない場合は新規に取得する
  if (!postsTable) {
    try {
      /* このdataはObjectで返ってくる. data.recordMap.block.collection_viewがテーブルの実体となる
      ex: テーブルが2つある場合はcollection_view内に2つのオブジェクトが格納される */

      const data = await rpc('loadPageChunk', {
        pageId: BLOG_INDEX_ID,
        limit: 999, // TODO: figure out Notion's way of handling pagination
        cursor: { stack: [] },
        chunkNumber: 0,
        verticalColumns: false,
      });

      // Parse table with posts
      /* blockはNotionの要素を指す ワークスペース、コレクションビューなどが全てblock
      一番上のコレクションビュー(テーブル)が読み込まれるのはここでfindしているから */
      const tableBlock = values(data.recordMap.block).find(
        // 試しにハードコーディングしてみた ※環境変数で持たせたほうがいい
        (block: any) =>
          block.value.id === '17e7d2d9-5696-4e3f-b56b-65353bf76690'
      );

      postsTable = await getTableData(tableBlock, true);
    } catch (err) {
      console.warn(
        // テーブルを取得できなかった場合は勝手にUntitledのテーブルが新規作成される
        'Failed to load Notion posts, attempting to auto create table'
      );
      try {
        await createTable();
        console.log('Successfully created table in Notion');
      } catch (err) {
        console.error(
          'Auto creating table failed, make sure you created a blank page and site the id with BLOG_INDEX_ID in your environment',
          err
        );
      }

      return {};
    }

    // only get 10 most recent post's previews
    const postsKeys = Object.keys(postsTable).splice(0, 10);

    const sema = new Sema(3, { capacity: postsKeys.length });

    if (previews) {
      await Promise.all(
        postsKeys
          .sort((a, b) => {
            const postA = postsTable[a];
            const postB = postsTable[b];
            const timeA = postA.Date;
            const timeB = postB.Date;

            return Math.sign(timeB - timeA);
          })
          .map(async postKey => {
            await sema.acquire();
            const post = postsTable[postKey];
            post.preview = post.id
              ? await getPostPreview(postsTable[postKey].id)
              : [];
            sema.release();
          })
      );
    }

    if (useCache) {
      writeFile(cacheFile, JSON.stringify(postsTable), 'utf8').catch(() => {});
    }
  }

  return postsTable;
}
