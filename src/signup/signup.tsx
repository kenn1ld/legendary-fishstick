import React, { useState, FormEvent } from "react";
import useAuth from "../hooks/useAuth";
import { useNavigate } from "react-router-dom";
import {
  Container,
  OutlinedInput,
  Typography,
  Grid,
  useTheme,
  InputLabel,
  InputAdornment,
  IconButton,
  FormControl,
} from "@mui/material";
import { motion } from "framer-motion";
import PersonIcon from "@mui/icons-material/Person";
import MailIcon from "@mui/icons-material/Mail";
import LockIcon from "@mui/icons-material/Lock";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Logo from "../components/Logo";
import AnimatedButton from "../components/AnimatedButton";
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


const SignupPage = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      await registerUser({ name, email, username }, password);
      setError("");
      alert("User registered successfully");

      // Redirect to login page after successful registration
      navigate("/login");
    } catch (err) {
      setError("Error registering user");
    }
  };

  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const handleClickShowPassword = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

    const [isConfirmPasswordVisible, setIsConfirmPasswordVisible] = useState(false);
    const handleClickShowConfirmPassword = () => {
    setIsConfirmPasswordVisible(!isConfirmPasswordVisible);
  };

  return (
    <Container maxWidth="sm">
      <motion.div
        initial="initial"
        animate="animate"
        variants={fadeIn}
        style={{ marginTop: "2rem" }}
      >
        <Logo />

        <Typography variant="h4" gutterBottom color="textPrimary">
          Signup
        </Typography>

        <motion.form
          onSubmit={handleSubmit}
          initial="initial"
          animate="animate"
          variants={scaleUp}
          style={{
            backgroundColor: useTheme().palette.background.paper,
            padding: "2rem",
            borderRadius: "10px",
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="nameInput">Name</InputLabel>
                <OutlinedInput
                  id="nameInput"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  }
                  label="Name"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="usernameInput">Username</InputLabel>
                <OutlinedInput
                  id="usernameInput"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  }
                  label="Username"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="emailInputSignUp">Email</InputLabel>
                <OutlinedInput
                  id="emailInputSignUp"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailIcon color="action" />
                    </InputAdornment>
                  }
                  label="Email"
                  required
                />
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="passwordInputSignUp">Password</InputLabel>
                <OutlinedInput
                  id="passwordInputSignUp"
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
                  required
                />
              </FormControl>              
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="confirmPasswordInput">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPasswordInput"
                  type={isConfirmPasswordVisible ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton
                        edge="end"
                        onClick={handleClickShowConfirmPassword}
                      >
                        {isConfirmPasswordVisible ? (
                          <Visibility color="action" />
                        ) : (
                          <VisibilityOff color="action" />
                        )}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
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
                Signup
              </AnimatedButton>
            </Grid>

            <Grid item xs={12}>
              <AnimatedButton
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate("/login")}
              >
                Go to Login
              </AnimatedButton>
            </Grid>
          </Grid>
        </motion.form>
      </motion.div>
    </Container>
  );
};

export default SignupPage;