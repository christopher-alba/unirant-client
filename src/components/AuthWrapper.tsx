import React, { FC, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { fetchCurrentUserInWrapper } from "../api/auth";
import AuthContext, { UserInfo } from "../contexts/AuthContext";

const AuthWrapper: FC<{ children: JSX.Element }> = ({ children }) => {
  const [userLocal, setUserLocal] = useState<UserInfo>();
  const [fetchingUser, setFetchingUser] = useState(true);
  const { user } = useContext(AuthContext);
  const authenticate = async () => {
    const user = await fetchCurrentUserInWrapper(
      localStorage.getItem("localToken") as any
    );
    setUserLocal(user);
    setFetchingUser(false);
  };
  useEffect(() => {
    authenticate();
  }, [user]);
  if (fetchingUser) {
    return <div>Fetching User...</div>;
  } else if (!fetchingUser && !userLocal?._id) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
};

export default AuthWrapper;
