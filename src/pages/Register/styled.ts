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
  & > * {
    margin-top: 10px !important;
  }
`;

export const RegisterLeftDiv = styled("div")`
  padding: 50px;
  width: 400px;
`;

export const RegisterRightDiv = styled("div")`
  background: ${({ theme }) => theme.colors.tertiary};
  padding: 50px;
  max-width: 400px;
  text-align: center;
  display: flex;
  justify-content: center;
  flex-direction: column;
  & > button {
    margin-top: 10px !important;
  }
`;

export const StyledPRight = styled("p")`
  color: white;
  font-size: 1.5rem;
`;

export const StyledPLeft = styled("p")`
  color: ${({ theme }) => theme.colors.secondary};
  font-size: 0.8rem;
  margin-bottom: 0;
`;
