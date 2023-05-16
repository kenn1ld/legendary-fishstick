// App.tsx
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./home/home";
import SignupPage from "./signup/signup";
import LoginPage from "./pages/login/login";
import GlobalHeader from "./header/globalheader";
import { User } from "./interface/user";
import useAuth from "./hooks/useAuth";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import ApiPage from "./apipage/apiPage";
import Football from "components/Football/Football";

const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: "#32cd32",
    },
  },
});

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUser } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      (async () => {
        try {
          setUser(await getUser(storedToken));
        } catch (err) {
          console.error("Error getting user information:", err);
          localStorage.clear();
        }
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
  }, [getUser]);

  const handleLogout = () => {
    localStorage.clear();
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App" style={{ position: "relative", minHeight: "100vh" }}>
          <GlobalHeader
            title="Kenneth's Portfolio"
            user={user}
            onLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={user ? <Home user={user} /> : <Navigate replace to="/login" />}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/ApiPlayground" element={<ApiPage />} />
            <Route path="/Football" element={<Football/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;