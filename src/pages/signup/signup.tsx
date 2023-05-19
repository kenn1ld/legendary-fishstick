import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import LockIcon from '@mui/icons-material/Lock';
import MailIcon from '@mui/icons-material/Mail';
import PersonIcon from '@mui/icons-material/Person';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
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
} from '@mui/material';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

import AnimatedButton from '../../components/AnimatedButton';
import BackgroundParticles from '../../components/BackgroundParticles';
import Logo from '../../components/Logo';
import useAuth from '../../hooks/useAuth';

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

const validationSchema = Yup.object().shape({
  name: Yup.string().required('Name is required'),
  username: Yup.string()
    .min(3, 'Username must be at least 3 characters')
    .required('Username is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  password: Yup.string()
    .min(6, 'Password must be at least 6 characters')
    .required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), ''], 'Passwords must match')
    .required('Confirm Password is required'),
});


const SignupPage = () => {
  const [error, setError] = useState('');

  const { registerUser } = useAuth();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values) => {
      try {
        if (values.password !== values.confirmPassword) {
          setError('Passwords do not match');
          return;
        }

        await registerUser(
          {
            name: values.name,
            email: values.email,
            username: values.username,
          },
          values.password
        );

        setError('');
        alert('User registered successfully');

        // Redirect to login page after successful registration
        navigate('/login');
      } catch (err: any) {
  if (err && err.response && err.response.data && err.response.data.message) {
    setError(err.response.data.message);
  } else {
    setError('Error registering user');
  }
}
    },
  });

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
      <motion.div initial="initial" animate="animate" variants={fadeIn} style={{ marginTop: '2rem' }}>
        <Logo />
        <Typography variant="h4" gutterBottom color="textPrimary">
          Signup
        </Typography>
        <div
          style={{
            position: 'absolute',
            width: '100%',
            height: '100%',
            zIndex: -1,
          }}
        >
          <BackgroundParticles />
        </div>
        <motion.form
          onSubmit={formik.handleSubmit}
          initial="initial"
          animate="animate"
          variants={scaleUp}
          style={{
            backgroundColor: useTheme().palette.background.paper,
            padding: '2rem',
            borderRadius: '10px',
          }}
        >
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="nameInput">Name</InputLabel>
                <OutlinedInput
                  id="nameInput"
                  type="text"
                  {...formik.getFieldProps('name')}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  }
                  label="Name"
                  required
                />
              </FormControl>
              {formik.touched.name && formik.errors.name && (
                <Typography color="error">{formik.errors.name}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="usernameInput">Username</InputLabel>
                <OutlinedInput
                  id="usernameInput"
                  type="text"
                  {...formik.getFieldProps('username')}
                  startAdornment={
                    <InputAdornment position="start">
                      <PersonIcon color="action" />
                    </InputAdornment>
                  }
                  label="Username"
                  required
                />
              </FormControl>
              {formik.touched.username && formik.errors.username && (
                <Typography color="error">{formik.errors.username}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="emailInputSignUp">Email</InputLabel>
                <OutlinedInput
                  id="emailInputSignUp"
                  type="email"
                  {...formik.getFieldProps('email')}
                  startAdornment={
                    <InputAdornment position="start">
                      <MailIcon color="action" />
                    </InputAdornment>
                  }
                  label="Email"
                  required
                />
              </FormControl>
              {formik.touched.email && formik.errors.email && (
                <Typography color="error">{formik.errors.email}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="passwordInputSignUp">Password</InputLabel>
                <OutlinedInput
                  id="passwordInputSignUp"
                  type={isPasswordVisible ? 'text' : 'password'}
                  {...formik.getFieldProps('password')}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={handleClickShowPassword}>
                        {isPasswordVisible ? <Visibility color="action" /> : <VisibilityOff color="action" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Password"
                  required
                />
              </FormControl>
              {formik.touched.password && formik.errors.password && (
                <Typography color="error">{formik.errors.password}</Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth variant="outlined">
                <InputLabel htmlFor="confirmPasswordInput">Confirm Password</InputLabel>
                <OutlinedInput
                  id="confirmPasswordInput"
                  type={isConfirmPasswordVisible ? 'text' : 'password'}
                  {...formik.getFieldProps('confirmPassword')}
                  startAdornment={
                    <InputAdornment position="start">
                      <LockIcon color="action" />
                    </InputAdornment>
                  }
                  endAdornment={
                    <InputAdornment position="end">
                      <IconButton edge="end" onClick={handleClickShowConfirmPassword}>
                        {isConfirmPasswordVisible ? <Visibility color="action" /> : <VisibilityOff color="action" />}
                      </IconButton>
                    </InputAdornment>
                  }
                  label="Confirm Password"
                  required
                />
              </FormControl>
              {formik.touched.confirmPassword && formik.errors.confirmPassword && (
                <Typography color="error">{formik.errors.confirmPassword}</Typography>
              )}
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <AnimatedButton type="submit" fullWidth>
                Signup
              </AnimatedButton>
            </Grid>

            <Grid item xs={12}>
              <AnimatedButton
                variant="outlined"
                color="primary"
                fullWidth
                onClick={() => navigate('/login')}
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
