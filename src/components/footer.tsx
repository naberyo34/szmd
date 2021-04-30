import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { width, color, transition } from '../services/style';

const Wrapper = styled.footer`
  min-width: ${width.iphone5};
  padding-bottom: 10px;
  color: ${color.primary};
  text-align: center;
  background: ${color.white};
  border-bottom: 8px solid ${color.primary};
`;

const Nav = styled.nav`
  display: flex;
  justify-content: center;
`;

const Menu = styled.ul`
  display: flex;
`;

const MenuItem = styled.li`
  font-family: 'Raleway', sans-serif;
  font-size: 2rem;
  font-style: italic;
  font-weight: 700;
  transition: opacity ${transition.fast};
  &:not(:first-child) {
    margin-left: 20px;
  }
  &:hover {
    opacity: 0.8;
  }
`;

const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Copyright = styled.small`
  display: inline-block;
  margin-top: 10px;
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
`;

const Footer: React.FC = () => (
  <Wrapper>
    <Nav>
      <Menu>
        <MenuItem>
          <Link href="/about">
            <LinkText href="/about">ABOUT</LinkText>
          </Link>
        </MenuItem>
        <MenuItem>
          <Link href="/works">
            <LinkText href="/works">WORKS</LinkText>
          </Link>
        </MenuItem>
      </Menu>
    </Nav>
    <Copyright>Copyright (C) SZMD All rights reserved.</Copyright>
  </Wrapper>
);

export default Footer;
