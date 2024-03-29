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
import EditProfile from "./pages/EditProfile";
import Communities from "./pages/Communities";
import CommunityContext, {
  Community as CommunityType,
} from "./contexts/CommunityContext";
import Community from "./pages/Community";
import Feed from "./pages/Feed";

import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader

function App() {
  const [user, setUser] = useState<any>(undefined);
  const [fetchingUser, setFetchingUser] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes.light);
  const [communities, setCommunities] = useState<CommunityType[]>();

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
      const userResponse = await fetchCurrentUser(
        setFetchingUser,
        token,
        auth0user
      );

      setUser(userResponse);
    }
  };
  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchingUser, setFetchingUser }}
    >
      <CommunityContext.Provider value={{ communities, setCommunities }}>
        <ThemeProvider theme={selectedTheme}>
          <GlobalStyles />
          <Navbar setSelectedTheme={setSelectedTheme} />
          <Container>
            <Routes>
              <Route path="/" element={<Homepage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/communities" element={<Communities />} />
              <Route path="/community" element={<Community />} />
              <Route
                path="/profile"
                element={
                  <AuthWrapper>
                    <Profile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/profile/edit"
                element={
                  <AuthWrapper>
                    <EditProfile />
                  </AuthWrapper>
                }
              />
              <Route
                path="/feed"
                element={
                  <AuthWrapper>
                    <Feed />
                  </AuthWrapper>
                }
              />
            </Routes>
          </Container>
        </ThemeProvider>
      </CommunityContext.Provider>
    </AuthContext.Provider>
  );
}

export default App;
