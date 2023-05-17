import React, { useState, useEffect, useCallback, useMemo, CSSProperties } from 'react';

import {ThemeProvider, CssBaseline } from '@mui/material';
import Football from './components/Football/Football';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';

import ApiPage from './apipage/apiPage';
import GlobalHeader from './header/globalheader';
import Home from './home/home';
import useAuth from './hooks/useAuth';
import { User } from './interface/user';
import LoginPage from './pages/login/login';
import SignupPage from './signup/signup';
import theme from './theme';
import FootballData from './components/Football/FootballData';

function App() {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUser } = useAuth();
  const appStyle = useMemo<CSSProperties>(() => {
  return { position: 'relative', minHeight: '100vh' };
}, []);
  useEffect(() => {
    const storedToken = localStorage.getItem('token');

    if (storedToken) {
      void (async () => {
        try {
          setUser(await getUser(storedToken));
        } catch (err) {
          console.error('Error getting user information:', err);
          localStorage.clear();
        }
        setIsLoading(false);
      })();
    } else {
      setIsLoading(false);
    }
  }, [getUser]);

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  const homeElement = useMemo(() => {
    return user ? <Home user={user} /> : <Navigate replace to="/login" />;
  }, [user]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <div className="App" style={appStyle}>
          <GlobalHeader
            title="Kenneth's Portfolio"
            user={user}
            onLogout={handleLogout}
          />
          <Routes>
            <Route
              path="/"
              element={homeElement}
            />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/ApiPlayground" element={<ApiPage />} />
            <Route path="/Football" element={<Football />} />
            <Route path="/FootballData" element={<FootballData/>} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}
export default App;