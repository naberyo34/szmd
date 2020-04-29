import React from 'react';
import { createGlobalStyle } from 'styled-components';

// TODO: 現状iOS Safariでスクロールが固定しない
const Fixed = createGlobalStyle`
  html {
    overflow: hidden;
  }
`;

interface Props {
  isFixed: boolean;
}

// trueを受け取ったときにスクロールが止まる
const scrollFixed: React.FC<Props> = (props) => {
  const { isFixed } = props;
  return <>{isFixed && <Fixed />}</>;
};

export default scrollFixed;
