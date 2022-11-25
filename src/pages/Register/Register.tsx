import React, { FC, useState } from "react";
import { register } from "../../api/auth";

const Register: FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(evt.target.value);
  };
  const handleEmailChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(evt.target.value);
  };
  const handlePasswordChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(evt.target.value);
  };
  const defaultRegister = () => {
    register({
      username,
      email,
      password,
    });
  };

  return (
    <>
      <h1>Register</h1>
      <p>username</p>
      <input
        type="text"
        placeholder="enter username"
        onChange={handleUsernameChange}
      />
      <p>email</p>
      <input
        type="text"
        placeholder="enter email"
        onChange={handleEmailChange}
      />
      <p>password</p>
      <input
        type="password"
        placeholder="enter password"
        onChange={handlePasswordChange}
      />
      <button onClick={defaultRegister}>Sign up</button>
    </>
  );
};

export default Register;
