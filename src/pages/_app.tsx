import React from 'react';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import 'minireset.css';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import configureStore from '../store/configureStore';
import PageTransition from '../components/pageTransition';
import GetInnerHeight from '../components/getInnerHeight';
import { color } from '../services/style';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: "ヒラギノ角ゴ ProN W3","Hiragino Kaku Gothic ProN","メイリオ",Meiryo,sans-serif;
    font-size: 62.5%;
    line-height: 1;
    color: ${color.text};
    background: ${color.primary};
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

// ReduxをNextと連携するための設定
const store = configureStore();
const makeStore = () => store;

const App = ({ Component, pageProps, router }) => (
  <Provider store={store}>
    <GlobalStyle />
    <PageTransition />
    <GetInnerHeight />
    <AnimatePresence exitBeforeEnter>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </Provider>
);

export default withRedux(makeStore)(App);
