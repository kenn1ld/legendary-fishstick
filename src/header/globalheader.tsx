import React from "react";

import CodeIcon from "@mui/icons-material/Code";
import HomeIcon from "@mui/icons-material/Home";
import LoginIcon from "@mui/icons-material/Login";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuIcon from "@mui/icons-material/Menu";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import {
  AppBar,
  Toolbar,
  Typography,
  Box,
  IconButton,
  Tooltip,
  Grid,
  useMediaQuery,
  Drawer,
  List,
  ListItemIcon,
  ListItemText,
  useTheme,
  ListItemButton,
} from "@mui/material";
import { motion } from "framer-motion";
import { debounce } from "lodash";
import { Link as RouterLink, useNavigate } from "react-router-dom";

const useDebouncedHandleLogout = (onLogout: (() => void) | undefined) => {
  const debouncedHandleLogout = React.useMemo(() => {
    return debounce(() => {
      if (onLogout) {
        onLogout();
      }
    }, 250);
  }, [onLogout]);

  return debouncedHandleLogout;
};

const drawerButtonColors = { color: "primary" };

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
const appBarStyles = { marginBottom: "1rem" };
const svgTransition = { duration: 0.5 };
const divTransition = { duration: 0.5, delay: 0.2 };

const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  title,
  user,
  onLogout,
}) => {
  const debouncedHandleLogout = useDebouncedHandleLogout(onLogout);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const navigate = useNavigate();

  const handleDrawerClick = React.useCallback(
    (path: string) => {
      setDrawerOpen(false);
      navigate(path);
    },
    [navigate]
  );

  // Define the functions here
  const handleDrawerClickHome = React.useCallback(
    () => handleDrawerClick("/"),
    [handleDrawerClick]
  );
  const handleDrawerClickApiPlayground = React.useCallback(
    () => handleDrawerClick("/ApiPlayground"),
    [handleDrawerClick]
  );
  const handleDrawerClickFootball = React.useCallback(
    () => handleDrawerClick("/Football"),
    [handleDrawerClick]
  );
  const handleDrawerClickLogin = React.useCallback(
    () => handleDrawerClick("/login"),
    [handleDrawerClick]
  );
  const handleDrawerClickSignup = React.useCallback(
    () => handleDrawerClick("/signup"),
    [handleDrawerClick]
  );
  const handleOpenDrawer = React.useCallback(() => setDrawerOpen(true), []);
  const handleCloseDrawer = React.useCallback(() => setDrawerOpen(false), []);
  const iconButtonSx = React.useMemo(() => ({ mr: -1 }), []);

  return (
    <AppBar position="static" elevation={1} color="default" sx={appBarStyles}>
      <Toolbar>
        <Grid container alignItems="center" justifyContent="space-between">
          <Grid item>
            <Box display="flex" alignItems="center">
              {/* Add your logo as an SVG or an image */}
              <motion.svg
                initial="initial"
                animate="animate"
                transition={svgTransition}
                width="50"
                height="50"
                fill="primary"
              >
                {/* Update with your logo's path data */}
                <path d="M25 ... " />
              </motion.svg>
              <Box ml={1}>
                <motion.div
                  initial="initial"
                  animate="animate"
                  transition={divTransition}
                >
                  <Typography variant="h6" component="div">
                    {title}
                  </Typography>
                </motion.div>
              </Box>
            </Box>
          </Grid>
          <Grid item>
            {isMobile ? (
              <>
                <IconButton
                  edge="end"
                  color="inherit"
                  aria-label="menu"
                  sx={iconButtonSx}
                  onClick={handleOpenDrawer}
                >
                  <MenuIcon color="primary" />
                </IconButton>
                <Drawer
                  anchor="right"
                  open={drawerOpen}
                  onClose={handleCloseDrawer}
                >
                  <List>
                    <ListItemButton
                      {...drawerButtonColors}
                      onClick={handleDrawerClickHome}
                    >
                      <ListItemIcon {...drawerButtonColors}>
                        <HomeIcon />
                      </ListItemIcon>
                      <ListItemText primary="Home" {...drawerButtonColors} />
                    </ListItemButton>
                    <ListItemButton
                      {...drawerButtonColors}
                      onClick={handleDrawerClickApiPlayground}
                    >
                      <ListItemIcon {...drawerButtonColors}>
                        <CodeIcon />
                      </ListItemIcon>
                      <ListItemText primary="API" />
                    </ListItemButton>
                    <ListItemButton
                      {...drawerButtonColors}
                      onClick={handleDrawerClickFootball}
                    >
                      <ListItemIcon {...drawerButtonColors}>
                        <SportsSoccerIcon />
                      </ListItemIcon>
                      <ListItemText primary="Football" />
                    </ListItemButton>
                    {user ? (
                      <ListItemButton onClick={debouncedHandleLogout}>
                        <ListItemIcon {...drawerButtonColors}>
                          <LogoutIcon />
                        </ListItemIcon>
                        <ListItemText
                          primary="Logout"
                          {...drawerButtonColors}
                        />
                      </ListItemButton>
                    ) : (
                      <>
                        <ListItemButton
                          {...drawerButtonColors}
                          onClick={handleDrawerClickLogin}
                        >
                          <ListItemIcon {...drawerButtonColors}>
                            <LoginIcon />
                          </ListItemIcon>
                          <ListItemText primary="Login" />
                        </ListItemButton>
                        <ListItemButton
                          {...drawerButtonColors}
                          onClick={handleDrawerClickSignup}
                        >
                          <ListItemIcon {...drawerButtonColors}>
                            <PersonAddIcon />
                          </ListItemIcon>
                          <ListItemText primary="Sign up" />
                        </ListItemButton>
                      </>
                    )}
                  </List>
                </Drawer>
              </>
            ) : (
              <Box display="flex" alignItems="center" gap={1}>
                {/* Home icon */}
                <Tooltip title="Home">
                  <IconButton color="primary" component={RouterLink} to="/">
                    <HomeIcon />
                    <Typography variant="subtitle1">Home</Typography>
                  </IconButton>
                </Tooltip>
                {/* API Playground icon */}
                <Tooltip title="API Playground">
                  <IconButton
                    color="primary"
                    component={RouterLink}
                    to="/ApiPlayground"
                  >
                    <CodeIcon />
                    <Typography variant="subtitle1">API</Typography>
                  </IconButton>
                </Tooltip>
                {/* Football icon */}
                <Tooltip title="Football">
                  <IconButton
                    color="primary"
                    component={RouterLink}
                    to="/Football"
                  >
                    <SportsSoccerIcon />
                    <Typography variant="subtitle1">Football</Typography>
                  </IconButton>
                </Tooltip>
                {/* Login and Logout icons */}
                {user ? (
                  <Tooltip title="Logout">
                    <IconButton color="primary" onClick={debouncedHandleLogout}>
                      <LogoutIcon />
                      <Typography variant="subtitle1">Logout</Typography>
                    </IconButton>
                  </Tooltip>
                ) : (
                  <>
                    <Tooltip title="Login">
                      <IconButton
                        color="primary"
                        component={RouterLink}
                        to="/login"
                      >
                        <LoginIcon />
                        <Typography variant="subtitle1">Login</Typography>
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Sign up">
                      <IconButton
                        color="primary"
                        component={RouterLink}
                        to="/signup"
                      >
                        <PersonAddIcon />
                        <Typography variant="subtitle1">Sign up</Typography>
                      </IconButton>
                    </Tooltip>
                  </>
                )}
              </Box>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default GlobalHeader;
