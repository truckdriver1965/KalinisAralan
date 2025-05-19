import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  MenuItem,
  Snackbar,
  Alert,
  Paper,
  Divider
} from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import SendIcon from '@mui/icons-material/Send';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import SchoolIcon from '@mui/icons-material/School';
import axios from 'axios';

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    category: '',
    recommendation: '',
    relation: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const recommendationCategories = [
    'Facilities Improvement',
    'Sanitation Systems',
    'Educational Resources',
    'School Programs',
    'Safety Measures',
    'Environmental Initiatives',
    'Other'
  ];
  
  const relationTypes = [
    'Student',
    'Parent',
    'Teacher',
    'School Staff',
    'Alumni',
    'Community Member',
    'Other'
  ];
  
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when user types
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ''
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }
    
    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      errors.email = 'Email is invalid';
    }
    
    if (!formData.category) {
      errors.category = 'Please select a recommendation category';
    }
    
    if (!formData.recommendation.trim()) {
      errors.recommendation = 'Recommendation details are required';
    }
    
    if (!formData.relation) {
      errors.relation = 'Please select your relation to the school';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      try {
        console.log('Submitting recommendation:', formData);
        
        // Format the data to match what the admin dashboard expects
        const formattedData = {
          name: formData.name,
          email: formData.email,
          phone: formData.phone || '',
          subject: formData.category, // Map category to subject for consistency
          message: formData.recommendation, // Map recommendation to message
          status: 'pending',
          relation: formData.relation
        };
        
        console.log('Formatted data:', formattedData);
        
        // Try to submit to the contact endpoint first
        try {
          const response = await axios.post('http://localhost:5000/api/contact', formattedData, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000 // 10 second timeout
          });
          
          console.log('Contact API response:', response.data);
        } catch (contactError) {
          console.error('Error submitting to contact API:', contactError);
          
          // If contact API fails, try the recommendations endpoint
          const recResponse = await axios.post('http://localhost:5000/api/recommendations', {
            ...formattedData,
            category: formData.category,
            recommendation: formData.recommendation
          }, {
            headers: {
              'Content-Type': 'application/json'
            },
            timeout: 10000
          });
          
          console.log('Recommendations API response:', recResponse.data);
        }
        
        setSnackbarMessage('Thank you for your recommendation! The school administration will review it.');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          category: '',
          recommendation: '',
          relation: ''
        });
      } catch (error) {
        console.error('Error submitting recommendation:', error);
        
        // Provide more specific error message if available
        let errorMessage = 'There was an error submitting your recommendation. Please try again later.';
        if (error.response) {
          console.error('Error response data:', error.response.data);
          errorMessage = error.response.data.message || errorMessage;
        } else if (error.request) {
          console.error('No response received');
          errorMessage = 'No response received from server. Please check if the server is running.';
        }
        
        setSnackbarMessage(errorMessage);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
      } finally {
        setIsSubmitting(false);
      }
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container sx={{ pt: 4 }}> {/* Add top padding to container */}
      <Typography variant="h3" component="h1" color="primary" gutterBottom align="center" sx={{ mt: 2 }}>
        School Recommendations
      </Typography>
      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        Help us improve Baliwag North Central School by sharing your suggestions and recommendations
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: 'auto' }}>
            <CardContent sx={{ pb: '16px !important' }}>
              <Typography variant="h5" gutterBottom>
                Why Submit Recommendations?
              </Typography>
              <Typography variant="body1" paragraph>
                Your feedback is valuable in helping us create a better learning environment for our students. 
                Share your ideas on how we can improve our facilities, programs, or sanitation systems.
              </Typography>
              
              <Box>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SchoolIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      School Address
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Baliwag North Central School<br />
                      Baliwag, Bulacan
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      bncs@deped.gov.ph
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      Call Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +63 44 123 4567
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Box sx={{ mt: 3, pt: 2, borderTop: 1, borderColor: 'divider' }}>
                <Typography variant="h6" gutterBottom>
                  What happens to your recommendations?
                </Typography>
                <Typography variant="body2">
                  All recommendations are reviewed by the school administration and prioritized based on feasibility and impact. 
                  We may contact you for further details if needed. Selected recommendations will be implemented as part of our 
                  continuous improvement program.
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              <LightbulbIcon sx={{ mr: 1, verticalAlign: 'middle', color: 'primary.main' }} />
              Share Your Recommendation
            </Typography>
            
            <form onSubmit={handleSubmit}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    error={!!formErrors.name}
                    helperText={formErrors.name}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Email Address"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    error={!!formErrors.email}
                    helperText={formErrors.email}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Phone Number (Optional)"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Your Relation to the School"
                    name="relation"
                    value={formData.relation}
                    onChange={handleInputChange}
                    error={!!formErrors.relation}
                    helperText={formErrors.relation}
                    margin="normal"
                  >
                    {relationTypes.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    select
                    label="Recommendation Category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    error={!!formErrors.category}
                    helperText={formErrors.category}
                    margin="normal"
                  >
                    {recommendationCategories.map((option) => (
                      <MenuItem key={option} value={option}>
                        {option}
                      </MenuItem>
                    ))}
                  </TextField>
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Your Recommendation"
                    name="recommendation"
                    multiline
                    rows={4}
                    value={formData.recommendation}
                    onChange={handleInputChange}
                    error={!!formErrors.recommendation}
                    helperText={formErrors.recommendation}
                    margin="normal"
                    placeholder="Please describe your recommendation in detail. What specific improvements would you like to see?"
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    size="large"
                    endIcon={<SendIcon />}
                    disabled={isSubmitting}
                    sx={{ mt: 2 }}
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Recommendation'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
        </Grid>
      </Grid>
      
      {/* FAQ Section */}
      <Box sx={{ mt: 6 }}>
        <Typography variant="h4" gutterBottom align="center">
          Frequently Asked Questions
        </Typography>
        <Grid container spacing={3} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How are recommendations evaluated?
                </Typography>
                <Typography variant="body2">
                  Recommendations are evaluated based on feasibility, impact on student learning, cost-effectiveness, 
                  and alignment with the school's development plan. Priority is given to recommendations that address 
                  urgent needs and benefit the most students.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Will I be notified if my recommendation is implemented?
                </Typography>
                <Typography variant="body2">
                  Yes, if you provide your contact information, we will notify you if your recommendation is selected 
                  for implementation. We may also contact you for additional details or to involve you in the implementation process.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Can I submit multiple recommendations?
                </Typography>
                <Typography variant="body2">
                  Absolutely! You can submit as many recommendations as you'd like. Each recommendation will be 
                  evaluated individually. We encourage you to be specific and detailed in each submission.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How can I support the implementation of recommendations?
                </Typography>
                <Typography variant="body2">
                  You can support implementation by volunteering your time, expertise, or resources. If you're interested 
                  in contributing beyond just submitting a recommendation, please indicate this in your submission or 
                  contact the school administration directly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>
      
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleSnackbarClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ContactPage;