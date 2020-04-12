import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../modules/actions';
import { width, color, transition } from '../lib/style';

const HeaderWrapper = styled.div`
  display: flex;
  justify-content: center;
  min-width: ${width.iphone5};
  height: 216px;
  padding: 20px;
`;

const HeaderInner = styled.header`
  display: flex;
  justify-content: space-between;
  width: 1000px;
  color: ${color.content};
`;

const HeaderIcon = styled.h1`
  display: inline-block;
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.text};
  }
`;

const HeaderMenu = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 2.4rem;
  cursor: pointer;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.text};
  }
`;

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Header = () => {
  const dispatch = useDispatch();
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };

  return (
    <HeaderWrapper>
      <HeaderInner>
        <HeaderIcon>
          <Link href="/">
            <LinkText href="/">SZMD</LinkText>
          </Link>
        </HeaderIcon>
        <HeaderMenu onClick={handleToggleMenu}>MENU</HeaderMenu>
      </HeaderInner>
    </HeaderWrapper>
  );
};

export default Header;
