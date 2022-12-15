import { Link } from "react-router-dom";
import Button from "semantic-ui-react/dist/commonjs/elements/Button";
import styled from "styled-components";

export const NavbarMainDiv = styled("div")`
  background: ${({ theme }) => theme.colors.primary};
  padding: 20px 0;
`;

export const ThemeButton = styled(Button)`
  background: ${({ theme }) => theme.colors.secondary} !important;
  color: ${({ theme }) => theme.colors.primary} !important;
  margin-right: 10px !important;
  transition: 300ms !important;
  &:hover {
    background: ${({ theme }) => theme.colors.secondaryHover} !important;
  }
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export const InnerDiv = styled("div")`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

export const Brand = styled("h1")`
  color: ${({ theme }) => theme.colors.tertiary};
  margin-top: 0;
  margin-bottom: 0;
  margin-right: 50px;
  display: inline;
`;

export const NavContentWrapper = styled("div")`
  display: flex;
  align-items: center;
`;

export const StyledLink = styled(Link)`
  color: ${({ theme }) => theme.colors.secondary};
  margin-right: 20px;
`;

export const StyledImg = styled("img")`
  height: 30px;
  width: 30px;
  border-radius: 50%;
  margin-right: 10px;
  object-fit: cover;
  object-position: top;
  margin-left: 10px;
`;

export const DropdownButton = styled("button")`
  display: flex;
  align-items: center;
  height: 36px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  padding: 0%;
  margin-left: 10px;
  border: 1px solid
    ${({ theme }) => {
      if (theme.name === "light") {
        return "rgba(34,36,38,.15)";
      } else {
        return "#c4ced846";
      }
    }};
  border-radius: 5px;
  overflow: hidden;
  &:hover {
    cursor: pointer;
    border-color: ${({ theme }) => {
      if (theme.name === "light") {
        return "#0a0b0b4a";
      } else {
        return "#dde4eb82";
      }
    }};
  }
  transition: 300ms;
  &:focus {
    outline: 1px solid ${({ theme }) => theme.colors.secondary};
  }
`;

export const DropdownIconDiv = styled("div")`
  height: 36px;
  width: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-left: 20px;
  padding-left: 5px;
  background: transparent;
  color: ${({ theme }) => theme.colors.secondary};
  transition: 300ms;
`;

export const DropdownMenu = styled("div")`
  width: 200px;
  padding: 20px;
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.secondary};
  position: absolute;
  top: 56px;
  right: 0;
  & button {
    margin-bottom: 5px !important;
  }
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
`;
