import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { color, opacity, transition } from '@/services/commonStyles';

type Props = {
  href: string;
  primary?: boolean;
};

const StyledText = styled(motion.a)<Pick<Props, 'primary'>>`
  font-family: 'Raleway', sans-serif;
  font-size: 20px;
  font-style: italic;
  font-weight: 700;
  color: ${({ primary }) => (primary ? color.primary : color.text)};
  transition: ${`${transition.fast}s`};

  &:hover {
    cursor: pointer;
    opacity: ${opacity.high};
  }
`;

const PageLink: React.FC<Props> = ({ href, primary, children }) => (
  <Link href={href}>
    <StyledText primary={primary}>{children}</StyledText>
  </Link>
);

export default PageLink;
