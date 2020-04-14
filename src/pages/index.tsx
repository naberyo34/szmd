import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { width, transition } from '../lib/style';

const Wrapper = styled(motion.div)``;

const wrapperVariants = {
  initial: { y: 100, opacity: 0 },
  fadeIn: { y: 0, opacity: 1 },
  fadeOut: { y: -100, opacity: 0 },
};

const Content = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${width.iphone5};
  height: calc(100vh - 40px);
`;

const ContentInner = styled.section`
  text-align: center;
`;

const Title = styled.h1`
  position: relative;
  left: -0.05em;
  font-family: 'Raleway', sans-serif;
  font-size: 20rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  @media (max-width: ${width.ipad}) {
    font-size: 32vw;
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 10rem;
  }
`;

const Address = styled.h2`
  position: relative;
  top: -1em;
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  font-style: italic;
  font-weight: 700;
  @media (max-width: ${width.ipad}) {
    font-size: 4vw;
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 1.25rem;
  }
`;

const Footer = styled.footer`
  min-width: ${width.iphone5};
  height: 40px;
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

const Index = () => (
  <Wrapper
    variants={wrapperVariants}
    initial="initial"
    animate="fadeIn"
    exit="fadeOut"
    transition={{ type: 'tween', duration: 0.2 }}
  >
    <Content>
      <ContentInner>
        <div>
          <Title>SZMD</Title>
          <Address>szmd.jp</Address>
        </div>
      </ContentInner>
    </Content>
    <Footer>
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
    </Footer>
  </Wrapper>
);

export default Index;
