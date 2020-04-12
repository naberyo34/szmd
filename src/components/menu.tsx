import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { width, color } from '../lib/style';

const Wrapper = styled.nav`
  position: absolute;
  z-index: 100;
  top: 0;
  right: 0;
  height: 100vh;
  background: ${color.text};

  animation: shrink 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @keyframes shrink {
    0% {
      width: 0;
    }

    100% {
      width: 100vw;
    }
  }
`;

const Menu = () => {
  const isOpen = useSelector(state => state.menu);

  if (isOpen) {
    return (
      <Wrapper>
        <p>Menu</p>
      </Wrapper>
    );
  }

  return <></>;
};

export default Menu;
