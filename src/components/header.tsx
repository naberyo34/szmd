import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';

const width = {
  iphone5: '320px',
  ipad: '768px',
};

const color = {
  content: '#fff',
  window: '#fafafa',
  bg: '#f6d365',
};

const HeaderWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${width.iphone5};
  padding: 20px;
  animation: shrink 0.8s cubic-bezier(0.23, 1, 0.32, 1) forwards;

  @keyframes shrink {
    0% {
      margin-bottom: calc(100vh);
    }

    100% {
      margin-bottom: 136px;
    }
  }
`;

const HeaderInner = styled.header`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  color: ${color.content};
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const HeaderIcon = styled.h1`
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  transition: 0.2s;
  &:hover {
    color: #333;
  }
`;

const HeaderMenu = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 2.4rem;
`;

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Header = () => (
  <HeaderWrapper>
    <HeaderInner>
      <HeaderIcon>
        <Link href="/">
          <LinkText href="/">SZMD</LinkText>
        </Link>
      </HeaderIcon>
      <HeaderMenu>MENU</HeaderMenu>
    </HeaderInner>
  </HeaderWrapper>
);

export default Header;
