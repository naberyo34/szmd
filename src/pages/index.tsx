import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DynamicHead from '../components/dynamicHead';
import { width, transition } from '../services/commonStyles';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const innerVariants = {
  initial: { scale: 0.5, opacity: 0 },
  fadeIn: { scale: 1, opacity: 1 },
  fadeOut: { scale: 0.5, opacity: 0 },
};

const Wrapper = styled(motion.div)`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const Inner = styled(motion.section)`
  text-align: center;
`;

const Title = styled.h1`
  position: relative;
  left: -0.05em;
  font-family: 'Raleway', sans-serif;
  font-size: 200px;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  @media (max-width: ${width.ipad}) {
    font-size: calc(100 / 767 * 200 * 1vw);
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 100px;
  }
`;

const Address = styled.h2`
  position: relative;
  top: -1em;
  font-family: 'Raleway', sans-serif;
  font-size: 24px;
  font-style: italic;
  font-weight: 700;
  @media (max-width: ${width.ipad}) {
    font-size: calc(100 / 767 * 24 * 1vw);
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 12.5px;
  }
`;

const Footer = styled.footer`
  position: fixed;
  bottom: 32px;
  width: 100%;
  min-width: ${width.iphone5};
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
  font-size: 20px;
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

const Index: React.FC = () => (
  <>
    <DynamicHead />
    <Wrapper
      variants={wrapperVariants}
      initial="initial"
      animate="fadeIn"
      exit="fadeOut"
      transition={{ type: 'tween', duration: 0.2 }}
    >
      <Inner
        variants={innerVariants}
        initial="initial"
        animate="fadeIn"
        exit="fadeOut"
        transition={{ type: 'tween', duration: 0.2 }}
      >
        <Title>SZMD</Title>
        <Address>szmd.jp</Address>
      </Inner>
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
          </Menu>
        </Nav>
      </Footer>
    </Wrapper>
  </>
);

export default Index;
