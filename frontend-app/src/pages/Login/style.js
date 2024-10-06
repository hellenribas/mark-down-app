import styled from 'styled-components';
import { theme } from '../../styles/theme';

export const LoginWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${theme.gradients.background};
`;

export const LoginForm = styled.form`
  background: rgba(255, 255, 255, 0.9);
  border-radius: ${theme.radius.medium};
  padding: ${theme.spacing.large};
  box-shadow: ${theme.boxShadow.card};
  width: 400px;
`;

export const Title = styled.h1`
  text-align: center;
  margin-bottom: ${theme.spacing.medium};
  color: ${theme.colors.primary};
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.medium};
  margin-bottom: ${theme.spacing.medium};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.small};
  font-size: 1em;
  outline: none;
  transition: border 0.3s;

  &:focus {
    border-color: ${theme.colors.secondary};
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: ${theme.spacing.medium};
  background: ${theme.colors.buttonBackground};
  color: ${theme.colors.textPrimary};
  border: none;
  border-radius: ${theme.radius.medium};
  font-size: 1em;
  cursor: pointer;
  transition: background 0.3s;
  margin: 3px 0 ;
  &:hover {
    background: ${theme.colors.buttonHover};
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-bottom: ${theme.spacing.medium};
`;
