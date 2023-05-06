import React, { useState, FormEvent, Dispatch } from "react";
import { useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { User } from "../interface/user";
import {
  Container,
  OutlinedInput,
  Typography,
  Box,
  Grid,
  useTheme,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../components/Logo"
import AnimatedButton from "../components/AnimatedButton";
interface LoginPageProps {
  setUser: Dispatch<React.SetStateAction<User | null>>;
}

const fadeIn = {
  initial: { opacity: 0 },
  animate: {
    opacity: 1,
    transition: {
      duration: 1,
    },
  },
};

const scaleUp = {
  initial: { scale: 0 },
  animate: {
    scale: 1,
    transition: {
      duration: 0.5,
    },
  },
};



const LoginPage = ({ setUser }: LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const theme = useTheme();

  const navigate = useNavigate();
  const { loginUser, getUser } = useAuth();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    try {
      const token = await loginUser(email, password);

      // Clear any previous errors
      setError('');

      // Store token in localStorage and update state
      localStorage.setItem('token', token);

      // Get user information and update state
      const userData = await getUser(token);
      setUser(userData);

      // Redirect to the home page after successful login
      navigate('/');
    } catch (err) {
      setError('Error logging in user');
    }
  };

  const goToSignup = () => {
    navigate('/signup');
  };

   const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        style={{ marginTop: "2rem" }}
      >
        {/* Display a logo/icon */}
      
      <Logo/>

        <Typography variant="h4" gutterBottom color="textPrimary">
          Login
        </Typography>

        <motion.form
          onSubmit={handleSubmit}
          initial="initial"
          animate="animate"
          variants={scaleUp}
          style={{
            backgroundColor: theme.palette.background.paper,
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="emailInput"
                  style={{ color: theme.palette.text.primary }}
                >
                  Email
                </InputLabel>
                <OutlinedInput
                  id="emailInput"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailIcon color="action" />
                    </InputAdornment>
                  }
                  label="Email"
                  inputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                  required
                />
              </FormControl>
            </Grid>

            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel
                  htmlFor="passwordInput"
                  style={{ color: theme.palette.text.primary }}
                >
                  Password
                </InputLabel>
                <OutlinedInput
                  id="passwordInput"
                  type={isPasswordVisible ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowPassword}
                      >
                        {isPasswordVisible ? (
                          <Visibility color="action" />
                        ) : (
                          <VisibilityOff color="action" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  inputProps={{
                    style: { color: theme.palette.text.primary },
                  }}
                  required
                />
              </FormControl>
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
            <AnimatedButton variant="contained" type="submit" fullWidth >
              Login
            </AnimatedButton>
          </Grid>
        </Grid>
      </motion.form>
        <Box sx={{ mt: 2, textAlign: "center" }}>
          <Typography variant="body2" color="textSecondary">
            Don't have an account?{" "}
            
            <AnimatedButton
              onClick={goToSignup}
              style={{ textTransform: "none", fontWeight: "bold" }}
            >
              Sign up
            </AnimatedButton>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LoginPage;