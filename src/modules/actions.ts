import types from './actionTypes';

interface Action {
  type: string;
  payload?: any;
  error?: boolean;
}

export const pageTransition = (): Action => ({
  type: types.PAGE_TRANSITION,
});

export const getInnerHeight = (payload: number): Action => ({
  type: types.GET_INNER_HEIGHT,
  payload,
});

export const toggleMenu = (): Action => ({
  type: types.TOGGLE_MENU,
});

export const openModal = (payload: string): Action => ({
  type: types.OPEN_MODAL,
  payload,
});

export const closeModal = (): Action => ({
  type: types.CLOSE_MODAL,
});

/* Redux-Sagaではオブジェクトの中にstart, succeed, failのaction creatorを含めるとわかりやすい
  非同期処理には処理開始、成功、失敗の状態があるのでわざわざ3つに分けている */

export const getWorks = {
  start: (): Action => ({
    type: types.GET_WORKS_START,
  }),

  succeed: (result): Action => ({
    type: types.GET_WORKS_SUCCEED,
    payload: result,
  }),

  fail: (error): Action => ({
    type: types.GET_WORKS_FAIL,
    payload: error,
    error: true,
  }),
};

export const getBlog = {
  start: (): Action => ({
    type: types.GET_BLOG_START,
  }),

  succeed: (result): Action => ({
    type: types.GET_BLOG_SUCCEED,
    payload: result,
  }),

  fail: (error): Action => ({
    type: types.GET_BLOG_FAIL,
    payload: error,
    error: true,
  }),
};