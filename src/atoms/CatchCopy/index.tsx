import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import {
  color,
  transition,
  mq,
  liquid,
  emergeVariant,
} from '@/services/commonStyles';

const StyledText = styled(motion.p)`
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 200;
  letter-spacing: 0.5em;
  ${mq()} {
    font-size: ${liquid(20)};
  }
`;

const StyledInversionText = styled.span`
  color: ${color.primary};
  background: ${color.text};
`;

const CatchCopy: React.FC = () => (
  <StyledText
    variants={emergeVariant}
    initial="hidden"
    animate="visible"
    transition={{ duration: transition.medium }}
  >
    change our <StyledInversionText>mode.</StyledInversionText>
  </StyledText>
);

export default CatchCopy;
