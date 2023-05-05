import React, { useState, FormEvent, useEffect, Dispatch} from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { User } from '../interface/user';
import {
  Container,
  TextField,
  Button,
  Typography,
  Box,
  Grid,
} from '@mui/material';
interface LoginPageProps {
  setUser: Dispatch<React.SetStateAction<User | null>>;
}
const LoginPage = ({setUser}:LoginPageProps) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  

  const navigate = useNavigate();
  const { loginUser, getUser } = useAuth();

  useEffect(() => {
    const storedToken = localStorage.getItem('token');
  
    if (storedToken) {
      (async () => {
        try {
          const userData = await getUser(storedToken);
          setUser(userData);
  
          // Redirect to a protected route or handle successful login
          navigate('/');
        } catch (err) {
          setError('Error getting user information');
        }
      })();
    }
  }, [getUser, navigate, setUser]);
  
  

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
  
    try {
      const authToken = await loginUser(email, password);
      setError('');
  
      // Store token in localStorage and update state
      localStorage.setItem('token', authToken);
  
      // Get user information and update state
      const userData = await getUser(authToken);
      setUser(userData);
      
    } catch (err) {
      setError('Error logging in user');
    }
  };
  

  const goToSignup = () => {
    navigate('/signup');
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ mt: 8 }}>
        <Typography variant="h4" gutterBottom>
          Login Page
        </Typography>
        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Grid>

            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Password"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </Grid>

            {error && (
              <Grid item xs={12}>
                <Typography color="error">{error}</Typography>
              </Grid>
            )}

            <Grid item xs={12}>
              <Button variant="contained" color="primary" type="submit">
                Login
              </Button>
            </Grid>
          </Grid>
        </form>
        <Box sx={{ mt: 2 }}>
          <Button variant="outlined" color="secondary" onClick={goToSignup}>
            Go to Signup
          </Button>
        </Box>

        
        
      </Box>
    </Container>
  );
};


export default LoginPage;
