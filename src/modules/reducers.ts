import types from './actionTypes';

export interface State {
  innerHeight: number | null;
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
}

const initialState: State = {
  innerHeight: null,
  isFixed: false,
  menu: {
    isOpen: false,
  },
  modal: {
    isOpen: false,
    data: {},
  },
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
    // モーダルを開く 選択したモーダルのデータをpayloadから取得する
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
    // モーダルを閉じる dataに格納したデータは初期化する
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
    default:
      return state;
  }
};

export default reducer;
