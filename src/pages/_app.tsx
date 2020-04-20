import React from 'react';
import { Provider } from 'react-redux';
import 'minireset.css';
import '../lib/prism.css';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import configureStore from '../store/configureStore';
import { color } from '../lib/style';
import HeadComponent from '../components/head';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN","メイリオ",Meiryo,sans-serif;
    font-size: 62.5%;
    line-height: 1;
    color: ${color.text};
    background: ${color.bg};
  }

  p {
    line-height: 1.5;
  }

  button {
    background: none;
    appearance: none;
    border: 0;
  }
`;

const App = ({ Component, pageProps, router }) => {
  const store = configureStore();
  // storeの状態をコンソールで見る
  store.subscribe(() => {
    console.log(store.getState());
  });

  return (
    <Provider store={store}>
      <HeadComponent />
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Provider>
  );
};

export default App;
