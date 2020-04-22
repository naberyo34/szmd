import React from 'react';
import styled from 'styled-components';
import BaseComponent from '../components/base';
import HeadComponent from '../components/head';
import { width, color } from '../lib/style';

const Author = styled.section`
  max-width: 800px;
  padding: 0 20px 40px 20px;
  margin: 120px auto 0;
  text-align: center;
  background: ${color.gray};
`;

const AuthorIcon = styled.img`
  position: relative;
  top: -100px;
`;

const AuthorName = styled.h3`
  margin-top: -100px;
  font-family: 'Raleway', sans-serif;
  font-size: 4.8rem;
  font-style: italic;
`;

const AuthorDescription = styled.p`
  margin-top: 40px;
  font-size: 1.6rem;
  @media (max-width: ${width.ipad}) {
    text-align: left;
  }
`;

const About = () => (
  <>
    <HeadComponent title="ABOUT" />
    <BaseComponent heading="ABOUT">
      <Author>
        <AuthorIcon src="/about_icon.png" alt="tamaのアイコン" width="200" />
        <AuthorName>tama</AuthorName>
        <AuthorDescription>
          a.k.a. Ryo Watanabe
          <br />
          平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
          <br />
          音楽とカレーが好きです。
        </AuthorDescription>
      </Author>
    </BaseComponent>
  </>
);

export default About;
