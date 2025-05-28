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
  Divider,
  Avatar,
  Alert
} from '@mui/material';
import {
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Check as CheckIcon,
  Close as CloseIcon,
  FilterList as FilterListIcon,
  CloudUpload as CloudUploadIcon,
  Image as ImageIcon
} from '@mui/icons-material';
import { Edit as EditIcon } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { practicesApi } from '../services/api';


// Image upload component
const ImageUpload = ({ onImageSelect, currentImage, disabled = false }) => {
  const [preview, setPreview] = useState(currentImage || null);
  const [uploading, setUploading] = useState(false);


  const handleFileSelect = async (event) => {
    const file = event.target.files[0];
    if (!file) return;


    // Validate file type
    if (!file.type.startsWith('image/')) {
      alert('Please select an image file');
      return;
    }


    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert('Image size should be less than 5MB');
      return;
    }


    setUploading(true);
   
    try {
      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => setPreview(e.target.result);
      reader.readAsDataURL(file);


      // Pass the file back to parent
      onImageSelect(file, preview);
     
    } catch (error) {
      console.error('Error processing image:', error);
      alert('Failed to process image');
    } finally {
      setUploading(false);
    }
  };


  const handleRemoveImage = () => {
    setPreview(null);
    onImageSelect(null, null);
  };


  return (
    <Box>
      <input
        accept="image/*"
        style={{ display: 'none' }}
        id="image-upload"
        type="file"
        onChange={handleFileSelect}
        disabled={disabled || uploading}
      />
      <label htmlFor="image-upload">
        <Button
          variant="outlined"
          component="span"
          startIcon={uploading ? <CircularProgress size={20} /> : <CloudUploadIcon />}
          disabled={disabled || uploading}
          fullWidth
          sx={{ mb: 2 }}
        >
          {uploading ? 'Processing...' : 'Upload Image'}
        </Button>
      </label>
     
      {preview && (
        <Box sx={{ position: 'relative', display: 'inline-block' }}>
          <Avatar
            src={preview}
            sx={{ width: 100, height: 100, mb: 1 }}
            variant="rounded"
          >
            <ImageIcon />
          </Avatar>
          <IconButton
            size="small"
            onClick={handleRemoveImage}
            sx={{
              position: 'absolute',
              top: -8,
              right: -8,
              bgcolor: 'error.main',
              color: 'white',
              '&:hover': { bgcolor: 'error.dark' }
            }}
          >
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      )}
     
      <Typography variant="caption" color="textSecondary" display="block">
        Supported formats: JPG, PNG, GIF (Max 5MB)
      </Typography>
    </Box>
  );
};


function AdminProjectsPage() {
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [selectedPractice, setSelectedPractice] = useState(null);
  const [openViewDialog, setOpenViewDialog] = useState(false);
  const [openDeleteDialog, setOpenDeleteDialog] = useState(false);
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [openEditDialog, setOpenEditDialog] = useState(false);
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [submitLoading, setSubmitLoading] = useState(false);
  const [editFormData, setEditFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: null,
    imagePreview: null,
    category: ''
  });
  const [addFormData, setAddFormData] = useState({
    title: '',
    description: '',
    fullDescription: '',
    image: null,
    imagePreview: null,
    category: ''
  });
  const [stats, setStats] = useState({
    total: 0,
    maintenance: 0,
    education: 0,
    management: 0,
    community: 0
  });


  const handleEditFormChange = (event) => {
    const { name, value } = event.target;
    setEditFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleAddFormChange = (event) => {
    const { name, value } = event.target;
    setAddFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };


  const handleEditImageSelect = (file, preview) => {
    setEditFormData(prev => ({
      ...prev,
      image: file,
      imagePreview: preview
    }));
  };


  const handleAddImageSelect = (file, preview) => {
    setAddFormData(prev => ({
      ...prev,
      image: file,
      imagePreview: preview
    }));
  };


  const handleOpenAddDialog = () => {
    setAddFormData({
      title: '',
      description: '',
      fullDescription: '',
      image: null,
      imagePreview: null,
      category: ''
    });
    setOpenAddDialog(true);
  };


  const handleCloseAddDialog = () => {
    setOpenAddDialog(false);
    setError(null);
  };


  const handleAdd = async () => {
    if (submitLoading) return;
   
    setSubmitLoading(true);
    setError(null);
   
    try {
      if (addFormData.image) {
        // Create FormData for image upload
        const formData = new FormData();
        formData.append('title', addFormData.title);
        formData.append('description', addFormData.description);
        formData.append('fullDescription', addFormData.fullDescription);
        formData.append('category', addFormData.category);
        formData.append('image', addFormData.image);


        await practicesApi.createWithImage(formData);
      } else {
        // Create without image
        const data = {
          title: addFormData.title,
          description: addFormData.description,
          fullDescription: addFormData.fullDescription,
          category: addFormData.category
        };
       
        await practicesApi.create(data);
      }


      await fetchPractices();
      setOpenAddDialog(false);
     
      // Reset form
      setAddFormData({
        title: '',
        description: '',
        fullDescription: '',
        image: null,
        imagePreview: null,
        category: ''
      });
     
    } catch (err) {
      console.error('Error adding practice:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to add practice. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };


  const handleOpenEditDialog = (practice) => {
    setSelectedPractice(practice);
    setEditFormData({
      title: practice.title || '',
      description: practice.description || '',
      fullDescription: practice.fullDescription || '',
      image: null,
      imagePreview: practice.image || null,
      category: practice.category || ''
    });
    setOpenEditDialog(true);
  };


  const handleCloseEditDialog = () => {
    setOpenEditDialog(false);
    setError(null);
  };


  const handleEdit = async () => {
    if (submitLoading) return;
   
    setSubmitLoading(true);
    setError(null);
   
    try {
      if (editFormData.image) {
        // Update with new image
        const formData = new FormData();
        formData.append('title', editFormData.title);
        formData.append('description', editFormData.description);
        formData.append('fullDescription', editFormData.fullDescription);
        formData.append('category', editFormData.category);
        formData.append('image', editFormData.image);


        await practicesApi.updateWithImage(selectedPractice.id, formData);
      } else {
        // Update without new image
        const data = {
          title: editFormData.title,
          description: editFormData.description,
          fullDescription: editFormData.fullDescription,
          category: editFormData.category
        };
       
        await practicesApi.update(selectedPractice.id, data);
      }


      await fetchPractices();
      setOpenEditDialog(false);
     
    } catch (err) {
      console.error('Error editing practice:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to edit practice. Please try again.';
      setError(errorMessage);
    } finally {
      setSubmitLoading(false);
    }
  };


  const fetchPractices = async () => {
    setLoading(true);
    setError(null);
   
    try {
      const response = await practicesApi.getAll();
      const practicesData = response.data || [];
      setPractices(practicesData);
     
      // Calculate stats
      const total = practicesData.length;
      const maintenance = practicesData.filter(item => item.category === 'Maintenance').length;
      const education = practicesData.filter(item => item.category === 'Education').length;
      const management = practicesData.filter(item => item.category === 'Management').length;
      const community = practicesData.filter(item => item.category === 'Community').length;
     
      setStats({ total, maintenance, education, management, community });
     
    } catch (err) {
      console.error('Error fetching practices:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to fetch practices';
      setError(errorMessage);
      setPractices([]);
    } finally {
      setLoading(false);
    }
  };


  useEffect(() => {
    fetchPractices();
  }, []);


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };


  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };


  const handleDelete = async () => {
    try {
      await practicesApi.delete(selectedPractice.id);
      await fetchPractices();
      setOpenDeleteDialog(false);
      setError(null);
    } catch (err) {
      console.error('Error deleting practice:', err);
      const errorMessage = err.response?.data?.message || err.message || 'Failed to delete practice';
      setError(errorMessage);
    }
  };


  // Filter practices based on selected category
  const filteredPractices = practices.filter(practice => {
    return categoryFilter === 'all' || practice.category === categoryFilter;
  });


  // Get unique categories for filter dropdown
  const categories = ['all', ...new Set(practices.map(item => item.category).filter(Boolean))];


  if (loading) return (
    <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
      <CircularProgress />
    </Box>
  );


  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Manage Practices
        </Typography>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleOpenAddDialog}
          >
            Add Project
          </Button>
          <Button
            component={Link}
            to="/admin"
            variant="outlined"
            color="primary"
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
     
      {/* Error Alert */}
      {error && (
        <Alert severity="error" sx={{ mb: 3 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
     
      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: 'primary.light' }}>
            <CardContent>
              <Typography variant="h6" color="primary.contrastText">Total Projects</Typography>
              <Typography variant="h3" color="primary.contrastText">{stats.total}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: 'warning.light' }}>
            <CardContent>
              <Typography variant="h6" color="warning.contrastText">Maintenance</Typography>
              <Typography variant="h3" color="warning.contrastText">{stats.maintenance}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: 'success.light' }}>
            <CardContent>
              <Typography variant="h6" color="success.contrastText">Education</Typography>
              <Typography variant="h3" color="success.contrastText">{stats.education}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: 'error.light' }}>
            <CardContent>
              <Typography variant="h6" color="error.contrastText">Management</Typography>
              <Typography variant="h3" color="error.contrastText">{stats.management}</Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} sm={6} md={2.4}>
          <Card sx={{ bgcolor: 'info.light' }}>
            <CardContent>
              <Typography variant="h6" color="info.contrastText">Community</Typography>
              <Typography variant="h3" color="info.contrastText">{stats.community}</Typography>
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
              label="Category"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <MenuItem value="all">All Categories</MenuItem>
              <MenuItem value="Maintenance">Maintenance</MenuItem>
              <MenuItem value="Education">Education</MenuItem>
              <MenuItem value="Management">Management</MenuItem>
              <MenuItem value="Community">Community</MenuItem>
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <Button
              variant="outlined"
              onClick={() => setCategoryFilter('all')}
              sx={{ mt: 1 }}
            >
              Clear Filters
            </Button>
          </Grid>
        </Grid>
      </Paper>
     
      {/* Practices Table */}
      <Paper>
        {error && !loading ? (
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h6" color="error" gutterBottom>Error Loading Data</Typography>
            <Typography color="error" paragraph>{error}</Typography>
            <Button
              variant="contained"
              onClick={fetchPractices}
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
                    <TableCell>Image</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Description</TableCell>
                    <TableCell>Category</TableCell>
                    <TableCell align="right">Actions</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {filteredPractices
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((practice) => (
                      <TableRow key={practice.id}>
                        <TableCell>
                          <Avatar
                            src={practice.image}
                            sx={{ width: 40, height: 40 }}
                            variant="rounded"
                          >
                            <ImageIcon />
                          </Avatar>
                        </TableCell>
                        <TableCell>{practice.title}</TableCell>
                        <TableCell>{practice.description}</TableCell>
                        <TableCell>
                          <Chip
                            label={practice.category}
                            color="primary"
                            variant="outlined"
                          />
                        </TableCell>
                        <TableCell align="right">
                          <IconButton
                            color="primary"
                            onClick={() => {
                              setSelectedPractice(practice);
                              setOpenViewDialog(true);
                            }}
                            size="small"
                          >
                            <VisibilityIcon />
                          </IconButton>
                          <IconButton
                            color="primary"
                            onClick={() => handleOpenEditDialog(practice)}
                            size="small"
                          >
                            <EditIcon />
                          </IconButton>
                          <IconButton
                            color="error"
                            onClick={() => {
                              setSelectedPractice(practice);
                              setOpenDeleteDialog(true);
                            }}
                            size="small"
                          >
                            <DeleteIcon />
                          </IconButton>
                        </TableCell>
                      </TableRow>
                    ))}
                  {filteredPractices.length === 0 && (
                    <TableRow>
                      <TableCell colSpan={5} align="center">
                        <Typography variant="body1" sx={{ py: 2 }}>
                          No practices found
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
              count={filteredPractices.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </>
        )}
      </Paper>
     
      {/* View Practice Dialog */}
      <Dialog open={openViewDialog} onClose={() => setOpenViewDialog(false)} maxWidth="md" fullWidth>
        {selectedPractice && (
          <>
            <DialogTitle>
              Practice Details
              <Chip
                label={selectedPractice.category}
                color="primary"
                size="small"
                sx={{ ml: 2 }}
              />
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={2}>
                {selectedPractice.image && (
                  <Grid item xs={12} md={4}>
                    <Box sx={{ textAlign: 'center' }}>
                      <Avatar
                        src={selectedPractice.image}
                        sx={{ width: 150, height: 150, mx: 'auto', mb: 2 }}
                        variant="rounded"
                      >
                        <ImageIcon />
                      </Avatar>
                    </Box>
                  </Grid>
                )}
                <Grid item xs={12} md={selectedPractice.image ? 8 : 12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Title</Typography>
                      <Typography variant="body1">{selectedPractice.title}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Category</Typography>
                      <Typography variant="body1">{selectedPractice.category}</Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography variant="subtitle2">Description</Typography>
                      <Typography variant="body1">{selectedPractice.description}</Typography>
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">Full Description</Typography>
                  <Paper variant="outlined" sx={{ p: 2, mt: 1, bgcolor: 'background.default' }}>
                    <Typography variant="body1">{selectedPractice.fullDescription}</Typography>
                  </Paper>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setOpenViewDialog(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
     
      {/* Delete Confirmation Dialog */}
      <Dialog open={openDeleteDialog} onClose={() => setOpenDeleteDialog(false)}>
        <DialogTitle>Confirm Deletion</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to delete this practice? This action cannot be undone.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDeleteDialog(false)}>Cancel</Button>
          <Button onClick={handleDelete} color="error">Delete</Button>
        </DialogActions>
      </Dialog>
     
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEditDialog} maxWidth="md" fullWidth>
        <DialogTitle>Edit Practice</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={editFormData.title}
                onChange={handleEditFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                select
                value={editFormData.category}
                onChange={handleEditFormChange}
                required
              >
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Community">Community</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                name="description"
                multiline
                rows={2}
                value={editFormData.description}
                onChange={handleEditFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Description"
                name="fullDescription"
                multiline
                rows={4}
                value={editFormData.fullDescription}
                onChange={handleEditFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Project Image
              </Typography>
              <ImageUpload
                onImageSelect={handleEditImageSelect}
                currentImage={editFormData.imagePreview}
                disabled={submitLoading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEditDialog} disabled={submitLoading}>Cancel</Button>
          <Button
            onClick={handleEdit}
            color="primary"
            variant="contained"
            disabled={submitLoading || !editFormData.title || !editFormData.description || !editFormData.fullDescription || !editFormData.category}
            startIcon={submitLoading ? <CircularProgress size={20} /> : null}
          >
            {submitLoading ? 'Saving...' : 'Save Changes'}
          </Button>
        </DialogActions>
      </Dialog>


      {/* Add Dialog */}
      <Dialog open={openAddDialog} onClose={handleCloseAddDialog} maxWidth="md" fullWidth>
        <DialogTitle>Add New Practice</DialogTitle>
        <DialogContent>
          {error && (
            <Alert severity="error" sx={{ mb: 2 }}>
              {error}
            </Alert>
          )}
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Title"
                name="title"
                value={addFormData.title}
                onChange={handleAddFormChange}
                required
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Category"
                name="category"
                select
                value={addFormData.category}
                onChange={handleAddFormChange}
                required
              >
                <MenuItem value="Maintenance">Maintenance</MenuItem>
                <MenuItem value="Education">Education</MenuItem>
                <MenuItem value="Management">Management</MenuItem>
                <MenuItem value="Community">Community</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Short Description"
                name="description"
                multiline
                rows={2}
                value={addFormData.description}
                onChange={handleAddFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Full Description"
                name="fullDescription"
                multiline
                rows={4}
                value={addFormData.fullDescription}
                onChange={handleAddFormChange}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2" gutterBottom>
                Project Image (Optional)
              </Typography>
              <ImageUpload
                onImageSelect={handleAddImageSelect}
                currentImage={addFormData.imagePreview}
                disabled={submitLoading}
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseAddDialog} disabled={submitLoading}>Cancel</Button>
          <Button
            onClick={handleAdd}
            color="primary"
            variant="contained"
            disabled={submitLoading || !addFormData.title || !addFormData.description || !addFormData.fullDescription || !addFormData.category}
            startIcon={submitLoading ? <CircularProgress size={20} /> : null}
          >
            {submitLoading ? 'Adding...' : 'Add Project'}
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}


export default AdminProjectsPage;
