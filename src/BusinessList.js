import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  FormControlLabel,
  CircularProgress,
  IconButton,
  Typography,
  Box,
  useTheme,
  useMediaQuery,
  Fade
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import 'animate.css';
import CloseIcon from '@mui/icons-material/Close';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bold',
  backgroundColor: theme.palette.grey[200],
  padding: theme.spacing(2),
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.grey[50],
  },
}));

const ModalContent = styled(Box)(({ theme }) => ({
  padding: theme.spacing(3),
  backgroundColor: theme.palette.background.paper,
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  boxShadow: theme.shadows[5],
}));

const CloseButton = styled(IconButton)(({ theme }) => ({
  position: 'absolute',
  top: theme.spacing(1),
  right: theme.spacing(1),
}));

const AnimatedButton = styled(Button)(({ theme }) => ({
  transition: 'transform 0.2s, box-shadow 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: theme.shadows[4],
  },
}));

const BusinessList = () => {
  const [businesses, setBusinesses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showViewModal, setShowViewModal] = useState(false);
  const [currentBusiness, setCurrentBusiness] = useState(null);
  const [viewBusiness, setViewBusiness] = useState(null);
  const [editedBusiness, setEditedBusiness] = useState({});

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    const fetchBusinesses = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        alert('No token found, please log in first.');
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get('http://127.0.0.1:8000/api/bussiness', {
          headers: {
            Authorization: Bearer ${token},
          },
        });
        setBusinesses(res.data.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch businesses.');
        setLoading(false);
      }
    };

    fetchBusinesses();
  }, []);

  const handleAction = async (action, business) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    if (action === 'view') {
      setViewBusiness(business);
      setShowViewModal(true);
    } else if (action === 'edit') {
      setCurrentBusiness(business);
      setEditedBusiness(business);
      setShowEditModal(true);
    } else if (action === 'delete') {
      if (window.confirm('Are you sure you want to delete this business?')) {
        try {
          const response = await axios.delete(http://127.0.0.1:8000/api/bussiness/${business.id}, {
            headers: {
              Authorization: Bearer ${token},
            },
          });

          if (response.data.success) {
            alert('Business deleted successfully!');
            setBusinesses(businesses.filter(b => b.id !== business.id));
          } else {
            alert('Failed to delete business');
          }
        } catch (error) {
          alert(Error: ${error.response?.data?.message || 'Something went wrong!'});
        }
      }
    }
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditedBusiness(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSaveChanges = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('No token found, please log in first.');
      return;
    }

    try {
      const response = await axios.put(http://127.0.0.1:8000/api/bussiness/${currentBusiness.id}, editedBusiness, {
        headers: {
          Authorization: Bearer ${token},
        },
      });

      if (response.data.success) {
        alert('Business updated successfully!');
        setBusinesses(businesses.map(b => b.id === currentBusiness.id ? editedBusiness : b));
        setShowEditModal(false);
      } else {
        alert('Failed to update business');
      }
    } catch (error) {
      alert(Error: ${error.response?.data?.message || 'Something went wrong!'});
    }
  };

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;

  return (
    <Box sx={{ padding: 3 }}>
      <Typography variant="h4" gutterBottom className="animate_animated animate_fadeInDown">
        Business Details
      </Typography>
      <TableContainer component={Paper} className="animate_animated animate_fadeIn">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Business Name</StyledTableCell>
              <StyledTableCell>Address</StyledTableCell>
              <StyledTableCell>City</StyledTableCell>
              <StyledTableCell>Postal Code</StyledTableCell>
              <StyledTableCell>Phone Number</StyledTableCell>
              <StyledTableCell>Website</StyledTableCell>
              <StyledTableCell>Description</StyledTableCell>
              <StyledTableCell>Keywords</StyledTableCell>
              <StyledTableCell>Is Approved</StyledTableCell>
              <StyledTableCell>Actions</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TransitionGroup component={null}>
              {businesses.length > 0 ? (
                businesses.map(business => (
                  <CSSTransition key={business.id} timeout={500} classNames="animate_animated animate_fadeInUp">
                    <StyledTableRow>
                      <TableCell>{business.bussiness_name}</TableCell>
                      <TableCell>{business.address}</TableCell>
                      <TableCell>{business.city}</TableCell>
                      <TableCell>{business.postal_code}</TableCell>
                      <TableCell>{business.phone_number}</TableCell>
                      <TableCell>{business.website}</TableCell>
                      <TableCell>{business.description}</TableCell>
                      <TableCell>{business.keywords}</TableCell>
                      <TableCell>{business.is_approved ? 'Approved' : 'Not Approved'}</TableCell>
                      <TableCell>
                        <AnimatedButton
                          variant="contained"
                          color="info"
                          onClick={() => handleAction('view', business)}
                          startIcon={<VisibilityIcon />}
                          sx={{ mr: 1 }}
                        >
                          View
                        </AnimatedButton>
                        <AnimatedButton
                          variant="contained"
                          color="warning"
                          onClick={() => handleAction('edit', business)}
                          startIcon={<EditIcon />}
                          sx={{ mr: 1 }}
                        >
                          Edit
                        </AnimatedButton>
                        <AnimatedButton
                          variant="contained"
                          color="error"
                          onClick={() => handleAction('delete', business)}
                          startIcon={<DeleteIcon />}
                        >
                          Delete
                        </AnimatedButton>
                      </TableCell>
                    </StyledTableRow>
                  </CSSTransition>
                ))
              ) : (
                <StyledTableRow>
                  <TableCell colSpan={10}>No businesses found.</TableCell>
                </StyledTableRow>
              )}
            </TransitionGroup>
          </TableBody>
        </Table>
      </TableContainer>

      <Dialog open={showEditModal} onClose={() => setShowEditModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          Edit Business
          <CloseButton onClick={() => setShowEditModal(false)}>
            <CloseIcon />
          </CloseButton>
        </DialogTitle>
        <DialogContent>
          <ModalContent>
            <TextField
              fullWidth
              name="bussiness_name"
              label="Business Name"
              value={editedBusiness.bussiness_name || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="address"
              label="Address"
              value={editedBusiness.address || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="city"
              label="City"
              value={editedBusiness.city || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="postal_code"
              label="Postal Code"
              value={editedBusiness.postal_code || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="phone_number"
              label="Phone Number"
              value={editedBusiness.phone_number || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="website"
              label="Website"
              value={editedBusiness.website || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="description"
              label="Description"
              value={editedBusiness.description || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <TextField
              fullWidth
              name="keywords"
              label="Keywords"
              value={editedBusiness.keywords || ''}
              onChange={handleEditChange}
              margin="normal"
            />
            <FormControlLabel
              control={
                <Checkbox
                  checked={editedBusiness.is_approved || false}
                  onChange={(e) =>
                    setEditedBusiness((prev) => ({
                      ...prev,
                      is_approved: e.target.checked,
                    }))
                  }
                />
              }
              label="Approved"
            />
          </ModalContent>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleSaveChanges} color="primary">
            Save Changes
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={showViewModal} onClose={() => setShowViewModal(false)} maxWidth="md" fullWidth>
        <DialogTitle>
          View Business
          <CloseButton onClick={() => setShowViewModal(false)}>
            <CloseIcon />
          </CloseButton>
        </DialogTitle>
        <DialogContent>
          <ModalContent>
            <Typography gutterBottom><strong>Business Name:</strong> {viewBusiness?.bussiness_name}</Typography>
            <Typography gutterBottom><strong>Address:</strong> {viewBusiness?.address}</Typography>
            <Typography gutterBottom><strong>City:</strong> {viewBusiness?.city}</Typography>
            <Typography gutterBottom><strong>Postal Code:</strong> {viewBusiness?.postal_code}</Typography>
            <Typography gutterBottom><strong>Phone Number:</strong> {viewBusiness?.phone_number}</Typography>
            <Typography gutterBottom><strong>Website:</strong> {viewBusiness?.website}</Typography>
            <Typography gutterBottom><strong>Description:</strong> {viewBusiness?.description}</Typography>
            <Typography gutterBottom><strong>Keywords:</strong> {viewBusiness?.keywords}</Typography>
            <Typography gutterBottom><strong>Is Approved:</strong> {viewBusiness?.is_approved ? 'Yes' : 'No'}</Typography>
          </ModalContent>
        </DialogContent>
      </Dialog>
    </Box>
  );
};

export default BusinessList;