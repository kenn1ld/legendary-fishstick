import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Home from "./home/home";
import SignupPage from "./signup/signup";
import LoginPage from "./login/login";
import GlobalHeader from "./header/globalheader";
import { User } from "./interface/user";
import useAuth from "./hooks/useAuth";
import { createTheme, ThemeProvider, CssBaseline } from "@mui/material";
import CryptoCurrency from "./components/CryptoCurrency";
import ApiPage from "./apipage/apiPage";


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
          const userData = await getUser(storedToken);
          setUser(userData);
        } catch (err) {
          console.error("Error getting user information:", err);
          // Clear the invalid token from localStorage
          localStorage.removeItem("token");
        }
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleLogout = () => {
    // Clear the token from localStorage and update the user state
    localStorage.removeItem("token");
    setUser(null);
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App">
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
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;