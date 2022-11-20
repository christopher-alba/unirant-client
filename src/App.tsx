import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";
import axios, { AxiosResponse } from "axios";

function App() {
  const [userObject, setUserObject] = useState<any>();

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/v1/getuser", {
        withCredentials: true,
      })
      .then((res: AxiosResponse) => {
        console.log(res);
        if (res.data) {
          setUserObject(res.data);
        }
      });
  }, []);
  const googleLogin = () => {
    window.open("http://localhost:5000/api/v1/auth/google", "_self");
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <button onClick={googleLogin}>Login with google</button>
        <h2>Welcome {userObject?.username}</h2>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
