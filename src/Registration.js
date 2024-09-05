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
import 'animate.css'; // Import animate.css for additional animations

const StyledCard = styled(Card)({
  width: '400px',
  padding: '20px',
  boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
});

const Registration = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }

    setLoading(true);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/register', {
        name,
        email,
        password,
        c_password: confirmPassword,
      });

      if (response.status === 200) {
        setSuccessMessage('Successfully registered! Redirecting to login page...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        setError('Unexpected response status: ' + response.status);
      }
    } catch (err) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || 'An unexpected error occurred. Please try again.');
      } else {
        setError('An unexpected error occurred. Please try again.');
      }
    } finally {
      setLoading(false);
    }
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100 bg-light">
      <StyledCard className="animate__animated animate__fadeInUp">
        <CardContent>
          <Typography variant="h4" component="h3" align="center" gutterBottom className="animate__animated animate__bounceInDown">
            Register
          </Typography>
          {error && (
            <Alert severity="error" className="animate__animated animate__shakeX">
              {error}
            </Alert>
          )}
          {successMessage && (
            <Alert severity="success" className="animate__animated animate__fadeIn">
              {successMessage}
            </Alert>
          )}
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              margin="normal"
              label="Name"
              variant="outlined"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="animate__animated animate__fadeInLeft"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Email Address"
              variant="outlined"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="animate__animated animate__fadeInLeft"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Password"
              variant="outlined"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="animate__animated animate__fadeInLeft"
              required
            />
            <TextField
              fullWidth
              margin="normal"
              label="Confirm Password"
              variant="outlined"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="animate__animated animate__fadeInLeft"
              required
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 2, mb: 2 }}
              disabled={loading}
              className="animate__animated animate__pulse animate__infinite"
            >
              {loading ? <CircularProgress size={24} /> : 'Register'}
            </Button>
            <Button
              fullWidth
              variant="outlined"
              color="secondary"
              onClick={handleLoginRedirect}
              className="animate__animated animate__fadeInUp"
            >
              Go to Login
            </Button>
          </form>
        </CardContent>
      </StyledCard>
    </div>
  );
};

export default Registration;
