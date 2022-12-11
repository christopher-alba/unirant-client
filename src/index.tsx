import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter } from "react-router-dom";
import { Auth0Provider } from "@auth0/auth0-react";
import "./index.css";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <BrowserRouter>
    <Auth0Provider
      domain="chris-alba-dev.au.auth0.com"
      clientId="yFIKpm2lVCQRiRVORk9ICXMWSvSSo3oH"
      redirectUri={window.location.origin}
      audience="https://chris-alba-dev.au.auth0.com/api/v2/"
    >
      <App />
    </Auth0Provider>
  </BrowserRouter>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
