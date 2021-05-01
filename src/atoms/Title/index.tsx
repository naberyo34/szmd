import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { mq, transition, liquid, emergeVariant } from '@/services/commonStyles';

const StyledWrapper = styled(motion.div)``;

const StyledText = styled.h1`
  position: relative;
  left: -0.05em;
  font-family: 'Raleway', sans-serif;
  font-size: 200px;
  font-style: italic;
  font-weight: 900;
  letter-spacing: -0.15em;
  ${mq()} {
    font-size: ${liquid(200)};
  }
`;

const StyledAddress = styled.p`
  position: relative;
  top: -1em;
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
  text-align: center;
  ${mq()} {
    font-size: ${liquid(20)};
  }
`;

const Title: React.FC = () => (
  <StyledWrapper
    variants={emergeVariant}
    initial="hidden"
    animate="visible"
    transition={{ delay: transition.medium, duration: transition.medium }}
  >
    <StyledText>SZMD</StyledText>
    <StyledAddress>szmd.jp</StyledAddress>
  </StyledWrapper>
);

export default Title;
