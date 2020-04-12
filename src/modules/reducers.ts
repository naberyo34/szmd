// 便宜的に1つのreducerですべて管理してみよう

import types from './actionTypes';

const initialState = {
  menu: false,
  works: false,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case types.TOGGLE_MENU: {
      // 開いている場合は閉じる
      if (state.menu) {
        return {
          ...state, // スプレッド変数で現在のstateをまるまる返す
          menu: false,
        };
      }

      return {
        ...state,
        menu: true,
      };
    }
    default:
      return state;
  }
};

export default reducer;