// 便宜的に1つのreducerですべて管理してみよう
import { AxiosError } from 'axios';
import types from './actionTypes';

export interface State {
  innerHeight: number | null;
  isLoading: boolean;
  isFixed: boolean;
  menu: {
    isOpen: boolean;
  };
  modal: {
    isOpen: boolean;
    data: {
      image?: string;
      title?: string;
      description?: string;
    };
  };
  works: [];
  error?: AxiosError | null;
}

const initialState: State = {
  innerHeight: null,
  isLoading: false,
  isFixed: false,
  menu: {
    isOpen: false,
  },
  modal: {
    isOpen: false,
    data: {},
  },
  works: [],
};

const reducer = (state = initialState, action): State => {
  switch (action.type) {
    // viewportの高さを取得して100vh指定の箇所を置き換える
    case types.GET_INNER_HEIGHT: {
      return {
        ...state,
        innerHeight: action.payload,
      };
    }
    // ページ遷移時にメニュー開閉を初期化する
    case types.PAGE_TRANSITION: {
      return {
        ...state,
        isFixed: false,
        menu: {
          isOpen: false,
        },
        modal: {
          isOpen: false,
          data: {},
        },
      };
    }
    case types.TOGGLE_MENU: {
      if (state.menu.isOpen) {
        return {
          ...state,
          isFixed: false,
          menu: {
            isOpen: false,
          },
        };
      }

      return {
        ...state,
        isFixed: true,
        menu: {
          isOpen: true,
        },
        // 同時に開かないようモーダルは閉じる(※基本的にモーダル表示中にメニューは開かないはずだが)
        modal: {
          isOpen: false,
          data: {},
        },
      };
    }
    case types.OPEN_MODAL: {
      return {
        ...state,
        isFixed: true,
        // 同時に開かないようメニューは閉じる
        menu: {
          isOpen: false,
        },
        modal: {
          isOpen: true,
          data: action.payload,
        },
      };
    }
    case types.CLOSE_MODAL: {
      return {
        ...state,
        isFixed: false,
        modal: {
          isOpen: false,
          data: {},
        },
      };
    }
    case types.GET_WORKS_START: {
      return {
        ...state,
        works: [],
        isLoading: true,
      };
    }
    case types.GET_WORKS_SUCCEED: {
      return {
        ...state,
        works: action.payload.contents,
        isLoading: false,
      };
    }
    case types.GET_WORKS_FAIL: {
      return {
        ...state,
        isLoading: false,
        error: action.payload.error,
      };
    }
    default:
      return state;
  }
};

export default reducer;
