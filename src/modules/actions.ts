import types from './actionTypes';

interface Action {
  type: string;
  payload?: any;
  error?: boolean;
}
export interface ToggleModalPayload {
  title: string;
  image: string;
  description: string;
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

export const toggleModal = (payload?: ToggleModalPayload): Action => ({
  type: types.TOGGLE_MODAL,
  payload,
});

export const sortCategory = (payload?: string): Action => ({
  type: types.SORT_CATEGORY,
  payload,
});
