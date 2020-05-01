import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { width, transition } from '../services/style';

const wrapperVariants = {
  initial: { scale: 0.5, opacity: 0 },
  fadeIn: { scale: 1, opacity: 1 },
  fadeOut: { scale: 0.5, opacity: 0 },
};

const Wrapper = styled(motion.div)`
  width: calc(50% - 16px);
  height: 200px;
  margin-top: 32px;
  overflow: hidden;
  cursor: pointer;
  @media (max-width: ${width.ipad}) {
    width: 100%;
  }
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 0;
  transition: transform ${transition.fast};
  /* stylelint-disable-next-line selector-type-no-unknown */
  ${Wrapper}:hover & {
    transform: scale(1.2, 1.2);
  }
`;

interface Props {
  index: number;
  onClick: () => void;
  image?: string;
}

const Card: React.FC<Props> = (props) => {
  const { index, onClick, image } = props;
  const delay = 0.1 + index * 0.05;

  return (
    <Wrapper
      onClick={onClick}
      variants={wrapperVariants}
      initial="initial"
      animate="fadeIn"
      exit="fadeOut"
      transition={{ type: 'tween', duration: 0.2, delay }}
    >
      {image && <Thumbnail src={image} alt="クリックで詳細を表示" />}
    </Wrapper>
  );
};

export default Card;
