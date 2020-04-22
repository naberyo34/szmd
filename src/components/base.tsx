import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { getInnerHeight } from '../modules/actions';
import { width, color } from '../lib/style';
// コンポーネント
import ScrollFixed from './scrollFixed';
import Menu from './menu';
import Modal from './modal';
import Header from './header';
import Footer from './footer';

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${width.iphone5};
  padding-bottom: 120px;
  background: ${color.white};
`;

const Content = styled(motion.section)`
  width: 100vw;
  max-width: 1000px;
  padding: 0 16px;
`;

const contentVariants = {
  initial: { y: 32, opacity: 0 },
  fadeIn: { y: 0, opacity: 1 },
  fadeOut: { y: -32, opacity: 0 },
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

const BaseComponent = props => {
  const { heading, children } = props;
  const dispatch = useDispatch();
  const isFixed = useSelector(state => state.fixed);
  const menuIsOpen = useSelector(state => state.menu);
  const modal = useSelector(state => state.modal);

  useEffect(() => {
    // viewportの高さを取得し、コンテンツのheightを決定
    const setInnerHeight = () => {
      const { innerHeight } = window;
      dispatch(getInnerHeight(innerHeight));
    };

    setInnerHeight();
    // リサイズを監視し、コンテンツのheightを更新
    window.addEventListener('resize', setInnerHeight);
  }, [dispatch]);

  const innerHeight = useSelector(state => state.innerHeight);

  return (
    <>
      <ScrollFixed isFixed={isFixed} />
      <Menu isOpen={menuIsOpen} />
      <Modal isOpen={modal.open} data={modal.data} innerHeight={innerHeight} />
      <Header />
      <Wrapper>
        <Content
          variants={contentVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2 }}
        >
          {heading && <Heading>{heading}</Heading>}
          {children}
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default BaseComponent;
