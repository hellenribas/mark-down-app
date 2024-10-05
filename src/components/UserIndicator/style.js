import styled from "styled-components";
import { theme } from "../../styles/theme";

export const UserIndicatorWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: ${theme.spacing.small};
  margin-bottom: ${theme.spacing.medium};
`;

export const UserIndicator = styled.div`
  width: ${theme.spacing.large};
  height: ${theme.spacing.large};
  background: ${(props) => props.color || theme.colors.secondary};
  border-radius: 50%;
  box-shadow: ${theme.boxShadow.card};
`;
