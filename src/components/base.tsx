import React from 'react';
import styled from 'styled-components';

import Header from './header';
import Footer from './footer';

const width = {
  iphone5: '320px',
  ipad: '768px',
};

const color = {
  content: '#fff',
  window: '#fafafa',
  bg: '#f6d365',
};

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: ${width.iphone5};
  background: ${color.content};
`;

const Content = styled.section`
  width: 1000px;
  padding: 0 16px;
  visibility: hidden;
  animation: fade 0.8s cubic-bezier(0.23, 1, 0.32, 1) 0.4s forwards;
  @media (max-width: ${width.ipad}) {
    width: 100vw;
    min-width: ${width.iphone5};
  }

  @keyframes fade {
    0% {
      opacity: 0;
    }

    100% {
      visibility: visible;
      opacity: 1;
    }
  }
`;

const Heading = styled.h2`
  margin: -0.5em 0 0 8px;
  font-family: 'Raleway', sans-serif;
  font-size: 20rem;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  @media (max-width: ${width.ipad}) {
    font-size: 24vw;
  }
  @media (max-width: ${width.iphone5}) {
    font-size: 8rem;
  }
`;

const Base = props => {
  const { heading, children } = props;

  return (
    <>
      <Header />
      <Wrapper>
        <Content>
          {heading ? <Heading>{heading}</Heading> : <></>}
          {children}
        </Content>
      </Wrapper>
      <Footer />
    </>
  );
};

export default Base;
