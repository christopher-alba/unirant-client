import styled from "styled-components";

export const HeaderWrapper = styled("div")`
  display: flex;
  background: ${({ theme }) => theme.colors.primary};
  flex-direction: column;
  margin-top: 50px;
  overflow: hidden;
  border-radius: 20px;
`;

export const WallpaperWrapper = styled("div")`
  width: 100%;
  min-height: 40vh;
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

export const Wallpaper = styled("img")`
  width: 100%;
  height: 40vh;
  object-fit: cover;
  object-position: center;
`;

export const Name = styled("h1")`
  position: absolute;
  left: 10px;
  bottom: 10px;
  margin: 0;
  z-index: 1;
  padding: 10px 30px;
  border-radius: 5px;
  background: ${({ theme }) => {
    if (theme.name === "light") {
      return "#ffffffa4";
    } else {
      return "#000000a4";
    }
  }};
`;

export const TextWrapper = styled("div")`
  padding: 30px;
`;

export const MemberCount = styled("p")`
  font-size: 1.3rem;
  font-weight: 700;
  color: ${({ theme }) => theme.colors.secondaryHover};
`;

export const StyledButtonWrapper = styled("div")`
  position: absolute;
  right: 10px;
  bottom: 10px;
`;
