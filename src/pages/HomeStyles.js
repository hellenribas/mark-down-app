import styled from "styled-components";
import { theme } from "../styles/theme";
import Texture from '../assets/images/texture.jpg'


export const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${theme.spacing.large};
  padding: ${theme.spacing.large};
  padding-top: calc(${theme.spacing.large} * 2);
  background: ${theme.gradients.background};
  color: ${theme.colors.textPrimary};
  min-height: 100vh;
  background-image: url(${Texture});
  background-size: cover;
  background-position: 100%;
`;

export const Card = styled.div`
  background: ${theme.colors.cardBackground};
  padding: ${theme.spacing.large};
  border-radius: ${theme.radius.large};
  box-shadow: ${theme.boxShadow.card};
`;

export const DocumentTitle = styled.h2`
font-size: 12px;
color: ${theme.colors.textPrimary};
margin-bottom: ${theme.spacing.medium};
`;