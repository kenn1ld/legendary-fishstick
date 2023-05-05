import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';

interface GlobalHeaderProps {
  title: string;
  onLogout?: () => void;
}

const GlobalHeader: React.FC<GlobalHeaderProps> = ({ title, onLogout }) => {
  const handleLogout = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          {title}
        </Typography>
        {onLogout && (
          <Button color="inherit" onClick={handleLogout}>
            Logout
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
