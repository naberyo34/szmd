import React from 'react';
import { createGlobalStyle } from 'styled-components';

const Fixed = createGlobalStyle`
  html {
    overflow: hidden;
  }
`;

// trueを受け取ったときにスクロールが止まる
const scrollFixed = (props) => {
  const { isFixed } = props;

  return <>{isFixed && <Fixed />}</>;
};

export default scrollFixed;
