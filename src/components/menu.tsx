import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { toggleMenu } from '../modules/actions';
import { color, zIndex, transition } from '../lib/style';

const Wrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${zIndex.menu};
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 216px;
  height: 100vh;
  padding: 20px;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
  background: ${color.text};
`;

const WrapperVariants = {
  initial: { x: 216, opacity: 0 },
  fadeIn: { x: 0, opacity: 1 },
  fadeOut: { x: 216, opacity: 0 },
};

const MenuList = styled.ul`
  color: ${color.content};
  text-align: center;
`;

const MenuItem = styled.li`
  margin-top: 20px;
  font-size: 2.4rem;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.bg};
  }
`;

// 諸々の事情でLinkに直接スタイルを当てることができない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Close = styled.button`
  height: 2.4rem;
  font-family: 'Raleway', sans-serif;
  font-size: 1.2rem;
  font-style: italic;
  color: ${color.content};
  cursor: pointer;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.bg};
  }
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
          variants={WrapperVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ duration: 0.2, type: 'tween', ease: 'easeOut' }}
        >
          <Close onClick={handleToggleMenu}>CLOSE</Close>
          <MenuList>
            <MenuItem>
              <Link href="/">
                <LinkText href="/">TOP</LinkText>
              </Link>
            </MenuItem>
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
          </MenuList>
        </Wrapper>
      )}
    </AnimatePresence>
  );
};

export default Menu;
