/* Redux-SagaのEffects API
  必ずyield句と併用して使う
  select ... Storeから必要なデータを取得
  put ... Action Creatorを実行してActionをDispatchする
  take ... 特定のActionを待ち受ける takeEvery ... 飛んできたActionの数だけ実行 takeLatest ... 最新のActionだけ実行
  takeEveryだとF5連打に対して律儀に全て応答するような動きになる
  call ... 外部の非同期処理関数を呼び出す(ここではaxiosの実行関数)
  fork ... 自身とは別のスレッドを起動し、そこで特定のタスクを実行する. Task object を返す
  join ... fork の戻り値のTaskオブジェクトを指定し、その処理が完了するのを待つ
*/
import { all, call, fork, put, takeLatest } from 'redux-saga/effects';
import types from '../modules/actionTypes';
import { getWorks } from '../modules/actions';
import getDataFactory from '../services/api';

/* function* はGenerator関数を作るための構文(ES6の機能)
  async/awaitと似ているが別物らしい. Sagaではあえてこちらを使っている
  Generator関数は実行された際に最初のyield句までしか処理を実行せず、
  next()をコールすると次のyieldまで進むような挙動をするらしい……
*/

// api.tsで定義した非同期処理を実行 成功したらsucceedアクションを起こし、失敗したらfailアクションを起こす
function* runGetWorks() {
  try {
    const api = getDataFactory('/works');
    const works = yield call(api);
    yield put(getWorks.succeed(works));
  } catch (error) {
    yield put(getWorks.fail(error));
  }
}

// GET_WORKS_STARTが飛んでくるのを待ち構え、飛んできたらrunGetWorksを実行する
export function* watchGetWorks() {
  yield takeLatest(types.GET_WORKS_START, runGetWorks);
}

// アプリ起動時に立ち上がる最上位タスク 各watchタスクのスタンバイを開始
export default function* rootSaga() {
  yield all([fork(watchGetWorks)]);
}
