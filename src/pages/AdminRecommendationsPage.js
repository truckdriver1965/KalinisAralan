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
  DialogContentText,
  DialogTitle,
  TextField,
  MenuItem,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Divider
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon
} from '@mui/icons-material';
import axios from 'axios';
import { Link } from 'react-router-dom';

function AdminRecommendationsPage() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [stats, setStats] = useState({
    total: 0,
    pending: 0,
    approved: 0,
    rejected: 0
  });

  // Fetch recommendations from the backend with fallback
  const fetchRecommendations = async () => {
    setLoading(true);
    let tried = false;
    
    const baseURL = localStorage.getItem('apiBaseURL') || 'http://localhost:5000';
    
    const tryFetch = async (endpoint) => {
      try {
        console.log(`Trying to fetch from: ${endpoint}`);
        
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};
        
        const response = await axios.get(endpoint, { headers });
        console.log('API Response:', response.data);
        
        if (!response.data) {
          throw new Error('Empty response received');
        }
        
        const responseData = Array.isArray(response.data) ? response.data : 
                            (response.data.data && Array.isArray(response.data.data)) ? response.data.data : [];
        
        setRecommendations(responseData);
        
        const total = responseData.length;
        const pending = responseData.filter(item => item.status === 'pending' || !item.status).length;
        const approved = responseData.filter(item => item.status === 'approved').length;
        const rejected = responseData.filter(item => item.status === 'rejected').length;
        
        setStats({ total, pending, approved, rejected });
        setError(null);
        return true;
      } catch (err) {
        console.error(`Error fetching from ${endpoint}:`, err);
        return false;
      }
    };
    
    const endpoints = [
      `${baseURL}/api/contact`,
      `${baseURL}/api/recommendations`,
      `${baseURL}/api/contacts`,
      `${baseURL}/contact`
    ];
    
    for (const endpoint of endpoints) {
      const success = await tryFetch(endpoint);
      if (success) {
        setLoading(false);
        return;
      }
    }
    
    const relativeEndpoints = [
      '/api/contact',
      '/api/recommendations',
      '/api/contacts'
    ];
    
    for (const endpoint of relativeEndpoints) {
      const success = await tryFetch(endpoint);
      if (success) {
        setLoading(false);
        return;
      }
    }
    
    setError('Failed to load recommendations. Please check your network connection and ensure the backend server is running.');
    setLoading(false);
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Handle status update with improved error handling
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      console.log(`Updating recommendation ${id} to status: ${newStatus}`);
      
      const baseURL = localStorage.getItem('apiBaseURL') || 'http://localhost:5000';
      
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const endpoints = [
        `${baseURL}/api/contact/${id}`,
        `${baseURL}/api/recommendations/${id}`,
        `${baseURL}/api/contacts/${id}`
      ];
      
      let success = false;
      let responseData = null;
      
      for (const endpoint of endpoints) {
        try {
          const response = await axios.put(endpoint, { status: newStatus }, { headers });
          console.log('Update response:', response.data);
          success = true;
          responseData = response.data;
          break;
        } catch (err) {
          console.error(`Error updating at ${endpoint}:`, err);
        }
      }
      
      if (!success) {
        throw new Error('All update endpoints failed');
      }
      
      fetchRecommendations();
      setError(null);
      return responseData;
    } catch (err) {
      console.error('Error updating recommendation status:', err);
      let errorMessage = 'Failed to update recommendation status. Please try again.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  // Handle recommendation deletion with improved error handling
  const handleDelete = async () => {
    try {
      const id = selectedRecommendation._id || selectedRecommendation.id;
      console.log('Deleting recommendation:', id);
      
      const baseURL = localStorage.getItem('apiBaseURL') || 'http://localhost:5000';
      
      const token = localStorage.getItem('token');
      const headers = token ? { Authorization: `Bearer ${token}` } : {};
      
      const endpoints = [
        `${baseURL}/api/contact/${id}`,
        `${baseURL}/api/recommendations/${id}`,
        `${baseURL}/api/contacts/${id}`
      ];
      
      let success = false;
      
      for (const endpoint of endpoints) {
        try {
          const response = await axios.delete(endpoint, { headers });
          console.log('Delete response:', response.data);
          success = true;
          break;
        } catch (err) {
          console.error(`Error deleting at ${endpoint}:`, err);
        }
      }
      
      if (!success) {
        throw new Error('All delete endpoints failed');
      }
      
      setOpenDeleteDialog(false);
      fetchRecommendations();
      setError(null);
    } catch (err) {
      console.error('Error deleting recommendation:', err);
      let errorMessage = 'Failed to delete recommendation. Please try again.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
      setOpenDeleteDialog(false);
    }
  };

  // Filter recommendations based on selected filters
  const filteredRecommendations = recommendations.filter(item => {
    const itemStatus = item.status || 'pending'; // Default to pending if status is not set
    const matchesStatus = statusFilter === 'all' || itemStatus === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.subject === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(recommendations.map(item => item.subject).filter(Boolean))];

  // Handle pagination
  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // Dialog handlers
  const handleOpenViewDialog = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setOpenViewDialog(true);
  };

  const handleCloseViewDialog = () => {
    setOpenViewDialog(false);
  };

  const handleOpenDeleteDialog = (recommendation) => {
    setSelectedRecommendation(recommendation);
    setOpenDeleteDialog(true);
  };

  const handleCloseDeleteDialog = () => {
    setOpenDeleteDialog(false);
  };

  // Get status chip color
  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'warning';
      case 'approved': return 'success';
      case 'rejected': return 'error';
      default: return 'default';
    }
  };

  // Format date
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString();
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          School Recommendations Dashboard
        </Typography>
        <Button
          component={Link}
          to="/admin"
          variant="outlined"
          color="primary"
        >
          Back to Dashboard
        </Button>
      </Box>
      
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" color="primary.contrastText">Total Recommendations</Typography>
              <Typography variant="h3" color="primary.contrastText">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h6" color="warning.contrastText">Pending</Typography>
              <Typography variant="h3" color="warning.contrastText">{stats.pending}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="h6" color="success.contrastText">Approved</Typography>
              <Typography variant="h3" color="success.contrastText">{stats.approved}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Card sx={{ bgcolor: 'error.light' }}>
            <CardContent>
              <Typography variant="h6" color="error.contrastText">Rejected</Typography>
              <Typography variant="h3" color="error.contrastText">{stats.rejected}</Typography>
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
              <MenuItem value="approved">Approved</MenuItem>
              <MenuItem value="rejected">Rejected</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              {categories.filter(cat => cat !== 'all').map((category) => (
                <MenuItem key={category} value={category}>
                  {category}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button 
              variant="outlined" 
              onClick={() => {
                setStatusFilter('all');
                setCategoryFilter('all');
              }}
              sx={{ mt: 1 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
      
      {/* Recommendations Table */}
      <Paper>
        {loading ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>Error Loading Data</Typography>
            <Typography color="error" paragraph>{error}</Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="body2" paragraph>
                Possible solutions:
              </Typography>
              <Typography variant="body2" component="ul" align="left" sx={{ display: 'inline-block' }}>
                <li>Make sure the backend server is running at http://localhost:5000</li>
                <li>Check if the API endpoint is correct (/api/contact)</li>
                <li>Verify network connectivity</li>
                <li>Check browser console for more detailed error messages</li>
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              onClick={fetchRecommendations} 
              sx={{ mt: 2 }}
              startIcon={<FilterListIcon />}
            >
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
                    <TableCell>Name</TableCell>
                    <TableCell>Subject</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecommendations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((recommendation) => {
                      const id = recommendation._id || recommendation.id;
                      const status = recommendation.status || 'pending';
                      const subject = recommendation.subject || recommendation.category || 'General';
                      const createdAt = recommendation.createdAt || recommendation.timestamp || new Date().toISOString();
                      
                      return (
                        <TableRow key={id}>
                          <TableCell>{formatDate(createdAt)}</TableCell>
                          <TableCell>{recommendation.name}</TableCell>
                          <TableCell>{subject}</TableCell>
                          <TableCell>{recommendation.email}</TableCell>
                          <TableCell>
                            <Chip 
                              label={status.charAt(0).toUpperCase() + status.slice(1)} 
                              color={getStatusColor(status)}
                              size="small"
                            />
                          </TableCell>
                          <TableCell align="right">
                            <IconButton 
                              color="primary" 
                              onClick={() => handleOpenViewDialog(recommendation)}
                              size="small"
                            >
                              <VisibilityIcon />
                            </IconButton>
                            {(status === 'pending') && (
                              <>
                                <IconButton 
                                  color="success" 
                                  onClick={() => handleStatusUpdate(id, 'approved')}
                                  size="small"
                                >
                                  <CheckIcon />
                                </IconButton>
                                <IconButton 
                                  color="error" 
                                  onClick={() => handleStatusUpdate(id, 'rejected')}
                                  size="small"
                                >
                                  <CloseIcon />
                                </IconButton>
                              </>
                            )}
                            <IconButton 
                              color="error" 
                              onClick={() => handleOpenDeleteDialog(recommendation)}
                              size="small"
                            >
                              <DeleteIcon />
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  {filteredRecommendations.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={6} align="center">
                        <Typography variant="body1" sx={{ py: 2 }}>
                          No recommendations found
                        </Typography>
                      </TableCell>
                    </TableRow>
                  )}
                </TableBody>
              </Table>
            </TableContainer>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={filteredRecommendations.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
      
      {/* View Recommendation Dialog */}
      <Dialog open={openViewDialog} onClose={handleCloseViewDialog} maxWidth="md" fullWidth>
        {selectedRecommendation && (
          <>
            <DialogTitle>
              Recommendation Details
              <Chip 
                label={(selectedRecommendation.status || 'Pending').charAt(0).toUpperCase() + (selectedRecommendation.status || 'pending').slice(1)} 
                color={getStatusColor(selectedRecommendation.status || 'pending')}
                size="small"
                sx={{ ml: 2 }}
              />
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Submitted By</Typography>
                  <Typography variant="body1">{selectedRecommendation.name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Date Submitted</Typography>
                  <Typography variant="body1">{formatDate(selectedRecommendation.createdAt || selectedRecommendation.timestamp || new Date().toISOString())}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography variant="body1">{selectedRecommendation.email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Phone</Typography>
                  <Typography variant="body1">{selectedRecommendation.phone || 'Not provided'}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Subject/Category</Typography>
                  <Typography variant="body1">{selectedRecommendation.subject || selectedRecommendation.category || 'General'}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Message/Recommendation</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
                    <Typography variant="body1">{selectedRecommendation.message || selectedRecommendation.recommendation || 'No message provided'}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {(!selectedRecommendation.status || selectedRecommendation.status === 'pending') && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2">Update Status</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => {
                        handleStatusUpdate(selectedRecommendation._id || selectedRecommendation.id, 'approved');
                        handleCloseViewDialog();
                      }}
                      sx={{ mr: 2 }}
                    >
                      Approve
                    </Button>
                    <Button 
                      variant="contained" 
                      color="error" 
                      onClick={() => {
                        handleStatusUpdate(selectedRecommendation._id || selectedRecommendation.id, 'rejected');
                        handleCloseViewDialog();
                      }}
                    >
                      Reject
                    </Button>
                  </Box>
                </Box>
              )}
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseViewDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={handleCloseDeleteDialog}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this recommendation from {selectedRecommendation?.name}? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDeleteDialog}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminRecommendationsPage;
