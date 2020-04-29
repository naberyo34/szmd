const GET_INNER_HEIGHT = 'GET_INNER_HEIGHT';
const TOGGLE_MENU = 'TOGGLE_MENU';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
// Redux-Saga では開始/成功/失敗のactionを用意する
const GET_WORKS_START = 'MICROCMS/GET_WORKS_START';
const GET_WORKS_SUCCEED = 'MICROCMS/GET_WORKS_SUCCEED';
const GET_WORKS_FAIL = 'MICROCMS/GET_WORKS_FAIL';

export default {
  GET_INNER_HEIGHT,
  TOGGLE_MENU,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_WORKS_START,
  GET_WORKS_SUCCEED,
  GET_WORKS_FAIL,
} as const;
