import styled from 'styled-components';
import { theme } from '../../styles/theme'; // Importando seu tema

export const RegisterContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background: ${theme.gradients.background};  
`;

export const Form = styled.form`
  background: ${theme.colors.cardBackground}; 
  padding: ${theme.spacing.large};  
  border-radius: ${theme.radius.large};  
  box-shadow: ${theme.boxShadow.card}; 
  width: 100%; 
  max-width: 400px;
`;

export const Title = styled.h2`
  margin-bottom: ${theme.spacing.medium};  
  text-align: center;
  color: ${theme.colors.textPrimary}; 
`;

export const Input = styled.input`
  width: 100%;
  padding: ${theme.spacing.small};  
  margin: ${theme.spacing.small} 0; 
  border: 1px solid ${theme.colors.border};  
  border-radius: ${theme.radius.medium};  
  background-color: ${theme.colors.editorBackground};  
  color: ${theme.colors.textPrimary};  

  &:focus {
    outline: none;  
    border: 1px solid ${theme.colors.secondary};  
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: ${theme.spacing.medium}; 
  background-color: ${theme.colors.buttonBackground}; 
  color: white;
  border: none;
  border-radius: ${theme.radius.medium};
  cursor: pointer;
  margin: ${theme.spacing.small} 0; 

  &:hover {
    background-color: ${theme.colors.buttonHover};
  }
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
  margin-top: ${theme.spacing.small}; 
`;
