// tsはas constすると完全な定数になる
const GET_INNER_HEIGHT = 'GET_INNER_HEIGHT' as const;
const TOGGLE_MENU = 'TOGGLE_MENU' as const;
const OPEN_MODAL = 'OPEN_MODAL' as const;
const CLOSE_MODAL = 'CLOSE_MODAL' as const;

export default {
  GET_INNER_HEIGHT,
  TOGGLE_MENU,
  OPEN_MODAL,
  CLOSE_MODAL,
};
