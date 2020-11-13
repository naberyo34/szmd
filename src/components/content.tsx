import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { width, color } from '../services/style';

const headingVariants = {
  initial: { y: -32, opacity: 0 },
  fadeIn: { y: 0, opacity: 1 },
  fadeOut: { y: 32, opacity: 0 },
};

const Wrapper = styled.section`
  display: flex;
  justify-content: center;
  min-width: ${width.iphone5};
  margin-top: 168px;
  background: ${color.white};
  @media (max-width: ${width.ipad}) {
    margin-top: 84px;
  }
`;

const Inner = styled.div`
  width: 100%;
  max-width: 1000px;
`;

const Heading = styled(motion.h2)`
  padding: 0 16px;
  margin-top: -0.5em;
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

const Children = styled.div`
  padding: 128px 16px;
  @media (max-width: ${width.ipad}) {
    padding: 64px 16px;
  }
`;

interface Props {
  title?: string;
}

const Content: React.FC<Props> = (props) => {
  const { children, title } = props;

  return (
    <Wrapper>
      <Inner>
        {title && (
          <Heading
            variants={headingVariants}
            initial="initial"
            animate="fadeIn"
            exit="fadeOut"
            transition={{ type: 'tween', duration: 0.2 }}
          >
            {title}
          </Heading>
        )}
        <Children>{children}</Children>
      </Inner>
    </Wrapper>
  );
};

export default Content;
