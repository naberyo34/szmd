import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';
import { toggleMenu } from '../modules/actions';
import { width, color, transition } from '../services/style';

const Wrapper = styled.header`
  display: flex;
  justify-content: center;
  min-width: ${width.iphone5};
`;

const Inner = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 1000px;
  padding: 16px;
  color: ${color.white};
`;

const Title = styled(motion.h1)`
  font-family: 'Raleway', sans-serif;
  font-size: 2.4rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.text};
  }
`;

const Menu = styled(motion.button)`
  font-family: 'Raleway', sans-serif;
  font-size: 1.6rem;
  font-style: italic;
  color: ${color.white};
  cursor: pointer;
  transition: color ${transition.fast};
  &:hover {
    color: ${color.text};
  }
`;

// Linkとaは入れ子にするのが良いらしい. 色々あってLinkには直接スタイルが当たらない
const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
`;

const Header: React.FC = () => {
  const dispatch = useDispatch();
  const handleToggleMenu = (): void => {
    dispatch(toggleMenu());
  };

  return (
    <Wrapper>
      <Inner>
        <Title
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          <Link href="/">
            <LinkText href="/">SZMD</LinkText>
          </Link>
        </Title>
        <Menu
          type="button"
          onClick={handleToggleMenu}
          whileHover={{ scale: 1.2 }}
          whileTap={{ scale: 0.8 }}
          transition={{ type: 'tween', duration: 0.2 }}
        >
          MENU
        </Menu>
      </Inner>
    </Wrapper>
  );
};

export default Header;
