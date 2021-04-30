import React from 'react';
import styled from 'styled-components';
import PageLink from '@/atoms/PageLink';

type Props = {
  primary?: boolean;
};

const StyledNav = styled.nav`
  display: flex;
  gap: 20px;
`;

const Title: React.FC<Props> = ({ primary }) => (
  <StyledNav>
    <PageLink href="/about" primary={primary}>
      ABOUT
    </PageLink>
    <PageLink href="/works" primary={primary}>
      WORKS
    </PageLink>
  </StyledNav>
);

export default Title;
