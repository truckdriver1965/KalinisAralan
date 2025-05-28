import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TablePagination,
  Chip,
  IconButton,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  TextField,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Visibility as VisibilityIcon,
  Delete as DeleteIcon,
  FilterList as FilterListIcon,
  Check as CheckIcon,
  Close as CloseIcon
} from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import axios from 'axios';

function AdminDonationsPage() {
  const [donations, setDonations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedDonation, setSelectedDonation] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });
  const { user } = useAuth();
  
  // Fetch donations from the backend
  const fetchDonations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/donations');
      setDonations(response.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError('Failed to load donations. Please try again later.');
      
      // For development - set sample data if API fails
      setDonations([
        {
          id: '1',
          timestamp: '2023-05-15T08:30:00.000Z',
          name: 'John Doe',
          email: 'john@example.com',
          amount: '5000',
          paymentMethod: 'Bank Transfer',
          status: 'completed',
          phone: '09123456789',
          message: 'Happy to support the school'
        },
        {
          id: '2',
          timestamp: '2023-05-16T10:15:00.000Z',
          name: 'Jane Smith',
          email: 'jane@example.com',
          amount: '2500',
          paymentMethod: 'GCash',
          status: 'pending',
          phone: '',
          message: ''
        },
        {
          id: '3',
          timestamp: '2023-05-17T14:45:00.000Z',
          name: 'Robert Johnson',
          email: 'robert@example.com',
          amount: '10000',
          paymentMethod: 'Bank Transfer',
          status: 'completed',
          phone: '09187654321',
          message: 'For the library renovation'
        }
      ]);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    fetchDonations();
  }, []);
  
  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await axios.put(`http://localhost:5000/api/donations/${id}`, { status: newStatus });
      fetchDonations();
      setSnackbar({
        open: true,
        message: `Donation status updated to ${newStatus}`,
        severity: 'success'
      });
    } catch (err) {
      console.error('Error updating donation status:', err);
      setSnackbar({
        open: true,
        message: 'Failed to update donation status',
        severity: 'error'
      });
      
      // For development - update local state if API fails
      setDonations(donations.map(donation => 
        donation.id === id ? { ...donation, status: newStatus } : donation
      ));
    }
  };
  
  // Handle donation deletion
  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/donations/${selectedDonation.id}`);
      setOpenDeleteDialog(false);
      fetchDonations();
      setSnackbar({
        open: true,
        message: 'Donation deleted successfully',
        severity: 'success'
      });
    } catch (err) {
      console.error('Error deleting donation:', err);
      setSnackbar({
        open: true,
        message: 'Failed to delete donation',
        severity: 'error'
      });
      
      // For development - update local state if API fails
      setDonations(donations.filter(d => d.id !== selectedDonation.id));
      setOpenDeleteDialog(false);
    }
  };
  
  // Filter donations based on selected status
  const filteredDonations = statusFilter === 'all' 
    ? donations 
    : donations.filter(donation => donation.status === statusFilter);
  
  // Calculate stats
  const totalDonations = donations.length;
  const totalAmount = donations.reduce((sum, donation) => {
    const amount = parseFloat(donation.amount) || 0;
    return sum + amount;
  }, 0);
  const pendingDonations = donations.filter(d => d.status === 'pending').length;
  
  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };
  
  // Dialog handlers
  const handleOpenViewDialog = (donation) => {
    setSelectedDonation(donation);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleOpenDeleteDialog = (donation) => {
    setSelectedDonation(donation);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };
  
  // Format currency
  const formatCurrency = (amount) => {
    return `₱${Number(amount).toLocaleString()}`;
  };
  
  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };
  
  // Handle snackbar close
  const handleSnackbarClose = () => {
    setSnackbar({ ...snackbar, open: false });
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4">
          Manage Donations
        </Typography>
        <Button 
          variant="outlined" 
          component={Link} 
          to="/admin"
        >
          Back to Dashboard
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" color="primary.contrastText">Total Donations</Typography>
              <Typography variant="h3" color="primary.contrastText">{totalDonations}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="h6" color="success.contrastText">Total Amount</Typography>
              <Typography variant="h3" color="success.contrastText">{formatCurrency(totalAmount)}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={4}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h6" color="warning.contrastText">Pending Donations</Typography>
              <Typography variant="h3" color="warning.contrastText">{pendingDonations}</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
      
      {/* Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <FilterListIcon sx={{ mr: 1 }} />
          <Typography variant="h6">Filters</Typography>
        </Box>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Status"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <MenuItem value="all">All Statuses</MenuItem>
              <MenuItem value="pending">Pending</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="outlined" 
              onClick={() => setStatusFilter('all')}
              sx={{ mt: 1 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Donations Table */}
      <Paper>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography color="error">{error}</Typography>
            <Button variant="contained" onClick={fetchDonations} sx={{ mt: 2 }}>
              Try Again
            </Button>
          </Box>
        ) : (
          <>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Date</TableCell>
                    <TableCell>Donor Name</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Payment Method</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredDonations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((donation) => (
                      <TableRow key={donation.id}>
                        <TableCell>{formatDate(donation.timestamp)}</TableCell>
                        <TableCell>
                          {donation.donor 
                            ? `${donation.donor.firstName} ${donation.donor.lastName}`
                            : donation.name}
                        </TableCell>
                        <TableCell>{formatCurrency(donation.amount)}</TableCell>
                        <TableCell>{donation.paymentMethod}</TableCell>
                        <TableCell>
                          <Chip 
                            label={donation.status ? (donation.status.charAt(0).toUpperCase() + donation.status.slice(1)) : 'Unknown'} 
                            color={donation.status === 'completed' ? 'success' : donation.status === 'pending' ? 'warning' : 'error'}
                            size="small"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton 
                            color="primary" 
                            onClick={() => handleOpenViewDialog(donation)}
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          {donation.status === 'pending' && (
                            <>
                              <IconButton 
                                color="success" 
                                onClick={() => handleStatusUpdate(donation.id, 'completed')}
                                size="small"
                                title="Mark as Completed"
                              >
                                <CheckIcon />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                onClick={() => handleStatusUpdate(donation.id, 'rejected')}
                                size="small"
                                title="Reject Donation"
                              >
                                <CloseIcon />
                              </IconButton>
                            </>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredDonations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>

      {/* View Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Donation Details</DialogTitle>
        <DialogContent>
          {selectedDonation && (
            <Box sx={{ pt: 2 }}>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Date:</strong> {formatDate(selectedDonation.timestamp)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Donor:</strong> {selectedDonation.donor 
                  ? `${selectedDonation.donor.firstName} ${selectedDonation.donor.lastName}`
                  : selectedDonation.name}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {selectedDonation.email}
              </Typography>
              {selectedDonation.phone && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Phone:</strong> {selectedDonation.phone}
                </Typography>
              )}
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Amount:</strong> {formatCurrency(selectedDonation.amount)}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Payment Method:</strong> {selectedDonation.paymentMethod}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Status:</strong> {selectedDonation.status}
              </Typography>
              {selectedDonation.message && (
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>Message:</strong> {selectedDonation.message}
                </Typography>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseViewDialog}>Close</Button>
        </DialogActions>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <Typography>
            Are you sure you want to delete this donation record? This action cannot be undone.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error" variant="contained">
            Delete
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbar.severity}>
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default AdminDonationsPage;