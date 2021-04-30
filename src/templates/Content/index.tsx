import React from 'react';
import styled from 'styled-components';
import Footer from '@/organisms/Footer';
import { color } from '@/services/commonStyles';

const StyledWrapper = styled.div`
  background: ${color.white};
`;

const StyledMain = styled.main``;

const Content: React.FC = ({ children }) => (
  <StyledWrapper>
    <StyledMain>{children}</StyledMain>
    <Footer />
  </StyledWrapper>
);

export default Content;
