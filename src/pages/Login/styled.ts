import { Input } from "semantic-ui-react";
import styled from "styled-components";

export const StyledHeadingLeft = styled("h1")``;
export const StyledHeadingRight = styled("h1")`
  color: white;
`;
export const StyledInput = styled(Input)`
  & input {
    background: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.secondary} !important;
    border: 2px solid ${({ theme }) => theme.colors.secondary} !important;
  }
  & button {
    background: ${({ theme }) => theme.colors.primary} !important;
    color: ${({ theme }) => theme.colors.secondary} !important;
    border: 2px solid ${({ theme }) => theme.colors.secondary} !important;
  }
`;
export const MainDiv = styled("div")`
  width: 100%;
  height: 100%;
  flex-shrink: 1;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const InnerDiv = styled("div")`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 30px;
  display: flex;
  overflow: hidden;
  height: 500px;
`;

export const FormContentsWrapper = styled("div")`
  display: flex;
  flex-direction: column;
`;

export const LoginLeftDiv = styled("div")`
  padding: 50px;
  width: 400px;
`;

export const LoginRightDiv = styled("div")`
  background: ${({ theme }) => theme.colors.tertiary};
  padding: 50px;
  max-width: 400px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
`;

export const StyledPRight = styled("p")`
  color: white;
  font-size: 1.5rem;
`;