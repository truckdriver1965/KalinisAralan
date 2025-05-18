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

// Animation variants for framer-motion
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

  useEffect(() => {
    setAnimationKey(prevKey => prevKey + 1);
  }, [activeStep]);

  const handleNext = () => {
    if (activeStep === 0 && donationAmount === 'custom') {
      const amount = Number(customAmount);
      if (isNaN(amount) || amount <= 0) {
        setSnackbarMessage('Please enter a valid donation amount');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
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
  };

  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  const validatePaymentDetails = () => {
    if (paymentMethod === 'creditCard') {
      if (!paymentDetails.cardNumber || !paymentDetails.expiryDate || !paymentDetails.cvv) {
        setSnackbarMessage('Please fill in all credit card details');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return false;
      }
    } else if (paymentMethod === 'gcash') {
      if (!paymentDetails.gcashNumber || !paymentDetails.gcashName) {
        setSnackbarMessage('Please fill in all GCash details');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return false;
      }
    } else if (paymentMethod === 'bankTransfer') {
      if (!paymentDetails.referenceNumber) {
        setSnackbarMessage('Please enter the bank transfer reference number');
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!validatePaymentDetails()) {
      return;
    }
    
    setIsProcessing(true);
    
    // Prepare donation data
    const donationData = {
      amount: donationAmount === 'custom' ? customAmount : donationAmount,
      donor: donorInfo,
      paymentMethod: paymentMethod,
      paymentDetails: paymentDetails
    };
    
    console.log('Submitting donation data:', donationData);
    
    try {
      // Use axios instead of fetch
      const response = await axios.post(
        'http://localhost/exercisejsx/kalinisaralan/api/donations.php',
        donationData
      );
      
      console.log('Response:', response);
      
      // Axios automatically parses JSON, so we can access data directly
      const data = response.data;
      
      if (data.success) {
        // Set donation reference from the response
        setDonationReference(data.referenceNumber || ('DON-' + Math.floor(100000 + Math.random() * 900000)));
        
        // First set processing to false
        setIsProcessing(false);
        
        // Then move to the next step (confirmation page)
        handleNext();
        
        // Show success message
        setSnackbarMessage('Donation processed successfully!');
        setSnackbarSeverity('success');
        setSnackbarOpen(true);
      } else {
        setSnackbarMessage('Error processing donation: ' + data.message);
        setSnackbarSeverity('error');
        setSnackbarOpen(true);
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Error processing donation:', error);
      setSnackbarMessage('Failed to process donation. Please try again later.');
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
                      ₱500 provides hygiene education for 10 students
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <FavoriteIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      ₱2,500 installs a handwashing station
                    </Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} sm={4}>
                  <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
                    <VolunteerActivismIcon color="primary" sx={{ fontSize: 40, mb: 1 }} />
                    <Typography variant="body1">
                      ₱10,000 renovates a school toilet facility
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
                  elevation={paymentMethod === 'creditCard' ? 3 : 1}
                  sx={{ 
                    p: 2, 
                    mb: 2,
                    border: paymentMethod === 'creditCard' ? '2px solid' : '1px solid',
                    borderColor: paymentMethod === 'creditCard' ? 'primary.main' : 'divider',
                    borderRadius: 2
                  }}
                >
                  <FormControlLabel
                    value="creditCard"
                    control={<Radio color="primary" />}
                    label="Credit/Debit Card"
                  />
                </Paper>
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
                  Branch: Main Branch, Manila
                </Typography>
                
                <TextField
                  required
                  fullWidth
                  label="Bank Transfer Reference Number"
                  name="referenceNumber"
                  value={paymentDetails.referenceNumber}
                  onChange={handlePaymentDetailsChange}
                  margin="normal"
                  helperText="Enter the reference number from your bank transfer"
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
                    : donationAmount ? parseInt(donationAmount).toLocaleString() : '0'}
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
                : donationAmount ? parseInt(donationAmount).toLocaleString() : '0'} will help improve sanitation facilities for Filipino students.
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
            Support Our Mission
          </Typography>
          <Typography variant="h6" color="text.secondary">
            Your donation helps us provide clean water and sanitation facilities to schools
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
                        Your donation directly supports our mission to improve sanitation facilities in Philippine schools, creating healthier learning environments for students.
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
                          'Better hygiene practices in schools',
                          'Increased school attendance, especially for girls',
                          'Healthier school communities'
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
                          'Volunteer your time and skills',
                          'Spread awareness about our cause',
                          'Partner with us as a corporate sponsor',
                          'Donate materials or equipment'
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
      </Container>
    );
}

export default DonatePage;