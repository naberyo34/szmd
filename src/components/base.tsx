import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { width, color } from '../lib/style';
import Header from './header';
import Footer from './footer';
import Menu from './menu';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${width.iphone5};
  background: ${color.content};
`;

const Content = styled(motion.section)`
  width: 100vw;
  max-width: 1000px;
  padding: 0 16px;
`;

const contentVariants = {
  initial: { y: 100, opacity: 0 },
  fadeIn: { y: 0, opacity: 1 },
  fadeOut: { y: -100, opacity: 0 },
};

const Heading = styled.h2`
  margin: -0.5em 0 0 8px;
  font-family: 'Raleway', sans-serif;
  font-size: 20rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  @media (max-width: ${width.ipad}) {
    font-size: 24vw;
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 8rem;
  }
`;

const Base = props => {
  const { heading, children } = props;

  return (
    <>
      <Menu />
      <Header />
      <Wrapper>
        <Content
          variants={contentVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {heading ? <Heading>{heading}</Heading> : <></>}
          {children}
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Base;
