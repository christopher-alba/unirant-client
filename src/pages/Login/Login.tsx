import { Formik, FormikHelpers } from "formik";
import React, { FC, useContext, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "semantic-ui-react";
import { ThemeContext } from "styled-components";
import { fetchCurrentUser, login } from "../../api/auth";
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
  StyledPRight,
} from "./styled";

const Login: FC = () => {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const { setUser, setFetchingUser } = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const googleLogin = () => {
    window.open(originURL + "/api/v1/auth/google", "_self");
  };
  const defaultLogin = async (
    username: string,
    password: string,
    setSubmitting: any
  ) => {
    setError(false);
    setMessage("Verifying user details.");
    setSubmitting(true);
    const response = await login({
      username,
      password,
    });
    setUser(
      await fetchCurrentUser(
        setFetchingUser,
        localStorage.getItem("localToken") as any
      )
    );
    setSubmitting(false);
    setMessage(response.message);
    if (!response.loggedIn) {
      setError(true);
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
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
  return (
    <MainDiv>
      <InnerDiv>
        <LoginLeftDiv>
          <Formik
            initialValues={initialValues}
            validate={validate}
            onSubmit={async (values, { setSubmitting }) => {
              defaultLogin(values.username, values.password, setSubmitting);
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
              <form>
                <FormContentsWrapper>
                  <StyledHeadingLeft>Login</StyledHeadingLeft>
                  <StyledInput type="text" />
                  <StyledInput
                    type={showPassword ? "text" : "password"}
                    action={{
                      icon: "eye",
                      
                    }}
                  />
                  <Button fluid primary type="submit">
                    Login
                  </Button>
                </FormContentsWrapper>
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
