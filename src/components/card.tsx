import React from 'react';
import styled from 'styled-components';
import { width, transition } from '../services/style';

const Wrapper = styled.div`
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
  onClick: () => void;
  image?: string;
}

const Card: React.FC<Props> = (props) => {
  const { onClick, image } = props;

  return (
    <Wrapper onClick={onClick}>{image && <Thumbnail src={image} />}</Wrapper>
  );
};

export default Card;
