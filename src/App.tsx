import React, { useState, useEffect, useCallback, useMemo } from "react";
import axios from "axios";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { ThemeProvider, CssBaseline, Typography, Box } from "@mui/material";
import GlobalHeader from "./header/globalheader";
import Home from "./home/home";
import useAuth from "./hooks/useAuth";
import { User } from "./interface/user";
import LoginPage from "./pages/login/login";
import SignupPage from "./pages/signup/signup";
import ApiPage from "./pages/Crypto/cryptoPage";
import Football from "./components/Football/Football";
import FootballData from "./components/Football/FootballData";
import theme from "./theme";
import CountUp from "react-countup";
import Tooltip from '@mui/material/Tooltip';
import IconButton from '@mui/material/IconButton';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';

interface HeaderTitleProps {
  visitorCount: number;
}

const useFetchUser = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const { getUser } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem("token");

    if (storedToken) {
      void (async () => {
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

  const handleLogout = useCallback(() => {
    localStorage.clear();
    setUser(null);
  }, []);

  return { user, isLoading, handleLogout, setUser };
};

const useFetchVisitorCount = () => {
  const [visitorCount, setVisitorCount] = useState<number>(0);

  useEffect(() => {
    axios
      .get("/api/visitors")
      .then((response) => {
        setVisitorCount(response.data.count);
      })
      .catch((error) => {
        console.error("Error fetching visitor count:", error);
      });
  }, []);

  return visitorCount;
};

const HeaderTitle: React.FC<HeaderTitleProps> = ({ visitorCount }) => (
  <Box display="flex" alignItems="center">
    <Typography variant="h5" component="span" color="primary">
      Kenneth&apos;s Portfolio
    </Typography>
    <Box ml={3} display="flex" alignItems="center">
      <Tooltip title="Visitor Count" arrow>
        <IconButton color="primary">
          <PeopleAltIcon />
        </IconButton>
      </Tooltip>
      <Typography variant="h6" component="span">
        <CountUp end={visitorCount} duration={2.75} />
      </Typography>
    </Box>
  </Box>
);

function App() {
  const { user, isLoading, handleLogout, setUser } = useFetchUser();
  const visitorCount = useFetchVisitorCount();

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
        <div className="App">
          <GlobalHeader
            title={<HeaderTitle visitorCount={visitorCount} />}
            user={user}
            onLogout={handleLogout}
          />
          <Routes>
            <Route path="/" element={homeElement} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/login" element={<LoginPage setUser={setUser} />} />
            <Route path="/ApiPlayground" element={<ApiPage />} />
            <Route path="/Football" element={<Football />} />
            <Route path="/FootballData" element={<FootballData />} />
          </Routes>
        </div>
      </Router>
    </ThemeProvider>
  );
}

export default App;
