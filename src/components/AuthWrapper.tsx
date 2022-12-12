import { useAuth0 } from "@auth0/auth0-react";
import React, { FC } from "react";
import { Navigate } from "react-router-dom";

const AuthWrapper: FC<{ children: JSX.Element }> = ({ children }) => {
  const { user: auth0user, isLoading } = useAuth0();
  if (isLoading) {
    return <div>Fetching User...</div>;
  } else if (!isLoading && !auth0user) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default AuthWrapper;
