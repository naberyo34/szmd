import React from 'react';
import styled from 'styled-components';
import CatchCopy from '@/atoms/CatchCopy';
import Title from '@/atoms/Title';
import LinkMenu from '@/molecules/LinkMenu';

const StyledWrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
`;

const StyledMenuLayout = styled.div`
  position: fixed;
  bottom: 40px;
`;

const Index: React.FC = () => (
  <StyledWrapper>
    <CatchCopy />
    <Title />
    <StyledMenuLayout>
      <LinkMenu />
    </StyledMenuLayout>
  </StyledWrapper>
);

export default Index;
