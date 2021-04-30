import React from 'react';
import { AppProps } from 'next/app';
import 'minireset.css';
import { createGlobalStyle } from 'styled-components';
import { AnimatePresence } from 'framer-motion';
import BaseHead from '@/components/BaseHead';
import { color } from '@/services/commonStyles';

const GlobalStyle = createGlobalStyle`
  html {
    font-family: 'Hiragino Kaku Gothic ProN', 'Hiragino Sans', Meiryo, sans-serif;
    color: ${color.text};
    background: ${color.primary};
  }

  * {
    line-height: 1;
  }

  p {
    line-height: 1.8;
  }
`;

const App: React.FC<AppProps> = ({
  Component,
  pageProps,
  router,
}: AppProps) => (
  <>
    <BaseHead />
    <GlobalStyle />
    <AnimatePresence exitBeforeEnter>
      {/* eslint-disable-next-line react/jsx-props-no-spreading */}
      <Component {...pageProps} key={router.route} />
    </AnimatePresence>
  </>
);

export default App;
