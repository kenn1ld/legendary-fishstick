import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

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

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, user, onLogout, onLogin }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  const handleLogin = () => {
    if (onLogin) {
      onLogin();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {user && (
          <Typography variant="subtitle1" component="span" sx={{ marginRight: 2 }}>
            {user.username}
          </Typography>
        )}
        {user ? (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        ) : (
          <Button color="inherit" onClick={handleLogin}>
            Login
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
