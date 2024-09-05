import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Container,
  Typography,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
} from '@mui/material';
import { styled } from '@mui/system';
import 'animate.css';

const FormContainer = styled(Container)({
  marginTop: '40px',
  padding: '30px',
  backgroundColor: '#f9f9f9',
  borderRadius: '8px',
  boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
});

const CreateBusinessForm = () => {
  const [businessName, setBusinessName] = useState('');
  const [address, setAddress] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [website, setWebsite] = useState('');
  const [description, setDescription] = useState('');
  const [keywords, setKeywords] = useState('');
  const [isApproved, setIsApproved] = useState(0);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    try {
      const response = await axios.post(
        'http://127.0.0.1:8000/api/bussiness',
        {
          bussiness_name: businessName,
          address,
          city,
          postal_code: postalCode,
          phone_number: phoneNumber,
          website,
          description,
          keywords,
          is_approved: isApproved,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`, // Corrected line
          },
        }
      );

      if (response.data.success) {
        alert('Business created successfully!');
        localStorage.setItem(
          'business',
          JSON.stringify({
            businessName,
            address,
            city,
            postalCode,
            phoneNumber,
            website,
            description,
            keywords,
            isApproved,
          })
        );
      } else {
        alert('Failed to create business');
      }
    } catch (error) {
      console.error('Error creating business:', error.response?.data || error.message);
      alert(`Error: ${error.response?.data?.message || 'Something went wrong!'}`); // Corrected line
    }
  };

  const handleViewList = () => {
    navigate('/business-list');
  };

  return (
    <FormContainer className="animate_animated animate_fadeIn">
      <Typography variant="h4" component="h2" align="center" gutterBottom>
        Create Business
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          fullWidth
          margin="normal"
          label="Business Name"
          variant="outlined"
          value={businessName}
          onChange={(e) => setBusinessName(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Address"
          variant="outlined"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="City"
          variant="outlined"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Postal Code"
          variant="outlined"
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Phone Number"
          variant="outlined"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          required
        />
        <TextField
          fullWidth
          margin="normal"
          label="Website"
          variant="outlined"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Description"
          variant="outlined"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
          multiline
          rows={4}
        />
        <TextField
          fullWidth
          margin="normal"
          label="Keywords"
          variant="outlined"
          value={keywords}
          onChange={(e) => setKeywords(e.target.value)}
          required
        />
        <FormControl fullWidth margin="normal">
          <InputLabel id="isApproved-label">Is Approved</InputLabel>
          <Select
            labelId="isApproved-label"
            id="isApproved"
            value={isApproved}
            onChange={(e) => setIsApproved(Number(e.target.value))}
            label="Is Approved"
          >
            <MenuItem value={0}>Not Approved</MenuItem>
            <MenuItem value={1}>Approved</MenuItem>
          </Select>
        </FormControl>
        <Button type="submit" variant="contained" color="primary" fullWidth sx={{ mt: 2 }}>
          Create Business
        </Button>
      </form>
    </FormContainer>
  );
};

export default CreateBusinessForm;
