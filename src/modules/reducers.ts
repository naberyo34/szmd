// 便宜的に1つのreducerですべて管理してみよう
import { AxiosError } from 'axios';
import types from './actionTypes';

export interface State {
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
      };
    }
    case types.OPEN_MODAL: {
      return {
        ...state,
        isFixed: true,
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
