import React, { useState, useCallback, FormEvent, ReactElement } from 'react';
import { Container, OutlinedInput, Typography, Box, Grid, useTheme, InputLabel, InputAdornment, IconButton, FormControl } from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import BackgroundParticles from '../../components/BackgroundParticles';
import AnimatedButton from '../../components/AnimatedButton';
import Logo from '../../components/Logo';
import useAuth from '../../hooks/useAuth';
import { User } from '../../interface/user';

const fadeIn = { initial: { opacity: 0 }, animate: { opacity: 1, transition: { duration: 1 } } };
const scaleUp = { initial: { scale: 0 }, animate: { scale: 1, transition: { duration: 0.5 } } };

interface CustomFormControlProps {
  id: string;
  label: string;
  type: string;
  value: string;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  adornmentIcon: ReactElement;
  isPasswordVisible?: boolean;
  togglePasswordVisibility?: () => void;
}

const CustomFormControl: React.FC<CustomFormControlProps> = ({
  id,
  label,
  type,
  value,
  handleChange,
  adornmentIcon,
  isPasswordVisible,
  togglePasswordVisibility,
}) => {
  const theme = useTheme();
  return (
    <FormControl fullWidth variant="outlined">
      <InputLabel htmlFor={id} style={{ color: theme.palette.text.primary }}>
        {label}
      </InputLabel>
      <OutlinedInput
        id={id}
        type={isPasswordVisible ? 'text' : type}
        value={value}
        onChange={handleChange}
        startAdornment={<InputAdornment position="start">{adornmentIcon}</InputAdornment>}
        endAdornment={
          togglePasswordVisibility && (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={togglePasswordVisibility}>
                {isPasswordVisible ? <Visibility color="action" /> : <VisibilityOff color="action" />}
              </IconButton>
            </InputAdornment>
          )
        }
        label={label}
        inputProps={{ style: { color: theme.palette.text.primary } }}
        required
      />
    </FormControl>
  );
};

interface LoginPageProps {
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const LoginPage: React.FC<LoginPageProps> = ({ setUser }) => {
  const [formState, setFormState] = useState<{ [key: string]: any }>({ email: '', password: '', error: '', isPasswordVisible: false });
  const { email, password, error, isPasswordVisible } = formState;
  const { loginUser, getUser } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();

  const handleFormStateChange = useCallback((key: string, value: any) => {
    setFormState((prevState) => ({ ...prevState, [key]: value }));
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      try {
        const token = await loginUser(email, password);
        localStorage.setItem('token', token);
        const userData = await getUser(token);
        setUser(userData);
        navigate('/');
      } catch (err) {
        handleFormStateChange('error', 'Error logging in user');
      }
    },
    [email, password, loginUser, getUser, setUser, navigate, handleFormStateChange]
  );

  const goToSignup = useCallback(() => navigate('/signup'), [navigate]);

  const togglePasswordVisibility = () => handleFormStateChange('isPasswordVisible', !isPasswordVisible);

  return (
    <Container maxWidth="sm">
      <motion.div initial="initial" animate="animate" variants={fadeIn} style={{ marginTop: '2rem', position: 'relative' }}>
        <BackgroundParticles />
        <Logo />
        <Typography variant="h4" gutterBottom color="textPrimary">
          Login
        </Typography>
        <motion.form onSubmit={handleSubmit} initial="initial" animate="animate" variants={scaleUp} style={{ backgroundColor: theme.palette.background.paper, padding: '2rem', borderRadius: '10px' }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <CustomFormControl
                id="emailInput"
                label="Email"
                type="email"
                value={email}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormStateChange('email', e.target.value)}
                adornmentIcon={<MailIcon color="action" />}
              />
            </Grid>
            <Grid item xs={12}>
              <CustomFormControl
                id="passwordInput"
                label="Password"
                type="password"
                value={password}
                handleChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFormStateChange('password', e.target.value)}
                adornmentIcon={<LockIcon color="action" />}
                isPasswordVisible={isPasswordVisible}
                togglePasswordVisibility={togglePasswordVisibility}
              />
            </Grid>
            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}
            <Grid item xs={12}>
              <AnimatedButton type="submit" fullWidth>
                Login
              </AnimatedButton>
            </Grid>
          </Grid>
        </motion.form>
        <Box sx={{ mt: 2, textAlign: 'center' }}>
          <Typography variant="body2" color="textSecondary">
            Don&apos;t have an account?
            <AnimatedButton onClick={goToSignup} style={{ textTransform: 'none', fontWeight: 'bold' }}>
              Sign up
            </AnimatedButton>
          </Typography>
        </Box>
      </motion.div>
    </Container>
  );
};

export default LoginPage;
