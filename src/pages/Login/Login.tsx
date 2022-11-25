import React, { FC, useState } from "react";
import { login } from "../../api/auth";
import { originURL } from "../../api/origin";

const Login: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const googleLogin = () => {
    window.open(originURL + "/api/v1/auth/google", "_self");
  };
  const defaultLogin = () => {
    login({
      username,
      password,
    });
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
    </>
  );
};

export default Login;
