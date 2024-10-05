import styled from "styled-components";
import { theme } from "../../styles/theme";

export const HeaderWrapper = styled.header`
  background: ${theme.gradients.background};
  padding: ${theme.spacing.medium} ${theme.spacing.large};
  color: ${theme.colors.textPrimary};
  text-align: center;
  position: fixed;
  width: 100%;
  top: 0;
  box-shadow: ${theme.boxShadow.light};
  z-index: 1000;

  h1 {
    font-family: ${theme.fonts.primary};
    font-size: 2rem;
  }
`;

