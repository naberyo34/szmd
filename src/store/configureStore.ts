import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducer from '../modules/reducers';
import rootSaga from '../sagas/microcms';

const configureStore = () => {
  const sagaMiddleWare = createSagaMiddleware();
  const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(sagaMiddleWare))
  );
  // sagaのルートタスクを起動
  sagaMiddleWare.run(rootSaga);
  return store;
};

export default configureStore;
