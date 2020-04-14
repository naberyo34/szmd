import types from './actionTypes';

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
