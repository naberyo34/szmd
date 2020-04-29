import types from './actionTypes';

export const getInnerHeight = (payload: number) => ({
  type: types.GET_INNER_HEIGHT,
  payload,
});

export const toggleMenu = () => ({
  type: types.TOGGLE_MENU,
});

export const openModal = (payload: string) => ({
  type: types.OPEN_MODAL,
  payload,
});

export const closeModal = () => ({
  type: types.CLOSE_MODAL,
});

/* Redux-Sagaではオブジェクトの中にstart, succeed, failのaction creatorを含めるとわかりやすい
  非同期処理には処理開始、成功、失敗の状態があるのでわざわざ3つに分けている */

export const getWorks = {
  start: () => ({
    type: types.GET_WORKS_START,
  }),

  succeed: (result) => ({
    type: types.GET_WORKS_SUCCEED,
    payload: result,
  }),

  fail: (error) => ({
    type: types.GET_WORKS_FAIL,
    payload: error,
    error: true,
  }),
};
