import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  TextField,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Divider,
  Paper,
  Stepper,
  Step,
  StepLabel,
  CircularProgress,
  useTheme,
  Fade,
  Grow,
  Zoom,
  Snackbar,
  Alert
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import SchoolIcon from '@mui/icons-material/School';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import PersonIcon from '@mui/icons-material/Person';
import PaymentIcon from '@mui/icons-material/Payment';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import axios from 'axios';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1,
    transition: { 
      duration: 0.5,
      when: "beforeChildren",
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: { 
    y: 0, 
    opacity: 1,
    transition: { duration: 0.5 }
  }
};

function DonatePage() {
  const theme = useTheme();
  const [activeStep, setActiveStep] = useState(0);
  const [donationAmount, setDonationAmount] = useState('');
  const [customAmount, setCustomAmount] = useState('');
  const [donorInfo, setDonorInfo] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    country: '',
    postalCode: ''
  });
  const [paymentMethod, setPaymentMethod] = useState('gcash');
  const [isProcessing, setIsProcessing] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    gcashNumber: '',
    gcashName: '',
    referenceNumber: ''
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [donationReference, setDonationReference] = useState('');
  const [formErrors, setFormErrors] = useState({});

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [activeStep]);

  const validateDonationAmount = () => {
    if (!donationAmount) {
      setSnackbarMessage('Please select a donation amount');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    
    if (donationAmount === 'custom') {
      const amount = Number(customAmount);
      if (isNaN(amount) || amount <= 0) {
        setSnackbarMessage('Please enter a valid donation amount');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return false;
      }
    }
    return true;
  };
  
  const validateDonorInfo = () => {
    const errors = {};
    
    if (!donorInfo.firstName.trim()) {
      errors.firstName = 'First name is required';
    } else if (donorInfo.firstName.trim().length < 2) {
      errors.firstName = 'First name must be at least 2 characters';
    }
    
    if (!donorInfo.lastName.trim()) {
      errors.lastName = 'Last name is required';
    } else if (donorInfo.lastName.trim().length < 2) {
      errors.lastName = 'Last name must be at least 2 characters';
    }
    
    if (!donorInfo.email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^\S+@\S+\.\S+$/.test(donorInfo.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (donorInfo.phone && !/^(\+\d{1,3})?\s?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/.test(donorInfo.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (donorInfo.postalCode && !/^\d{4,6}$/.test(donorInfo.postalCode)) {
      errors.postalCode = 'Please enter a valid postal code';
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setSnackbarMessage('Please correct the errors in the form');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    
    return true;
  };

  const handleNext = () => {
    if (activeStep === 0) {
      if (!validateDonationAmount()) {
        return;
      }
    } else if (activeStep === 1) {
      if (!validateDonorInfo()) {
        return;
      }
    }
    
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleDonationAmountChange = (event) => {
    setDonationAmount(event.target.value);
  };

  const handleCustomAmountChange = (event) => {
    setCustomAmount(event.target.value);
  };

  const handleDonorInfoChange = (event) => {
    const { name, value } = event.target;
    setDonorInfo({
      ...donorInfo,
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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  const handlePaymentDetailsChange = (event) => {
    const { name, value } = event.target;
    setPaymentDetails({
      ...paymentDetails,
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

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validatePaymentDetails = () => {
    const errors = {};
    
 
    if (paymentMethod === 'gcash') {
      if (!paymentDetails.gcashNumber) {
        errors.gcashNumber = 'GCash number is required';
      } else if (!/^09\d{9}$|^(\+63|0063)\d{10}$/.test(paymentDetails.gcashNumber.replace(/\s/g, ''))) {
        errors.gcashNumber = 'Please enter a valid GCash number';
      }
      
      if (!paymentDetails.gcashName) {
        errors.gcashName = 'GCash account name is required';
      }
    } else if (paymentMethod === 'bankTransfer') {
      if (!paymentDetails.referenceNumber) {
        errors.referenceNumber = 'Reference number is required';
      } else if (paymentDetails.referenceNumber.length < 6) {
        errors.referenceNumber = 'Please enter a valid reference number';
      }
    }
    
    setFormErrors(errors);
    
    if (Object.keys(errors).length > 0) {
      setSnackbarMessage('Please correct the errors in the payment details');
      setSnackbarSeverity('error');
      setSnackbarOpen(true);
      return false;
    }
    
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validatePaymentDetails()) {
      return;
    }
    
    setIsProcessing(true);
    
    const donationData = {
      amount: donationAmount === 'custom' ? customAmount : donationAmount,
      donor: donorInfo,
      paymentMethod: paymentMethod,
      paymentDetails: paymentDetails,
      status: 'pending',
      timestamp: new Date().toISOString()
    };
    
    console.log('Submitting donation data:', donationData);
    
    try {
      // Updated to use the Express server endpoint instead of PHP
      const response = await axios.post(
        'http://localhost:5000/api/donations',
        donationData,
        {
          headers: {
            'Content-Type': 'application/json'
          },
          timeout: 10000 // 10 second timeout
        }
      );
      
      console.log('Response:', response);
      
      const data = response.data;
      
      if (data && data.id) {
        setDonationReference(data.id || ('DON-' + Math.floor(100000 + Math.random() * 900000)));
        
        setIsProcessing(false);
        
        handleNext();
        
        setSnackbarMessage('Donation processed successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Error processing donation: ' + (data.message || 'Unknown error'));
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      
      // Provide more specific error message if available
      let errorMessage = 'Failed to process donation. Please try again later.';
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
      setIsProcessing(false);
    }
  };

  const steps = [
    { label: 'Choose Amount', icon: <LocalAtmIcon /> },
    { label: 'Your Information', icon: <PersonIcon /> },
    { label: 'Payment', icon: <PaymentIcon /> },
    { label: 'Confirmation', icon: <CheckCircleIcon /> }
  ];

  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Select Donation Amount
            </Typography>
            <FormControl component="fieldset" fullWidth sx={{ my: 2 }}>
              <RadioGroup
                aria-label="donation-amount"
                name="donation-amount"
                value={donationAmount}
                onChange={handleDonationAmountChange}
              >
                <Grid container spacing={2}>
                  {['500', '1000', '2500', '5000', '10000', 'custom'].map((amount) => (
                    <Grid item xs={6} sm={4} key={amount}>
                      <Paper 
                        elevation={donationAmount === amount ? 3 : 1}
                        sx={{ 
                          p: 2, 
                          border: donationAmount === amount ? '2px solid' : '1px solid',
                          borderColor: donationAmount === amount ? 'primary.main' : 'divider',
                          borderRadius: 2
                        }}
                      >
                        <FormControlLabel
                          value={amount}
                          control={<Radio color="primary" />}
                          label={
                            amount === 'custom' 
                              ? 'Custom Amount' 
                              : `₱${parseInt(amount).toLocaleString()}`
                          }
                          sx={{ width: '100%' }}
                        />
                      </Paper>
                    </Grid>
                  ))}
                </Grid>
              </RadioGroup>
            </FormControl>

            {donationAmount === 'custom' && (
              <TextField
                label="Enter amount (PHP)"
                variant="outlined"
                fullWidth
                value={customAmount}
                onChange={handleCustomAmountChange}
                type="number"
                InputProps={{ inputProps: { min: 100 } }}
                sx={{ mt: 2 }}
                error={formErrors.customAmount}
                helperText={formErrors.customAmount}
              />
            )}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Your donation will help:
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <SchoolIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      ₱500 provides hygiene education for 10 students at Baliwag North Central School
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <FavoriteIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      ₱2,500 installs a handwashing station at the school
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <VolunteerActivismIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      ₱10,000 renovates a toilet facility at Baliwag North Central School
                    </Typography>
                  </Box>
                </Grid>
              </Grid>
            </Box>
          </Box>
        );
      case 1:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Your Information
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="First Name"
                  name="firstName"
                  value={donorInfo.firstName}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                  error={!!formErrors.firstName}
                  helperText={formErrors.firstName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Last Name"
                  name="lastName"
                  value={donorInfo.lastName}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                  error={!!formErrors.lastName}
                  helperText={formErrors.lastName}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  required
                  fullWidth
                  label="Email Address"
                  name="email"
                  type="email"
                  value={donorInfo.email}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                  error={!!formErrors.email}
                  helperText={formErrors.email}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Phone Number"
                  name="phone"
                  value={donorInfo.phone}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                  error={!!formErrors.phone}
                  helperText={formErrors.phone}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  label="Address"
                  name="address"
                  value={donorInfo.address}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="City"
                  name="city"
                  value={donorInfo.city}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Country"
                  name="country"
                  value={donorInfo.country}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  label="Postal Code"
                  name="postalCode"
                  value={donorInfo.postalCode}
                  onChange={handleDonorInfoChange}
                  margin="normal"
                  error={!!formErrors.postalCode}
                  helperText={formErrors.postalCode}
                />
              </Grid>
            </Grid>
          </Box>
        );
      case 2:
        return (
          <Box>
            <Typography variant="h5" gutterBottom>
              Payment Method
            </Typography>
            <FormControl component="fieldset" fullWidth sx={{ my: 2 }}>
              <RadioGroup
                aria-label="payment-method"
                name="payment-method"
                value={paymentMethod}
                onChange={handlePaymentMethodChange}
              >
     
                <Paper 
                  elevation={paymentMethod === 'bankTransfer' ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    mb: 2,
                    border: paymentMethod === 'bankTransfer' ? '2px solid' : '1px solid',
                    borderColor: paymentMethod === 'bankTransfer' ? 'primary.main' : 'divider',
                    borderRadius: 2
                  }}
                >
                  <FormControlLabel
                    value="bankTransfer"
                    control={<Radio color="primary" />}
                    label="Bank Transfer"
                  />
                </Paper>
                <Paper 
                  elevation={paymentMethod === 'gcash' ? 3 : 1}
                  sx={{ 
                    p: 2,
                    border: paymentMethod === 'gcash' ? '2px solid' : '1px solid',
                    borderColor: paymentMethod === 'gcash' ? 'primary.main' : 'divider',
                    borderRadius: 2
                  }}
                >
                  <FormControlLabel
                    value="gcash"
                    control={<Radio color="primary" />}
                    label="GCash"
                  />
                </Paper>
              </RadioGroup>
            </FormControl>

            {paymentMethod === 'creditCard' && (
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    required
                    fullWidth
                    label="Card Number"
                    name="cardNumber"
                    value={paymentDetails.cardNumber}
                    onChange={handlePaymentDetailsChange}
                    margin="normal"
                    error={!!formErrors.cardNumber}
                    helperText={formErrors.cardNumber}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="Expiry Date (MM/YY)"
                    name="expiryDate"
                    value={paymentDetails.expiryDate}
                    onChange={handlePaymentDetailsChange}
                    margin="normal"
                    error={!!formErrors.expiryDate}
                    helperText={formErrors.expiryDate}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <TextField
                    required
                    fullWidth
                    label="CVV"
                    name="cvv"
                    value={paymentDetails.cvv}
                    onChange={handlePaymentDetailsChange}
                    margin="normal"
                    type="password"
                    error={!!formErrors.cvv}
                    helperText={formErrors.cvv}
                  />
                </Grid>
              </Grid>
            )}

            {paymentMethod === 'bankTransfer' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Please use the following bank details for your transfer:
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  Bank: Sample Bank Philippines<br />
                  Account Name: KalinisAralan Foundation<br />
                  Account Number: 1234-5678-9012-3456<br />
                  Branch: Baliwag Branch
                </Typography>
                
                <TextField
                  required
                  fullWidth
                  label="Bank Transfer Reference Number"
                  name="referenceNumber"
                  value={paymentDetails.referenceNumber}
                  onChange={handlePaymentDetailsChange}
                  margin="normal"
                  error={!!formErrors.referenceNumber}
                  helperText={formErrors.referenceNumber || "Enter the reference number from your bank transfer"}
                />
              </Box>
            )}

            {paymentMethod === 'gcash' && (
              <Box sx={{ mt: 2 }}>
                <Typography variant="body1" gutterBottom>
                  Please send your donation to the following GCash number:
                </Typography>
                <Typography variant="body2" sx={{ mb: 3 }}>
                  GCash Number: 0917-123-4567<br />
                  Account Name: KalinisAralan Foundation
                </Typography>
                
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="Your GCash Number"
                      name="gcashNumber"
                      value={paymentDetails.gcashNumber}
                      onChange={handlePaymentDetailsChange}
                      margin="normal"
                      error={!!formErrors.gcashNumber}
                      helperText={formErrors.gcashNumber}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      required
                      fullWidth
                      label="GCash Account Name"
                      name="gcashName"
                      value={paymentDetails.gcashName}
                      onChange={handlePaymentDetailsChange}
                      margin="normal"
                      error={!!formErrors.gcashName}
                      helperText={formErrors.gcashName}
                    />
                  </Grid>
                </Grid>
              </Box>
            )}

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Donation Summary
              </Typography>
              <Box sx={{ bgcolor: 'background.paper', p: 2, borderRadius: 1 }}>
                <Typography variant="body1">
                  Donation Amount: ₱{donationAmount === 'custom' 
                    ? customAmount 
                    : donationAmount ? parseInt(donationAmount).toLocaleString() : '0'} will help improve sanitation facilities at Baliwag North Central School.
                </Typography>
              </Box>
            </Box>
          </Box>
        );
      case 3:
        return (
          <Box sx={{ textAlign: 'center' }}>
            <Box sx={{ my: 4 }}>
              <FavoriteIcon color="primary" sx={{ fontSize: 60 }} />
            </Box>
            <Typography variant="h4" gutterBottom>
              Thank You for Your Donation!
            </Typography>
            <Typography variant="body1" paragraph>
              Your contribution of ₱{donationAmount === 'custom' 
                ? customAmount 
                : donationAmount ? parseInt(donationAmount).toLocaleString() : '0'} will help improve sanitation facilities at Baliwag North Central School.
            </Typography>
            <Typography variant="body1" paragraph>
              A confirmation email has been sent to {donorInfo.email}.
            </Typography>
            <Typography variant="body1" paragraph>
              Your donation reference number: {donationReference || 'DON-' + Math.floor(100000 + Math.random() * 900000)}
            </Typography>
            <Box sx={{ mt: 4 }}>
              <Button variant="contained" color="primary" href="/">
                Return to Home
              </Button>
            </Box>
          </Box>
        );
      default:
        return 'Unknown step';
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 6 }}>
      <Fade in={true} timeout={600}>
        <Box sx={{ 
          textAlign: 'center', 
          mb: 6,
          position: 'relative',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -16,
            left: '50%',
            transform: 'translateX(-50%)',
            width: 80,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2
          }
        }}>
          <Typography variant="h3" component="h1" color="primary" gutterBottom>
            Support Baliwag North Central School
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your donation helps us provide clean water and sanitation facilities to our school
          </Typography>
        </Box>
      </Fade>
      
      <Grid container spacing={4}>
        <Grid item xs={12} md={8}>
          <Fade in={true} timeout={500} style={{ transitionDelay: '200ms' }}>
            <Card elevation={3} sx={{ 
              overflow: 'hidden',
              transition: 'box-shadow 0.3s ease',
              '&:hover': {
                boxShadow: '0 8px 30px rgba(0, 0, 0, 0.12)',
              }
            }}>
              <Box sx={{ 
                bgcolor: 'primary.main', 
                py: 2, 
                px: 3,
                borderBottom: '1px solid',
                borderColor: 'divider'
              }}>
                <Typography variant="h5" color="primary.contrastText" fontWeight="bold">
                  Make a Donation
                </Typography>
              </Box>
              <CardContent sx={{ p: 4 }}>
                <Stepper 
                  activeStep={activeStep} 
                  alternativeLabel 
                  sx={{ 
                    mb: 5,
                    '& .MuiStepConnector-line': {
                      borderColor: 'divider',
                      transition: 'border-color 0.3s ease'
                    },
                    '& .MuiStepIcon-root': {
                      color: 'grey.300',
                      transition: 'color 0.3s ease',
                      '&.Mui-active, &.Mui-completed': {
                        color: 'primary.main',
                      },
                    }
                  }}
                >
                  {steps.map((step, index) => (
                    <Step key={step.label}>
                      <StepLabel StepIconComponent={() => (
                        <Zoom in={activeStep >= index} timeout={500}>
                          <Box sx={{ 
                            width: 40, 
                            height: 40, 
                            borderRadius: '50%', 
                            display: 'flex', 
                            alignItems: 'center', 
                            justifyContent: 'center',
                            bgcolor: activeStep >= index ? 'primary.main' : 'grey.300',
                            color: activeStep >= index ? 'primary.contrastText' : 'white',
                            transition: 'background-color 0.5s ease'
                          }}>
                            {step.icon}
                          </Box>
                        </Zoom>
                      )}>
                        {step.label}
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
                
                <form onSubmit={handleSubmit}>
                  <Fade key={animationKey} in={true} timeout={500}>
                    <Box sx={{ 
                      bgcolor: 'background.paper', 
                      p: 3, 
                      borderRadius: 2,
                      boxShadow: '0 2px 8px rgba(0,0,0,0.05)'
                    }}>
                      <Box>
                        {getStepContent(activeStep)}
                      </Box>
                    </Box>
                  </Fade>
                  
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    mt: 4,
                    pt: 3,
                    borderTop: '1px solid',
                    borderColor: 'divider'
                  }}>
                    <Button
                      disabled={activeStep === 0 || activeStep === steps.length - 1}
                      onClick={handleBack}
                      sx={{ 
                        borderRadius: 30,
                        px: 3,
                        color: 'text.secondary',
                        transition: 'all 0.3s ease',
                        '&:not(:disabled)': {
                          borderColor: 'primary.main',
                          color: 'primary.main'
                        },
                        '&:hover:not(:disabled)': {
                          transform: 'translateX(-5px)',
                          borderColor: 'primary.dark',
                        }
                      }}
                      variant="outlined"
                    >
                      Back
                    </Button>
                    <Box>
                      {activeStep === steps.length - 1 ? null : (
                        isProcessing ? (
                          <Button
                            variant="contained"
                            color="primary"
                            disabled
                            sx={{ 
                              borderRadius: 30,
                              px: 4,
                              py: 1.2
                            }}
                          >
                            <CircularProgress size={24} sx={{ mr: 1, color: 'white' }} />
                            Processing...
                          </Button>
                        ) : (
                          activeStep === steps.length - 2 ? (
                            <Button
                              variant="contained"
                              color="primary"
                              type="submit"
                              sx={{ 
                                borderRadius: 30,
                                px: 4,
                                py: 1.2,
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                  transform: 'translateY(-3px)',
                                  boxShadow: '0 8px 15px rgba(242, 169, 0, 0.3)',
                                }
                              }}
                            >
                              Complete Donation
                            </Button>
                          ) : (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={handleNext}
                              disabled={
                                (activeStep === 0 && !donationAmount) ||
                                (activeStep === 0 && donationAmount === 'custom' && !customAmount) ||
                                (activeStep === 1 && (!donorInfo.firstName || !donorInfo.lastName || !donorInfo.email))
                              }
                              sx={{ 
                                borderRadius: 30,
                                px: 4,
                                py: 1.2,
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                '&:hover:not(:disabled)': {
                                  transform: 'translateX(5px)',
                                  boxShadow: '0 6px 12px rgba(242, 169, 0, 0.3)',
                                }
                              }}
                            >
                              Next
                            </Button>
                          )
                        )
                      )}
                    </Box>
                  </Box>
                </form>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
        
        <Grid item xs={12} md={4}>
          <Fade in={true} timeout={500} style={{ transitionDelay: '400ms' }}>
            <Card elevation={3} sx={{ 
              height: '100%', 
              display: 'flex', 
              flexDirection: 'column',
              position: 'relative',
              overflow: 'hidden',
              transition: 'transform 0.3s ease, box-shadow 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)',
                boxShadow: '0 12px 30px rgba(0, 0, 0, 0.15)',
              },
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                width: 8,
                height: '100%',
                backgroundColor: 'primary.main'
              }
            }}>
              <CardContent sx={{ p: 3, pl: 4, flexGrow: 1 }}>
                <Fade in={true} timeout={600}>
                  <Box>
                    <Typography variant="h5" gutterBottom fontWeight="bold" color="primary">
                      Why Donate?
                    </Typography>
                    <Typography variant="body1" paragraph>
                      Your donation directly supports our mission to improve sanitation facilities at Baliwag North Central School, creating a healthier learning environment for students.
                    </Typography>
                  </Box>
                </Fade>
                
                <Divider sx={{ my: 3 }} />
                
                <Fade in={true} timeout={700}>
                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      Impact of Your Donation
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {[
                        'Reduced absenteeism due to illness',
                        'Improved dignity and privacy for students',
                        'Better hygiene practices in the school',
                        'Increased school attendance, especially for girls',
                        'A healthier school environment'
                      ].map((item, index) => (
                        <Fade
                          key={index}
                          in={true}
                          timeout={500}
                          style={{ transitionDelay: `${500 + (index * 100)}ms` }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              bgcolor: 'primary.main',
                              mr: 1.5
                            }} />
                            <Typography variant="body2">{item}</Typography>
                          </Box>
                        </Fade>
                      ))}
                    </Box>
                  </Box>
                </Fade>
                
                <Divider sx={{ my: 3 }} />
                
                <Fade in={true} timeout={800}>
                  <Box>
                    <Typography variant="h6" gutterBottom color="primary">
                      Other Ways to Help
                    </Typography>
                    <Box sx={{ pl: 2 }}>
                      {[
                        'Volunteer your time at Baliwag North Central School',
                        'Spread awareness about our school\'s needs',
                        'Partner with us as a corporate sponsor',
                        'Donate materials or equipment for the school'
                      ].map((item, index) => (
                        <Fade
                          key={index}
                          in={true}
                          timeout={500}
                          style={{ transitionDelay: `${900 + (index * 100)}ms` }}
                        >
                          <Box sx={{ display: 'flex', alignItems: 'center', mb: 1.5 }}>
                            <Box sx={{ 
                              width: 6, 
                              height: 6, 
                              borderRadius: '50%', 
                              bgcolor: 'primary.main',
                              mr: 1.5
                            }} />
                            <Typography variant="body2">{item}</Typography>
                          </Box>
                        </Fade>
                      ))}
                    </Box>
                  </Box>
                </Fade>
                
                <Fade in={true} timeout={1000} style={{ transitionDelay: '1300ms' }}>
                  <Box>
                    <Button 
                      variant="outlined" 
                      color="primary" 
                      fullWidth 
                      href="/contact" 
                      sx={{ 
                        mt: 4,
                        borderWidth: 2,
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          borderWidth: 2,
                          bgcolor: 'rgba(242, 169, 0, 0.08)',
                          transform: 'translateY(-3px)',
                        }
                      }}
                    >
                      Contact Us to Learn More
                    </Button>
                  </Box>
                </Fade>
              </CardContent>
            </Card>
          </Fade>
        </Grid>
      </Grid>
    
      
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

export default DonatePage;