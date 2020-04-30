import React from 'react';
import styled from 'styled-components';
import { width, color } from '../services/style';

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  min-width: ${width.iphone5};
  margin-top: 168px;
  background: ${color.white};
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Heading = styled.h2`
  padding: 0 16px;
  margin-top: -0.4em;
  font-family: 'Raleway', sans-serif;
  font-size: 20rem;
  font-style: italic;
  font-weight: 900;
  line-height: 0.8;
  letter-spacing: -0.15em;
  @media (max-width: ${width.ipad}) {
    font-size: 24vw;
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 8rem;
  }
`;

const Children = styled.div`
  padding: 128px 16px;
`;

interface Props {
  title: string;
}

const Content: React.FC<Props> = (props) => {
  const { children, title } = props;

  return (
    <Wrapper>
      <Inner>
        {title && <Heading>{title}</Heading>}
        <Children>{children}</Children>
      </Inner>
    </Wrapper>
  );
};

export default Content;
