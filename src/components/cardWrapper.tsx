import React from 'react';
import styled from 'styled-components';
import { width } from '../services/style';

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  @media (max-width: ${width.ipad}) {
    flex-direction: column;
  }
`;

const CardWrapper: React.FC = (props) => {
  const { children } = props;

  return <Wrapper>{children}</Wrapper>;
};

export default CardWrapper;
