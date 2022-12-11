import { useAuth0 } from "@auth0/auth0-react";
import { Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Icon, Message } from "semantic-ui-react";
import { ThemeContext } from "styled-components";
import { fetchCurrentUser } from "../../api/auth";
import { originURL } from "../../api/origin";
import AuthContext from "../../contexts/AuthContext";
import {
  FormContentsWrapper,
  InnerDiv,
  LoginLeftDiv,
  LoginRightDiv,
  MainDiv,
  StyledHeadingLeft,
  StyledHeadingRight,
  StyledInput,
  StyledPLeft,
  StyledPRight,
} from "./styled";

const Login: FC = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setFetchingUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const theme = useContext(ThemeContext);
  const { loginWithRedirect } = useAuth0();
  const auth0Login = () => {
    loginWithRedirect({
      prompt: "login",
    });
  };
  // const defaultLogin = async (
  //   username: string,
  //   password: string,
  //   setSubmitting: any
  // ) => {
  //   setError(false);
  //   setMessage("Verifying user details.");
  //   setSubmitting(true);
  //   const response = await login({
  //     username,
  //     password,
  //   });
  //   setSubmitting(false);
  //   setMessage(response.message);
  //   if (!response.loggedIn) {
  //     setError(true);
  //   } else {
  //     setTimeout(async () => {
  //       setMessage("");
  //       setUser(
  //         await fetchCurrentUser(
  //           setFetchingUser,
  //           localStorage.getItem("localToken") as any
  //         )
  //       );
  //       navigate("/");
  //     }, 1000);
  //   }
  //   setTimeout(() => {
  //     setMessage("");
  //   }, 5000);
  // };
  const initialValues = {
    username: "",
    password: "",
  };
  const validate = (values: { username: string; password: string }) => {
    const errors = {};
    if (!values.username) {
      (errors as any).username = "Required";
    }
    if (!values.password) {
      (errors as any).password = "Required";
    }
    return errors;
  };
  const toggleShowPW = () => {
    setShowPassword(!showPassword);
  };
  return (
    <MainDiv>
      <InnerDiv>
        <LoginLeftDiv>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              // await defaultLogin(
              //   values.username,
              //   values.password,
              //   setSubmitting
              // );
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form onSubmit={handleSubmit}>
                <FormContentsWrapper>
                  <StyledHeadingLeft>Login</StyledHeadingLeft>
                  <Button
                    color="google plus"
                    type="button"
                    icon
                    fluid
                    onClick={auth0Login}
                    labelPosition="right"
                  >
                    Login with Google
                    <Icon name="google" />
                  </Button>
                  <div>
                    <StyledPLeft>Username</StyledPLeft>
                    <StyledInput
                      fluid
                      name="username"
                      type="text"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.username}
                    />
                  </div>
                  <div>
                    <StyledPLeft>Password</StyledPLeft>
                    <StyledInput
                      fluid
                      name="password"
                      type={showPassword ? "text" : "password"}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.password}
                    />
                  </div>

                  <Button
                    fluid
                    color={theme.name === "light" ? "black" : undefined}
                    size="tiny"
                    type="button"
                    icon
                    labelPosition="left"
                    onClick={toggleShowPW}
                  >
                    <Icon name={showPassword ? "eye slash" : "eye"} />
                    {showPassword ? "hide password" : "show password"}
                  </Button>
                  <Button fluid primary type="submit" disabled={isSubmitting}>
                    Login
                  </Button>
                </FormContentsWrapper>
                {message.length > 0 ? (
                  <Message
                    info={isSubmitting}
                    negative={error}
                    success={!isSubmitting && !error}
                    content={message}
                  />
                ) : (
                  ""
                )}
              </form>
            )}
          </Formik>
        </LoginLeftDiv>
        <LoginRightDiv>
          <StyledHeadingRight>Havn't Registered?</StyledHeadingRight>
          <StyledPRight>
            Don't worry! Log in using your Google account or you can register
            below with Unirant.
          </StyledPRight>
          <Link to="/register">
            <Button color={theme.name === "light" ? undefined : "black"}>
              Register
            </Button>
          </Link>
        </LoginRightDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default Login;
