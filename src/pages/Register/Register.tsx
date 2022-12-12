import { RedirectLoginOptions, useAuth0 } from "@auth0/auth0-react";
import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { Button, Icon } from "semantic-ui-react";
import { ThemeContext } from "styled-components";
import {
  InnerDiv,
  MainDiv,
  RegisterLeftDiv,
  RegisterRightDiv,
  StyledHeadingLeft,
  StyledHeadingRight,
  StyledPRight,
  SubHeadingLeft,
} from "./styled";

const Register: FC = () => {
  const { loginWithRedirect } = useAuth0();
  const theme = useContext(ThemeContext);
  const auth0Register = () => {
    loginWithRedirect({
      prompt: "login",
      screen_hint: "signup",
    } as RedirectLoginOptions);
  };
  return (
    <MainDiv>
      <InnerDiv>
        <RegisterLeftDiv>
          <StyledHeadingLeft>Register</StyledHeadingLeft>
          <Button
            onClick={auth0Register}
            color="google plus"
            fluid
            icon
            labelPosition="right"
          >
            <Icon name="lock" />
            Register with Auth0
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
              <Icon name="book" />
            </Button>
          </a>
        </RegisterLeftDiv>
        <RegisterRightDiv>
          <StyledHeadingRight>Don't want to register?</StyledHeadingRight>
          <StyledPRight>
            Don't worry! Log in using your Google account or if you already
            registered, click the button below to log in.
          </StyledPRight>
          <Link to="/login">
            <Button fluid color={theme.name === "light" ? undefined : "black"}>
              Login
            </Button>
          </Link>
        </RegisterRightDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default Register;
