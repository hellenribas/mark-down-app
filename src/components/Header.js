import React from 'react';
import styled from 'styled-components';

const HeaderWrapper = styled.header`
  background: ${({ theme }) => theme.colors.primary};
  padding: 1rem;
  color: white;
  text-align: center;
`;

const Header = () => {
  return (
    <HeaderWrapper>
      <h1>Markdown</h1>
    </HeaderWrapper>
  );
};

export default Header;
