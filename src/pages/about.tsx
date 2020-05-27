import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DynamicHead from '../components/dynamicHead';
import ScrollFixed from '../components/scrollFixed';
import Menu from '../components/menu';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import { width, color, transition } from '../services/style';

const wrapperVariants = {
  initial: { opacity: 0 },
  fadeIn: { opacity: 1 },
  fadeOut: { opacity: 0 },
};

const Wrapper = styled(motion.div)`
  max-width: 800px;
  padding: 0 16px 32px 16px;
  margin: 50px auto 0;
  text-align: center;
  background: ${color.gray};
`;

const Icon = styled.img`
  position: relative;
  top: -100px;
`;

const Name = styled.h3`
  margin-top: -100px;
  font-family: 'Raleway', sans-serif;
  font-size: 4.8rem;
  font-style: italic;
`;

const Description = styled.p`
  margin-top: 32px;
  font-size: 1.6rem;
  @media (max-width: ${width.ipad}) {
    text-align: left;
  }
`;

const LinkWrapper = styled.ul`
  display: flex;
  justify-content: center;
  margin-top: 32px;
`;

const LinkItem = styled.li`
  &:not(:first-child) {
    margin-left: 8px;
  }
`;

const LinkText = styled.a`
  color: inherit;
  text-decoration: none;
  transition: opacity ${transition.fast};

  &:hover {
    opacity: 0.8;
  }
`;

const About: React.FC = () => (
  <>
    <DynamicHead title="ABOUT" />
    <ScrollFixed />
    <Menu />
    <Header />
    <Content title="ABOUT">
      <Wrapper
        variants={wrapperVariants}
        initial="initial"
        animate="fadeIn"
        exit="fadeOut"
        transition={{ type: 'tween', duration: 0.2, delay: 0.1 }}
      >
        <Icon src="/about_icon.png" alt="tamaのアイコン" width="200" />
        <Name>tama</Name>
        <Description>
          a.k.a. Ryo Watanabe
          <br />
          平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
          <br />
          音楽とカレーが好きです。
        </Description>
        <LinkWrapper>
          <LinkItem>
            <LinkText
              href="https://twitter.com/momochitama"
              rel="noreferrer"
              target="_blank"
            >
              <img src="/twitter.png" alt="Twitter" width="40" height="40" />
            </LinkText>
          </LinkItem>
        </LinkWrapper>
      </Wrapper>
    </Content>
    <Footer />
  </>
);

export default About;
