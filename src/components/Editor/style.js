import styled from "styled-components";
import { theme } from "../../styles/theme";


export const EditorContainer = styled.textarea`
  width: 100%;
  height: 400px;
  padding: ${theme.spacing.medium};
  font-size: 1em;
  font-family: ${theme.fonts.primary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  background-color: ${theme.colors.editorBackground};
  color: ${theme.colors.textPrimary};
  outline: none;
  resize: vertical;
  box-shadow: ${theme.boxShadow.card};
  transition: box-shadow 0.3s ease;

  &:focus {
    box-shadow: ${theme.boxShadow.focus};
  }
`;

export const PreviewContainer = styled.div`
  margin-top: ${theme.spacing.large};
  padding: ${theme.spacing.medium};
  background-color: ${theme.colors.editorBackground};
  color: ${theme.colors.textPrimary};
  border: 1px solid ${theme.colors.border};
  border-radius: ${theme.radius.medium};
  box-shadow: ${theme.boxShadow.card};
  white-space: pre-wrap;
`;


export const Button = styled.button``