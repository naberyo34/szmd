import React from 'react';
import { useSelector } from 'react-redux';
import { createGlobalStyle } from 'styled-components';
import { State } from '../modules/reducers';

// TODO: 現状iOS Safariでスクロールが固定しない
const Fixed = createGlobalStyle`
  body {
    overflow: hidden;
  }
`;

// trueを受け取ったときにスクロールが止まる
const ScrollFixed: React.FC = () => {
  const isFixed = useSelector((state: State) => state.isFixed);

  return <>{isFixed && <Fixed />}</>;
};

export default ScrollFixed;
