import React from 'react';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../modules/actions';
import { color, zIndex } from '../lib/style';

const Wrapper = styled(motion.div)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${zIndex.menu};
  display: flex;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  padding: 20px;
  background: ${color.text};
`;

const Close = styled.span`
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  line-height: 2.4rem;
  cursor: pointer;
  color: #fff;
`;

const Menu = () => {
  const dispatch = useDispatch();
  const handleToggleMenu = () => {
    dispatch(toggleMenu());
  };
  const isOpen = useSelector(state => state.menu);

  return (
    <AnimatePresence>
      {isOpen && (
        <Wrapper
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Close onClick={handleToggleMenu}>CLOSE</Close>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Menu;
