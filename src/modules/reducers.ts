import types from './actionTypes';

export interface State {
  innerHeight?: number;
  isFixed: boolean;
  menu: {
    isOpen: boolean;
  };
  modal: {
    isOpen: boolean;
    data: {
      title?: string;
      image?: string;
      description?: string;
    };
  };
  category: string;
}

const initialState: State = {
  isFixed: false,
  menu: {
    isOpen: false,
  },
  modal: {
    isOpen: false,
    data: {},
  },
  category: '全て',
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
    // ページ遷移時に状態を初期化する
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
        category: '全て',
      };
    }
    // メニューの開閉
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
        // 同時に開かないようモーダルは閉じる
        modal: {
          isOpen: false,
          data: {},
        },
      };
    }
    // モーダルの開閉 選択したモーダルの情報をpayloadで取得
    case types.TOGGLE_MODAL: {
      if (state.modal.isOpen) {
        return {
          ...state,
          isFixed: false,
          modal: {
            isOpen: false,
            data: {},
          },
        };
      }

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
    case types.SORT_CATEGORY: {
      return {
        ...state,
        category: action.payload || '全て',
      };
    }
    default:
      return state;
  }
};

export default reducer;
