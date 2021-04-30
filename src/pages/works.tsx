import React from 'react';
import DynamicHead from '../components/dynamicHead';
import Header from '../components/header';
import Content from '../components/content';
import CardWrapper from '../components/cardWrapper';

const Works: React.FC = () => (
  <>
    <DynamicHead title="WORKS" />
    <Header />
    <Content title="WORKS">
      <CardWrapper />
    </Content>
  </>
);

export default Works;
