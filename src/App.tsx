import { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { ThemeProvider } from "styled-components";
import { GlobalStyles } from "./themes/globalStyles";
import themes from "./themes/schema.json";
import AuthContext from "./contexts/AuthContext";
import Navbar from "./components/Navbar";
import "semantic-ui-css/semantic.min.css";
import { fetchCurrentUser } from "./api/auth";
import AuthWrapper from "./components/AuthWrapper";
import Profile from "./pages/Profile";
import { Container } from "semantic-ui-react";
import { useAuth0 } from "@auth0/auth0-react";

function App() {
  const [user, setUser] = useState<any>();
  const [fetchingUser, setFetchingUser] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes.light);
  const { getAccessTokenSilently, user: auth0user, isLoading } = useAuth0();
  useEffect(() => {
    if (!isLoading) {
      fetchUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user, isLoading]);
  const fetchUser = async () => {
    if (!user) {
      const token = await getAccessTokenSilently().catch((err) =>
        console.log(err)
      );

      setUser(await fetchCurrentUser(setFetchingUser, token, auth0user));
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchingUser, setFetchingUser }}
    >
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Navbar setSelectedTheme={setSelectedTheme} />
        <Container style={{ height: "100%" }}>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route
              path="/profile"
              element={
                <AuthWrapper>
                  <Profile />
                </AuthWrapper>
              }
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
