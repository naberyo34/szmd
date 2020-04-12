import React from 'react';
import Head from 'next/head';
import 'minireset.css';
import '../lib/prism.css';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { Provider } from 'react-redux';
import configureStore from '../store/configureStore';
import { color } from '../lib/style';

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
      <Head>
        <title>SZMD | tama portfolio page</title>
        <meta name="description" content="SZMD | tama portfolio page" />
        <meta property="og:url" content="https://szmd.jp" />
        <meta property="og:title" content="SZMD | tama portfolio page" />
        <meta property="og:site_name" content="SZMD" />
        <meta property="og:locale" content="ja_JP" />
        <meta property="og:type" content="website" />
        <meta
          property="og:description"
          content="tama / Ryo Watanabe のポートフォリオ"
        />
        <meta property="og:image" content="https://szmd.jp/og.png" />
        <meta name="twitter:site" content="@momochitama" />
        <meta name="twitter:card" content="summary_large_image" />
        <link rel="canonical" href="https://szmd.jp/" />
        <link
          href="https://fonts.googleapis.com/css?family=Raleway:700i,900i&display=swap"
          rel="stylesheet"
        />
      </Head>
      <GlobalStyle />
      <AnimatePresence exitBeforeEnter>
        <Component {...pageProps} key={router.route} />
      </AnimatePresence>
    </Provider>
  );
};

export default App;
