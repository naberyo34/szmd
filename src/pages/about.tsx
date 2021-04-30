import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import DynamicHead from '../components/dynamicHead';
import Header from '../components/header';
import Content from '../components/content';
import Footer from '../components/footer';
import { width, color } from '../services/commonStyles';

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

const Name = styled.h3`
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

const About: React.FC = () => (
  <>
    <DynamicHead title="ABOUT" />
    {/* <Menu /> */}
    <Header />
    <Content title="ABOUT">
      <Wrapper
        variants={wrapperVariants}
        initial="initial"
        animate="fadeIn"
        exit="fadeOut"
        transition={{ type: 'tween', duration: 0.2, delay: 0.1 }}
      >
        <Name>tama</Name>
        <Description>
          a.k.a. Ryo Watanabe
          <br />
          平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
          <br />
          音楽とカレーが好きです。
        </Description>
      </Wrapper>
    </Content>
    <Footer />
  </>
);

export default About;
