import styled, { css } from 'styled-components';
import Base from '../components/base';

const width = {
  iphone5: '320px',
  ipad: '768px',
};

const color = {
  window: '#fafafa',
};

const Author = styled.section`
  padding: 0 20px 40px 20px;
  margin: 200px auto 0 auto;
  text-align: center;
  background: ${color.window};
  border-radius: 20px;
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

export default () => (
  <Base heading="ABOUT">
    <Author>
      <AuthorIcon src="/about_icon.png" alt="tamaのアイコン" width="200" />
      <AuthorName>tama</AuthorName>
      <AuthorDescription>
        平日は駆け出しエンジニア、週末は趣味でイラストやデザインをやっています。
        <br />
        音楽とカレーが好きです。
      </AuthorDescription>
    </Author>
  </Base>
);
