import React, { Dispatch, FC, SetStateAction, useContext } from "react";
import { Link } from "react-router-dom";
import { DefaultTheme, ThemeContext } from "styled-components";
import { logout } from "../../api/auth";
import AuthContext from "../../contexts/AuthContext";
import themes from "../../themes/schema.json";

const Navbar: FC<{
  setSelectedTheme: Dispatch<SetStateAction<DefaultTheme>>;
}> = ({ setSelectedTheme }) => {
  const { user, setUser, fetchingUser } = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const handleLogout = async () => {
    await logout(user?._id as any);
    localStorage.removeItem("localToken");
    setUser(undefined);
  };
  const toggleThemeChange = () => {
    if (theme.name === "light") {
      setSelectedTheme(themes.dark);
    } else {
      setSelectedTheme(themes.light);
    }
  };
  return (
    <div>
      {fetchingUser && <p>Fetching User...</p>}
      <button onClick={toggleThemeChange}>Toggle Theme</button>
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
