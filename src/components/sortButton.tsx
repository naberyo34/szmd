import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { width, color, transition } from '../services/style';

interface Props {
  index: number;
  onClick: () => void;
  label: string;
  active: boolean;
}

interface ButtonProps {
  active: boolean;
}

const buttonVariants = {
  initial: { scale: 0.5, opacity: 0 },
  fadeIn: { scale: 1, opacity: 1 },
  fadeOut: { scale: 0.5, opacity: 0 },
};

const Button = styled(motion.button)`
  font-size: 1.6rem;
  background-color: ${(props: ButtonProps): string =>
    props.active ? color.primary : color.gray};
  transition: background-color ${transition.fast};

  &:not(:first-child) {
    margin-left: 8px;
  }

  @media (max-width: ${width.ipad}) {
    font-size: 1.2rem;
  }
`;

const SortButton: React.FC<Props> = ({
  index,
  onClick,
  label,
  active,
}: Props) => {
  const delay = 0.1 + index * 0.05;
  return (
    <Button
      type="button"
      onClick={onClick}
      active={active}
      variants={buttonVariants}
      initial="initial"
      animate="fadeIn"
      exit="fadeOut"
      transition={{ type: 'tween', duration: 0.2, delay }}
    >
      {label}
    </Button>
  );
};

export default SortButton;
