import styled from "styled-components";

export const HeadingWrapper = styled("div")`
  display: flex;
  justify-content: space-between;
  border-bottom: 8px solid ${({ theme }) => theme.colors.primary};
  margin: 50px 0;
  padding-bottom: 5px;
`;

export const CommunityWrapper = styled("div")`
  display: flex;
  height: 250px;
  overflow: hidden;
  background: ${({ theme }) => theme.colors.primary};
  border-radius: 10px;
  margin: 20px 0;
`;

export const Image = styled("img")`
  width: 300px;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

export const ContentWrapper = styled("div")`
  flex-shrink: 1;
  width: 50%;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const Name = styled("h1")``;

export const StyledP = styled("p")`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 5;
  -webkit-box-orient: vertical;
  margin-bottom: 20px !important;
`;

export const ExtraWrapper = styled("div")`
  width: 20%;
  flex-grow: 1;
  padding: 20px;
  text-align: right;
`;

export const ExtraInfo = styled("h3")`
  color: #898989;
  margin: 0;
`;
