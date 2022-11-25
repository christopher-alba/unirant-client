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

function App() {
  const [user, setUser] = useState<any>();
  const [fetchingUser, setFetchingUser] = useState(false);
  const [selectedTheme, setSelectedTheme] = useState(themes.light);

  return (
    <AuthContext.Provider
      value={{ user, setUser, fetchingUser, setFetchingUser }}
    >
      <ThemeProvider theme={selectedTheme}>
        <GlobalStyles />
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </ThemeProvider>
    </AuthContext.Provider>
  );
}

export default App;
