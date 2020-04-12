import { createStore } from 'redux';
import reducer from '../modules/reducers';

const configureStore = () => {
  const store = createStore(reducer);

  return store;
};

export default configureStore;
