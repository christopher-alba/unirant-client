import styled from "styled-components";

export const WallpaperWrapper = styled("div")`
  width: 100%;
  height: 40vh;
  position: relative;
  overflow: hidden;
  border-radius: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Wallpaper = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const Name = styled("h1")`
  position: relative;
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
