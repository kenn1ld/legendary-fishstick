import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { motion } from 'framer-motion';
import HomeIcon from '@mui/icons-material/Home';
import LoginIcon from '@mui/icons-material/Login';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import { Link as RouterLink } from 'react-router-dom';
import CodeIcon from '@mui/icons-material/Code';
import { debounce } from 'lodash';

interface User {
  _id: string;
  name: string;
  username: string;
  email: string;
}

interface GlobalHeaderProps {
  title: string;
  user: User | null;
  onLogout?: () => void;
  onLogin?: () => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, user, onLogout }) => {
  const debouncedHandleLogout = debounce(() => {
  if (onLogout) {
    onLogout();
  }
}, 250); // You can adjust the debounce delay in milliseconds as needed

  return (
    <AppBar position="static" elevation={1} color="default" sx={{ marginBottom: '1rem' }}>
      <Toolbar>
        <Box display="flex" alignItems="center">
          {/* Add your logo as an SVG or an image */}
          <motion.svg
            initial="initial"
            animate="animate"
            transition={{ duration: 0.5 }}
            width="50"
            height="50"
            fill="limegreen"
          >
            {/* Update with your logo's path data */}
            <path d="M25 ... " />
          </motion.svg>
          <Box flexGrow={1} ml={1}>
            <motion.div
              initial="initial"
              animate="animate"
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Typography variant="h6" component="div">
                {title}
              </Typography>
            </motion.div>
          </Box>
        </Box>
        <Box display="flex" alignItems="center">
          {/* Home icon */}
          <IconButton sx={{ color: "limegreen" }} component={RouterLink} to="/">
            <HomeIcon />
          </IconButton>
          <IconButton sx={{ color: "limegreen" }} component={RouterLink} to="/ApiPlayground">
                <CodeIcon />
                </IconButton>
          {/* Login and Logout icons */}
          {user ? (
            <>
              {/* Logout icon */}
              <IconButton sx={{ color: "limegreen" }} onClick={debouncedHandleLogout}>
                <LogoutIcon />
              </IconButton>
            </>
          ) : (
            <>
              {/* Login icon */}
              <IconButton sx={{ color: "limegreen" }} component={RouterLink} to="/login">
                <LoginIcon />
              </IconButton>
              {/* Signup icon */}
              <IconButton sx={{ color: "limegreen" }} component={RouterLink} to="/signup">
                <PersonAddIcon />
                </IconButton>
                {/* API Playground icon */}
              <IconButton sx={{ color: "limegreen" }} component={RouterLink} to="/ApiPlayground">
                <CodeIcon />
                </IconButton>
            </>
          )}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;