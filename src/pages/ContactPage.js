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

function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
    inquiryType: ''
  });
  
  const [formErrors, setFormErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const inquiryTypes = [
    'General Inquiry',
    'Donation Information',
    'Volunteer Opportunities',
    'School Partnership',
    'Technical Assistance',
    'Media Inquiry',
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
    
    if (!formData.subject.trim()) {
      errors.subject = 'Subject is required';
    }
    
    if (!formData.message.trim()) {
      errors.message = 'Message is required';
    }
    
    if (!formData.inquiryType) {
      errors.inquiryType = 'Please select an inquiry type';
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = (event) => {
    event.preventDefault();
    
    if (validateForm()) {
      setIsSubmitting(true);
      
      // Simulate form submission
      setTimeout(() => {
        setIsSubmitting(false);
        setSnackbarOpen(true);
        
        // Reset form after successful submission
        setFormData({
          name: '',
          email: '',
          phone: '',
          subject: '',
          message: '',
          inquiryType: ''
        });
      }, 1500);
    }
  };
  
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container>
      <Typography variant="h3" component="h1" color="primary" gutterBottom align="center">
        Contact Us
      </Typography>
      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        We'd love to hear from you. Reach out with any questions or inquiries.
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <Card sx={{ height: '100%' }}>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Get in Touch
              </Typography>
              <Typography variant="body1" paragraph>
                Have questions about our projects, donations, or how you can get involved? 
                We're here to help!
              </Typography>
              
              <Box sx={{ my: 4 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <EmailIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      Email Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      info@kalinisaralan.org
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <PhoneIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      Call Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      +63 (2) 8123 4567
                    </Typography>
                  </Box>
                </Box>
                
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <LocationOnIcon color="primary" sx={{ mr: 2 }} />
                  <Box>
                    <Typography variant="subtitle1">
                      Visit Us
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      123 Sanitation Street<br />
                      Makati City, Metro Manila<br />
                      Philippines
                    </Typography>
                  </Box>
                </Box>
              </Box>
              
              <Divider sx={{ my: 3 }} />
              
              <Typography variant="h6" gutterBottom>
                Office Hours
              </Typography>
              <Typography variant="body2">
                Monday - Friday: 9:00 AM - 5:00 PM<br />
                Saturday: 9:00 AM - 12:00 PM<br />
                Sunday: Closed
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={7}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h5" gutterBottom>
              Send Us a Message
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
                    label="Inquiry Type"
                    name="inquiryType"
                    value={formData.inquiryType}
                    onChange={handleInputChange}
                    error={!!formErrors.inquiryType}
                    helperText={formErrors.inquiryType}
                    margin="normal"
                  >
                    {inquiryTypes.map((option) => (
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
                    label="Subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    error={!!formErrors.subject}
                    helperText={formErrors.subject}
                    margin="normal"
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Message"
                    name="message"
                    multiline
                    rows={4}
                    value={formData.message}
                    onChange={handleInputChange}
                    error={!!formErrors.message}
                    helperText={formErrors.message}
                    margin="normal"
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
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Paper>
          
          <Box sx={{ mt: 4 }}>
            <Typography variant="h6" gutterBottom>
              Interested in volunteering?
            </Typography>
            <Typography variant="body2" paragraph>
              We welcome volunteers with various skills, from construction and plumbing to education and project management. 
              Please mention your skills and availability in your message.
            </Typography>
          </Box>
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
                  How can schools apply for assistance?
                </Typography>
                <Typography variant="body2">
                  Schools can apply for assistance by filling out our School Application Form available in the Resources section. 
                  Alternatively, school administrators can contact us directly through this form.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How are donations used?
                </Typography>
                <Typography variant="body2">
                  Donations directly fund our sanitation projects, including materials, labor, and educational programs. 
                  We ensure transparency by providing regular updates on project progress and financial reports.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Can I specify which project my donation supports?
                </Typography>
                <Typography variant="body2">
                  Yes, donors can specify if they want their contribution to support a particular project or region. 
                  Please indicate your preference in the donation form or contact us directly.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  How can companies partner with KalinisAralan?
                </Typography>
                <Typography variant="body2">
                  We offer various partnership opportunities for companies, including corporate sponsorships, 
                  employee volunteer programs, and in-kind donations. Please contact us to discuss potential collaborations.
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
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          Thank you for your message! We'll get back to you soon.
        </Alert>
      </Snackbar>
    </Container>
  );
}

export default ContactPage;