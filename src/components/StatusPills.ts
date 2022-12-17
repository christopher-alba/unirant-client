import styled from "styled-components";

export const StatusPillSuccess = styled("div")`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #00d000;
  color: #00d000;
  width: fit-content;
  font-size: 0.8rem;
`;

export const StatusPillError = styled("div")`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid #d00000;
  color: #d00000;
  width: fit-content;
  font-size: 0.8rem;
`;

export const StatusPillImportant = styled("div")`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.tertiary};
  color: ${({ theme }) => theme.colors.tertiary};
  width: fit-content;
  display: inline;
  margin-right: 10px;
  font-size: 0.8rem;
`;

export const StatusPillBasic = styled("div")`
  padding: 5px 10px;
  border-radius: 5px;
  border: 2px solid ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.secondary};
  width: fit-content;
  display: inline;
  margin-right: 10px;
  font-size: 0.8rem;
`;
