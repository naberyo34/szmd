import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { width, color, transition } from '../lib/style';

const FooterWrapper = styled.footer`
  min-width: ${width.iphone5};
  padding-top: 200px;
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
  margin-left: 20px;
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  font-weight: 700;
  transition: opacity ${transition.fast};
  &:hover {
    opacity: 0.4;
  }
  &:first-child {
    margin-left: 0;
  }
`;

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Copyright = styled.small`
  display: inline-block;
  margin-top: 10px;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
`;

const Footer = () => (
  <FooterWrapper>
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
        <MenuItem>
          <Link href="/blog">
            <LinkText href="/blog">BLOG</LinkText>
          </Link>
        </MenuItem>
      </Menu>
    </Nav>
    <Copyright>Copyright (C) SZMD All rights reserved.</Copyright>
  </FooterWrapper>
);

export default Footer;
