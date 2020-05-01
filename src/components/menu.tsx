import React from 'react';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { AnimatePresence, motion } from 'framer-motion';
import { toggleMenu } from '../modules/actions';
import { color, zIndex, transition } from '../services/style';
import { State } from '../modules/reducers';

const maskVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const wrapperVariants = {
  initial: { x: 216, opacity: 0 },
  fadeIn: { x: 0, opacity: 1 },
  fadeOut: { x: 216, opacity: 0 },
};

interface MaskProps {
  innerHeight?: number;
}

const Mask = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  z-index: ${zIndex.modal};
  width: 100vw;
  height: ${(props: MaskProps): string =>
    props.innerHeight ? `${props.innerHeight}px` : '100vh'};
  color: ${color.white};
  background: rgba(0, 0, 0, 0.6);
`;

const Wrapper = styled(motion.nav)`
  position: fixed;
  top: 0;
  right: 0;
  z-index: ${zIndex.menu};
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 216px;
  height: 100%;
  padding: 32px;
  font-family: 'Raleway', sans-serif;
  font-style: italic;
  background: ${color.text};
`;

const MenuList = styled.ul`
  color: ${color.white};
`;

const MenuItem = styled.li`
  font-size: 2.4rem;
  transition: color ${transition.fast};
  &:not(:first-child) {
    margin-top: 32px;
  }
  &:hover {
    color: ${color.primary};
  }
`;

const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Close = styled.button`
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  color: ${color.white};
  cursor: pointer;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.primary};
  }
`;

const Menu: React.FC = () => {
  const dispatch = useDispatch();
  const innerHeight = useSelector((state: State) => state.innerHeight);
  const isOpen = useSelector((state: State) => state.menu.isOpen);
  const handleToggleMenu = (): void => {
    dispatch(toggleMenu());
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <Mask
          innerHeight={innerHeight}
          variants={maskVariants}
          initial="initial"
          animate="fadeIn"
          exit="fadeOut"
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Wrapper
            variants={wrapperVariants}
            initial="initial"
            animate="fadeIn"
            exit="fadeOut"
            transition={{ type: 'tween', duration: 0.2 }}
          >
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
            <Close type="button" onClick={handleToggleMenu}>
              CLOSE
            </Close>
          </Wrapper>
        </Mask>
      )}
    </AnimatePresence>
  );
};

export default Menu;
