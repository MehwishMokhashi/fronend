// src/Home.js
import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Grid, Typography, Button, Box } from '@mui/material';
import { styled } from '@mui/system';
import 'animate.css';

const StyledContainer = styled(Container)({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '100vh',
  textAlign: 'center',
});

const Home = () => {
  return (
    <StyledContainer className="animate__animated animate__fadeIn">
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2" component="h1" gutterBottom className="animate__animated animate__bounceInDown">
            Welcome to Our App
          </Typography>
          <Typography variant="h5" component="p" className="animate__animated animate__fadeInUp">
            Easily manage your businesses with our intuitive platform.
          </Typography>
        </Grid>
        <Grid item xs={12} className="animate__animated animate__fadeInUp">
          <Link to="/create-business" style={{ textDecoration: 'none' }}>
            <Button variant="contained" color="primary" size="large">
              Create New Business
            </Button>
          </Link>
        </Grid>
      </Grid>
    </StyledContainer>
  );
};

export default Home;
