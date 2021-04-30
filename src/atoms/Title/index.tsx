import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { mq, liquid } from '@/services/commonStyles';

const StyledText = styled(motion.h1)`
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

const Title: React.FC = ({ children }) => <StyledText>{children}</StyledText>;

export default Title;
