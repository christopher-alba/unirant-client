import styled from "styled-components";

export const ProfileBackgroundDiv = styled("div")`
  width: 100%;
  height: 40vh;
  background: ${({ theme }) => theme.colors.primaryHover};
  border-radius: 20px;
  overflow: hidden;
  position: relative;
`;

export const ProfileBackgroundImg = styled("img")`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  position: absolute;
  top: 0;
  left: 0;
`;

export const ProfilePicture = styled("img")`
  height: 100px;
  width: 100px;
  object-fit: cover;
  object-position: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  border: 2px solid ${({ theme }) => theme.colors.primary};
  border-bottom: none;
  position: absolute;
  bottom: 0;
  left: 100px;
  z-index: 1;
  display: block;
`;

export const ProfileDisplayName = styled("h1")`
  background: ${({ theme }) =>
    theme.name === "light" ? "#ffffff54" : "#00000054"};
  padding: 10px 50px;
  border-radius: 5px;
`;

export const ProfileBannerContentWrapper = styled("div")`
  position: absolute;
  bottom: 50px;
  right: 100px;
  z-index: 1;
`;

export const InfoPanel = styled("div")`
  background: ${({ theme }) => theme.colors.primaryLight};
  width: fit-content;
  padding: 50px;
  border-radius: 10px;
  margin-top: 20px;
`;

export const TruncatedText = styled("p")`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  width: 200px;
  display: inline-block;
  margin: 0;
`;
