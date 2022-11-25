import React, { FC, useContext, useState } from "react";
import { fetchCurrentUser, login } from "../../api/auth";
import { originURL } from "../../api/origin";
import AuthContext from "../../contexts/AuthContext";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loggingIn, setLoggingIn] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(false);
  const { setUser, setFetchingUser } = useContext(AuthContext);
  const googleLogin = () => {
    window.open(originURL + "/api/v1/auth/google", "_self");
  };
  const defaultLogin = async () => {
    setError(false);
    setMessage("Verifying user details.");
    setLoggingIn(true);
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
    setLoggingIn(false);
    setMessage(response.message);
    if (!response.loggedIn) {
      setError(true);
    }
    setTimeout(() => {
      setMessage("");
    }, 5000);
  };
  const handleUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };
  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };
  return (
    <>
      <h1>Login</h1>
      <button onClick={googleLogin}>Login with Google</button>
      <p>Username</p>
      <input
        type="text"
        placeholder="enter username"
        onChange={handleUsernameChange}
      />
      <p>Password</p>
      <input
        type="password"
        placeholder="enter password"
        onChange={handlePasswordChange}
      />
      <button onClick={defaultLogin}>Login</button>
      {message.length > 0 && (
        <p style={{ color: loggingIn ? "blue" : error ? "red" : "green" }}>
          {message}
        </p>
      )}
    </>
  );
};

export default Login;
