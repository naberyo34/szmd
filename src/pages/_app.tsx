import React from 'react';
import 'minireset.css';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import { color } from '../services/commonStyles';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'ヒラギノ角ゴ ProN W3','Hiragino Kaku Gothic ProN','メイリオ',Meiryo,sans-serif;
    font-size: 62.5%;
    line-height: 1;
    color: ${color.text};
    background: ${color.primary};
  }

  p {
    line-height: 1.8;
  }

  button {
    background: none;
    appearance: none;
    border: 0;
  }
`;

const App = ({ Component, pageProps, router }) => (
  <>
    <GlobalStyle />
    <AnimatePresence exitBeforeEnter>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </>
);

export default App;
