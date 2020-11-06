import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { AnimatePresence, motion } from 'framer-motion';
import styled from 'styled-components';
import { showSmoothScroll, hideSmoothScroll } from '../modules/actions';
import { zIndex, width, color } from '../services/style';
import { State } from '../modules/reducers';

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
  const dispatch = useDispatch();
  const isShow = useSelector((state: State) => state.smoothScroll.isShow);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();

    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', () => {
      const threshold = 224;

      // 閾値以上のスクロールがあったときにスムーススクロールを表示
      if (window.scrollY > threshold) dispatch(showSmoothScroll());
      else dispatch(hideSmoothScroll());
    });
  }, []);

  return (
    <AnimatePresence>
      {isShow && (
        <Wrapper
          onClick={handleClick}
          variants={wrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2 }}
        />
      )}
    </AnimatePresence>
  );
};

export default SmoothScroll;
