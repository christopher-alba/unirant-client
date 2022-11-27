import React, { FC, useContext } from "react";
import AuthContext from "../../contexts/AuthContext";

const Homepage: FC = () => {
  const { user } = useContext(AuthContext);
  return <h1>Homepage. Welcome {user?.username}</h1>;
};

export default Homepage;
