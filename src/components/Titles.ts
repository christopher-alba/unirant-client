import styled from "styled-components";

export const StyledH1 = styled("h1")`
  color: ${({ theme }) => theme.colors.tertiary};
  letter-spacing: 1px;
  margin: 0;
`;

export const StyledH3 = styled("h3")`
  color: ${({ theme }) => theme.colors.tertiary};
  letter-spacing: 1px;
`;

export const StyledPHeading = styled("p")`
  font-weight: 700;
  margin: 0;
`;
