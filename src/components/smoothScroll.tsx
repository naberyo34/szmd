import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import scrollPolyfill from 'smoothscroll-polyfill';
import { zIndex, width, color } from '../services/style';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Wrapper = styled(motion.a)`
  position: fixed;
  right: 32px;
  bottom: 32px;
  z-index: ${zIndex.smoothScroll};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  cursor: pointer;
  background-color: ${color.translucentBlack};
  border-radius: 50%;

  @media (max-width: ${width.ipad}) {
    right: 16px;
    bottom: 16px;
  }

  &::before {
    width: 16px;
    height: 16px;
    margin-top: 8px;
    content: '';
    border-top: 4px solid ${color.white};
    border-left: 4px solid ${color.white};
    transform: rotate(45deg);
  }
`;

// 一定値スクロールするとスクロールボタンが出てくる
// MEMO: 必ずトップ遷移になるので遷移先は固定でOK
const SmoothScroll: React.FC = () => {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    scrollPolyfill.polyfill();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      <Wrapper
        onClick={handleClick}
        variants={wrapperVariants}
        initial="initial"
        animate="fadeIn"
        exit="fadeOut"
        transition={{ type: 'tween', duration: 0.2 }}
      />
    </AnimatePresence>
  );
};

export default SmoothScroll;
