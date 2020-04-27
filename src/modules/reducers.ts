// 便宜的に1つのreducerですべて管理してみよう

import types from './actionTypes';

export interface State {
  innerHeight: number,
  fixed: boolean,
  menu: boolean,
  modal: {
    open: boolean,
    data: {},
  }
}

const initialState: State = {
  innerHeight: 0,
  fixed: false,
  menu: false,
  modal: {
    open: false,
    data: {},
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.GET_INNER_HEIGHT: {
      return {
        ...state,
        innerHeight: action.payload,
      };
    }
    case types.TOGGLE_MENU: {
      // 開いている場合は閉じる
      if (state.menu) {
        return {
          ...state, // スプレッド変数で現在のstateをまるまる返す
          fixed: false,
          menu: false,
        };
      }

      return {
        ...state,
        fixed: true,
        menu: true,
      };
    }
    case types.OPEN_MODAL: {
      return {
        ...state,
        fixed: true,
        modal: {
          open: true,
          data: action.payload,
        },
      };
    }
    case types.CLOSE_MODAL: {
      return {
        ...state,
        fixed: false,
        modal: {
          open: false,
          data: {},
        },
      };
    }
    default:
      return state;
  }
};

export default reducer;
