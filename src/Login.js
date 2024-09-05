// src/Login.js
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/system';
import 'animate.css';

const StyledCard = styled(Card)({
  width: '400px',
  padding: '20px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/login', null, {
        params: { email, password },
      });

      if (response.data.success) {
        alert(response.data.data.token);
        localStorage.setItem('token', response.data.data.token);
        navigate('/home');
      } else {
        setError('Login failed. Please check your credentials.');
      }
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <StyledCard className="animate__animated animate__fadeIn">
        <CardContent>
          <Typography variant="h4" component="h3" align="center" gutterBottom>
            Login
          </Typography>
          {error && (
            <Alert severity="error" className="animate__animated animate__shakeX">
              {error}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              variant="outlined"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="animate__animated animate__fadeInLeft"
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="animate__animated animate__fadeInLeft"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2 }}
              disabled={loading}
              className="animate__animated animate__pulse animate__infinite"
            >
              {loading ? <CircularProgress size={24} /> : 'Login'}
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default Login;
