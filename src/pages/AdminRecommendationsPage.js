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

  // Fetch recommendations from the backend
  const fetchRecommendations = async () => {
    setLoading(true);
    try {
      const response = await axios.get('http://localhost:5000/api/recommendations');
      setRecommendations(response.data);
      
      // Calculate stats
      const total = response.data.length;
      const pending = response.data.filter(item => item.status === 'pending').length;
      const approved = response.data.filter(item => item.status === 'approved').length;
      const rejected = response.data.filter(item => item.status === 'rejected').length;
      
      setStats({ total, pending, approved, rejected });
      setError(null);
    } catch (err) {
      console.error('Error fetching recommendations:', err);
      setError('Failed to load recommendations. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRecommendations();
  }, []);

  // Handle status update
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      console.log(`Updating recommendation ${id} to status: ${newStatus}`);
      const response = await axios.put(`http://localhost:5000/api/recommendations/${id}`, { 
        status: newStatus 
      });
      console.log('Update response:', response.data);
      fetchRecommendations();
      setError(null);
    } catch (err) {
      console.error('Error updating recommendation status:', err);
      let errorMessage = 'Failed to update recommendation status. Please try again.';
      if (err.response && err.response.data && err.response.data.message) {
        errorMessage = err.response.data.message;
      }
      setError(errorMessage);
    }
  };

  // Handle recommendation deletion
  const handleDelete = async () => {
    try {
      console.log('Deleting recommendation:', selectedRecommendation.id);
      const response = await axios.delete(`http://localhost:5000/api/recommendations/${selectedRecommendation.id}`);
      console.log('Delete response:', response.data);
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
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const matchesCategory = categoryFilter === 'all' || item.category === categoryFilter;
    return matchesStatus && matchesCategory;
  });

  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(recommendations.map(item => item.category))];

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
      <Typography variant="h4" component="h1" gutterBottom>
        School Recommendations Dashboard
      </Typography>
      
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
            <Typography color="error">{error}</Typography>
            <Button variant="contained" onClick={fetchRecommendations} sx={{ mt: 2 }}>
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
                    <TableCell>Category</TableCell>
                    <TableCell>Relation</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredRecommendations
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((recommendation) => (
                      <TableRow key={recommendation.id}>
                        <TableCell>{formatDate(recommendation.timestamp)}</TableCell>
                        <TableCell>{recommendation.name}</TableCell>
                        <TableCell>{recommendation.category}</TableCell>
                        <TableCell>{recommendation.relation}</TableCell>
                        <TableCell>
                          <Chip 
                            label={recommendation.status.charAt(0).toUpperCase() + recommendation.status.slice(1)} 
                            color={getStatusColor(recommendation.status)}
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
                          {recommendation.status === 'pending' && (
                            <>
                              <IconButton 
                                color="success" 
                                onClick={() => handleStatusUpdate(recommendation.id, 'approved')}
                                size="small"
                              >
                                <CheckIcon />
                              </IconButton>
                              <IconButton 
                                color="error" 
                                onClick={() => handleStatusUpdate(recommendation.id, 'rejected')}
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
                    ))}
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
                label={selectedRecommendation.status.charAt(0).toUpperCase() + selectedRecommendation.status.slice(1)} 
                color={getStatusColor(selectedRecommendation.status)}
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
                  <Typography variant="body1">{formatDate(selectedRecommendation.timestamp)}</Typography>
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
                  <Typography variant="subtitle2">Relation to School</Typography>
                  <Typography variant="body1">{selectedRecommendation.relation}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Category</Typography>
                  <Typography variant="body1">{selectedRecommendation.category}</Typography>
                </Grid>
                <Grid item xs={12}>
                  <Divider sx={{ my: 2 }} />
                  <Typography variant="subtitle2">Recommendation</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
                    <Typography variant="body1">{selectedRecommendation.recommendation}</Typography>
                  </Paper>
                </Grid>
              </Grid>
              
              {selectedRecommendation.status === 'pending' && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="subtitle2">Update Status</Typography>
                  <Box sx={{ mt: 1 }}>
                    <Button 
                      variant="contained" 
                      color="success" 
                      onClick={() => {
                        handleStatusUpdate(selectedRecommendation.id, 'approved');
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
                        handleStatusUpdate(selectedRecommendation.id, 'rejected');
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