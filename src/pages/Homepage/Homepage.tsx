import React, { FC, useContext, useEffect } from "react";
import { fetchCurrentUser } from "../../api/auth";
import AuthContext from "../../contexts/AuthContext";

const Homepage: FC = () => {
  const { user, setUser, setFetchingUser } = useContext(AuthContext);
  const fetchUser = async () => {
    if (!user) {
      const userProfile = await fetchCurrentUser(
        setFetchingUser,
        localStorage.getItem("localToken") as any
      );
      console.log(userProfile);
      setUser(userProfile);
    }
  };
  useEffect(() => {
    fetchUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  useEffect(() => {
    console.log(user);
  }, [user]);
  return <h1>Homepage. Welcome {user?.username}</h1>;
};

export default Homepage;
