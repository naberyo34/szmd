import { createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import reducer from '../modules/reducers';

const configureStore = () => {
  const store = createStore(reducer, composeWithDevTools());
  return store;
};

export default configureStore;
