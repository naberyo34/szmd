const PAGE_TRANSITION = 'PAGE_TRANSITION';
const GET_INNER_HEIGHT = 'GET_INNER_HEIGHT';
const TOGGLE_MENU = 'TOGGLE_MENU';
const OPEN_MODAL = 'OPEN_MODAL';
const CLOSE_MODAL = 'CLOSE_MODAL';
// Redux-Saga では開始/成功/失敗のactionを用意する
const GET_WORKS_START = 'MICROCMS/GET_WORKS_START';
const GET_WORKS_SUCCEED = 'MICROCMS/GET_WORKS_SUCCEED';
const GET_WORKS_FAIL = 'MICROCMS/GET_WORKS_FAIL';

const GET_BLOG_START = 'MICROCMS/GET_BLOG_START';
const GET_BLOG_SUCCEED = 'MICROCMS/GET_BLOG_SUCCEED';
const GET_BLOG_FAIL = 'MICROCMS/GET_BLOG_FAIL';

export default {
  PAGE_TRANSITION,
  GET_INNER_HEIGHT,
  TOGGLE_MENU,
  OPEN_MODAL,
  CLOSE_MODAL,
  GET_WORKS_START,
  GET_WORKS_SUCCEED,
  GET_WORKS_FAIL,
  GET_BLOG_START,
  GET_BLOG_SUCCEED,
  GET_BLOG_FAIL,
} as const;
