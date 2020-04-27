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
