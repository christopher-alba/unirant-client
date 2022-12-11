import { Formik } from "formik";
import React, { FC, useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button, Icon, Message } from "semantic-ui-react";
import { ThemeContext } from "styled-components";
import { originURL } from "../../api/origin";
import AuthContext from "../../contexts/AuthContext";
import {
  FormContentsWrapper,
  InnerDiv,
  MainDiv,
  RegisterLeftDiv,
  RegisterRightDiv,
  StyledHeadingLeft,
  StyledHeadingRight,
  StyledInput,
  StyledPLeft,
  StyledPRight,
} from "./styled";

const Register: FC = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const theme = useContext(ThemeContext);

  const navigate = useNavigate();

  const googleLogin = () => {
    window.open(originURL + "/api/v1/auth/google", "_self");
  };
  // const defaultRegister = async (
  //   username: string,
  //   email: string,
  //   password: string,
  //   setSubmitting: any
  // ) => {
  //   setError(false);
  //   setSubmitting(true);
  //   setMessage("Attempting to register an account.");
  //   const response = await register({
  //     username,
  //     email,
  //     password,
  //   });
  //   setSubmitting(false);
  //   setMessage(response.message);
  //   if (!response.registered) {
  //     setError(true);
  //   } else {
  //     setTimeout(() => {
  //       setMessage("");
  //       navigate("/login");
  //     }, 1000);
  //   }
  //   setTimeout(() => {
  //     setMessage("");
  //   }, 5000);
  // };
  const initialValues = {
    username: "",
    email: "",
    password: "",
  };
  const validate = (values: {
    username: string;
    email: string;
    password: string;
  }) => {
    const errors = {};
    if (!values.username) {
      (errors as any).username = "Required";
    }
    if (!values.email) {
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
        <RegisterLeftDiv>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              // await defaultRegister(
              //   values.username,
              //   values.email,
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
                  <StyledHeadingLeft>Register</StyledHeadingLeft>
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
                    <StyledPLeft>Email</StyledPLeft>
                    <StyledInput
                      fluid
                      name="email"
                      type="email"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.email}
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
                    Register
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
          <Button
            color="google plus"
            type="button"
            icon
            fluid
            onClick={googleLogin}
            labelPosition="right"
          >
            Login with Google
            <Icon name="google" />
          </Button>
        </RegisterRightDiv>
      </InnerDiv>
    </MainDiv>
  );
};

export default Register;
