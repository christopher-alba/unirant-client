import styled, { CSSObject, DefaultTheme } from "styled-components";

export const MainDiv = styled("div")`
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 20px;
  padding: 30px;
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
`;

export const LikeAndDislikeWrapper = styled("div")`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 30px;
`;
interface StyledButtonInterface {
  active: boolean;
  likeOrDislike: string;
}
export const StyledButton = styled("button")<StyledButtonInterface>`
  margin-top: 20px;
  margin-bottom: 20px;
  background: ${({ theme }) => theme.colors.primaryLight};
  color: ${({ theme }) => theme.colors.secondary};
  border: none;
  ${(props) => activeButton(props.theme, props.active, props.likeOrDislike)}
  cursor: pointer;
  &:disabled {
    opacity: 0.2;
    cursor: not-allowed;
  }
`;

const activeButton = (
  theme: DefaultTheme,
  active: boolean,
  likeOrDislike: string
) => {
  if (active) {
    if (likeOrDislike === "like") {
      return {
        background: theme.colors.tertiary,
        color: "white",
      } as CSSObject;
    } else {
      return {
        background: "#fb3535",
        color: "white",
      } as CSSObject;
    }
  }
};
