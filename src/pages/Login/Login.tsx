import { useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { ThemeContext } from "styled-components";
import {
  InnerDiv,
  LoginLeftDiv,
  LoginRightDiv,
  MainDiv,
  StyledHeadingLeft,
  StyledHeadingRight,
  StyledPRight,
  SubHeadingLeft,
} from "./styled";

const Login: FC = () => {
  const { loginWithRedirect } = useAuth0();
  const theme = useContext(ThemeContext);
  const auth0Login = () => {
    loginWithRedirect({
      prompt: "login",
    });
  };

  return (
    <MainDiv>
      <InnerDiv>
        <LoginLeftDiv>
          <StyledHeadingLeft>Login</StyledHeadingLeft>
          <Button
            onClick={auth0Login}
            color="google plus"
            fluid
            icon
            labelPosition="right"
          >
            <Icon name="lock" />
            Login with Auth0
          </Button>
          <SubHeadingLeft>What is Auth0?</SubHeadingLeft>
          <p>
            Auth0 is an authentication and user management service that allows
            software engineers to integrate secure authentication in the
            applications they build. What this means for you is you can trust
            that our platform will be less vulnerable to attacks and your data
            will be safe.
          </p>
          <a
            href="https://auth0.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button primary fluid tabIndex={-1} icon labelPosition="right">
              Learn More about Auth0
              <Icon name="book"/>
            </Button>
          </a>
        </LoginLeftDiv>
        <LoginRightDiv>
          <StyledHeadingRight>Havn't Registered?</StyledHeadingRight>
          <StyledPRight>
            Don't worry! Log in using your Google account or you can register
            below with Unirant through Auth0.
          </StyledPRight>
          <Link to="/register">
            <Button fluid color={theme.name === "light" ? undefined : "black"}>
              Register
            </Button>
          </Link>
        </LoginRightDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default Login;
