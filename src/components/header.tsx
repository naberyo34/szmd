import React from 'react';
import Link from 'next/link';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
  return (
    <Wrapper>
      <Inner>
        <Title>
          <Link href="/">
            <LinkText href="/">SZMD</LinkText>
          </Link>
        </Title>
        <Menu type="button">MENU</Menu>
      </Inner>
    </Wrapper>
  );
};

export default Header;
