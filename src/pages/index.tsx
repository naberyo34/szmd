import React from 'react';
import styled from 'styled-components';
import Title from '@/atoms/Title';
import LinkMenu from '@/molecules/LinkMenu';

const StyledWrapper = styled.section`
  display: flex;
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
    <Title>SZMD</Title>
    <StyledMenuLayout>
      <LinkMenu />
    </StyledMenuLayout>
  </StyledWrapper>
);

export default Index;
