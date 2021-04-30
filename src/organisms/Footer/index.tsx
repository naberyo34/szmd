import React from 'react';
import styled from 'styled-components';
import LinkMenu from '@/molecules/LinkMenu';

const StyledFooter = styled.footer``;

const Footer: React.FC = () => (
  <StyledFooter>
    <LinkMenu primary />
  </StyledFooter>
);

export default Footer;
