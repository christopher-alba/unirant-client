import React, { FC, useContext } from "react";
import { Link } from "react-router-dom";
import { logout } from "../../api/auth";
import AuthContext from "../../contexts/AuthContext";

const Navbar: FC = () => {
  const { user, setUser, fetchingUser } = useContext(AuthContext);
  const handleLogout = async () => {
    await logout(user?._id as any);
    localStorage.removeItem("localToken");
    setUser(undefined);
  };
  return (
    <div>
      {fetchingUser && <p>Fetching User...</p>}
      {user?._id ? (
        <div>
          <Link to="/">Home</Link>
          <button onClick={handleLogout}>Logout</button>
        </div>
      ) : (
        <div>
          <Link to="/">Home</Link>
          <Link to="/register">Register</Link>
          <Link to="/login">Login</Link>
        </div>
      )}
    </div>
  );
};

export default Navbar;
