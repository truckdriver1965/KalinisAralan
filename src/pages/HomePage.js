import React, { useEffect, useState } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,  
  Container,
  Grid,
  Typography,
  Stack,
  Fade,
  Zoom,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import SchoolIcon from '@mui/icons-material/School';
import WaterIcon from '@mui/icons-material/Water';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import HandshakeIcon from '@mui/icons-material/Handshake';
import { Link } from 'react-router-dom';
import { projectsApi, testimonialsApi, homeApi } from '../services/api';


function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animateElements, setAnimateElements] = React.useState(false);
  const [projects, setProjects] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [heroContent, setHeroContent] = useState({});
  const [sdgGoals, setSdgGoals] = useState([]);
  const [approachContent, setApproachContent] = useState({});
  const [processSteps, setProcessSteps] = useState([]);
 
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Using the API functions from api.js for all requests
        const [
          projectsResponse,
          testimonialsResponse,
          heroResponse,
          sdgGoalsResponse,
          approachResponse,
          processResponse
        ] = await Promise.all([
          projectsApi.getAll(),
          testimonialsApi.getAll(),
          homeApi.getHero(),
          homeApi.getSdgGoals(),
          homeApi.getApproach(),
          homeApi.getProcess()
        ]);
       
        setProjects(projectsResponse.data);
        setTestimonials(testimonialsResponse.data);
        setHeroContent(heroResponse.data);
        setSdgGoals(sdgGoalsResponse.data.goals);
        setApproachContent(approachResponse.data);
        setProcessSteps(processResponse.data.steps);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError('Failed to load data');
      } finally {
        setLoading(false);
      }
    };


    fetchData();
    setAnimateElements(true);
    window.scrollTo(0, 0);
  }, []);


  // Map icon types to actual icon components
  const getIconByType = (iconType) => {
    switch (iconType) {
      case 'water':
        return <WaterIcon fontSize="large" />;
      case 'medical':
        return <MedicalServicesIcon fontSize="large" />;
      case 'book':
        return <MenuBookIcon fontSize="large" />;
      case 'handshake':
        return <HandshakeIcon fontSize="large" />;
      case 'check':
        return <CheckCircleIcon fontSize="large" />;
      default:
        return <CheckCircleIcon fontSize="large" />;
    }
  };


  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <CircularProgress />
      </Box>
    );
  }


  if (error) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography variant="h5" color="error">{error}</Typography>
      </Box>
    );
  }


  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{
        position: 'relative',
        height: '85vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        bgcolor: 'black',
      }}>
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.4)), url("${heroContent.backgroundImage}")`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0
          }}
        />
       
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4}>
            <Grid item xs={12} md={8}>
              <Box>
                <Typography
                  variant="overline"
                  sx={{
                    color: theme.palette.primary.main,
                    fontWeight: 'bold',
                    letterSpacing: 2,
                    mb: 1,
                    display: 'block'
                  }}
                >
                  {heroContent.overline || "IMPROVING SCHOOL SANITATION"}
                </Typography>
                <Typography
                  component="h1"
                  variant="h2"
                  sx={{
                    color: 'white',
                    fontWeight: 'bold',
                    mb: 2,
                    fontSize: { xs: '2.5rem', md: '3.5rem' },
                    lineHeight: 1.2,
                    textShadow: '2px 2px 4px rgba(0,0,0,0.5)'
                  }}
                >
                  {heroContent.title || "Transforming School Sanitation in the Philippines"}
                </Typography>
                <Typography
                  variant="h6"
                  sx={{
                    color: 'rgba(255, 255, 255, 0.9)',
                    mb: 4,
                    maxWidth: '600px',
                    lineHeight: 1.6,
                    textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                  }}
                >
                  {heroContent.description || "KalinisAralan documents and shares Baliwag North Central School's successful sanitation practices while enabling support for more schools to implement better facilities for their students."}
                </Typography>
                <Stack
                  direction={{ xs: 'column', sm: 'row' }}
                  spacing={2}
                >
                  <Button
                    variant="contained"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/donate"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 'bold',
                    }}
                  >
                    {heroContent.primaryButtonText || "SUPPORT OUR CAUSE"}
                  </Button>
                  <Button
                    variant="outlined"
                    color="primary"
                    size="large"
                    component={Link}
                    to="/projects"
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 'bold',
                      borderWidth: 2,
                      color: 'white',
                      borderColor: 'white',
                      '&:hover': {
                        borderWidth: 2,
                        borderColor: 'primary.main'
                      }
                    }}
                  >
                    {heroContent.secondaryButtonText || "VIEW BEST PRACTICES"}
                  </Button>
                </Stack>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* SDG Goals Section */}
      <Box sx={{ py: 8, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Fade in={animateElements} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  mb: 1,
                  display: 'block'
                }}
              >
                SUSTAINABLE DEVELOPMENT GOALS
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Contributing to Global Goals
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                }}
              >
                Our work directly supports these UN Sustainable Development Goals
              </Typography>
            </Box>
          </Fade>


          <Grid container spacing={4}>
            {sdgGoals.map((goal, index) => (
              <Grid item xs={12} md={4} key={goal.id || index}>
                <Fade in={animateElements} timeout={1000} style={{ transitionDelay: `${200 * (index + 1)}ms` }}>
                  <Card
                    sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 4,
                      overflow: 'hidden',
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        bgcolor: goal.color,
                        color: 'white',
                        p: 3,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexDirection: 'column'
                      }}
                    >
                      {getIconByType(goal.iconType)}
                      <Typography variant="h5" component="h3" sx={{ mt: 2, fontWeight: 'bold' }}>
                        {goal.title}
                      </Typography>
                    </Box>
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="body1">
                        {goal.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      <Box sx={{ py: 10, bgcolor: '#f8f9fa' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Fade in={animateElements} timeout={1000}>
                <Box>
                  <Typography
                    variant="overline"
                    sx={{
                      color: theme.palette.primary.main,
                      fontWeight: 'bold',
                      letterSpacing: 2,
                      mb: 1,
                      display: 'block'
                    }}
                  >
                    {approachContent.overline || "OUR APPROACH"}
                  </Typography>
                  <Typography
                    variant="h3"
                    component="h2"
                    sx={{
                      fontWeight: 'bold',
                      mb: 3,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        bottom: -10,
                        left: 0,
                        width: 80,
                        height: 4,
                        backgroundColor: 'primary.main',
                        borderRadius: 2
                      }
                    }}
                  >
                    {approachContent.title || "Creating Model School Sanitation"}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      mb: 4,
                      fontSize: '1.1rem',
                      lineHeight: 1.7,
                      color: 'text.secondary'
                    }}
                  >
                    {approachContent.description || "KalinisAralan combines documentation of effective sanitation practices with a platform for support, creating a sustainable model that both shares knowledge and enables improvement of facilities across Philippine public schools."}
                  </Typography>
               
                  <Box sx={{ mb: 4 }}>
                    {(approachContent.features || [
                      'Documenting and sharing effective sanitation practices',
                      'Facilitating support for facility improvements',
                      'Creating comprehensive maintenance guides',
                      'Building partnerships for sustainable development',
                      'Enabling knowledge and resource sharing between schools'
                    ]).map((item, index) => (
                      <Box
                        key={index}
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2
                        }}
                      >
                        <CheckCircleIcon color="primary" sx={{ mr: 2 }} />
                        <Typography variant="body1">{item}</Typography>
                      </Box>
                    ))}
                  </Box>
                 
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={6}>
              <Zoom in={animateElements} timeout={1500}>
                <Box
                  sx={{
                    position: 'relative',
                    height: { xs: '300px', md: '500px' },
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.15)',
                  }}
                >
                  <Box
                    component="img"
                    src={approachContent.image || "/images/mission-image.jpg"}
                    alt={approachContent.imageAlt || "Students using upgraded sanitation facilities"}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                    }}
                  />
                </Box>
              </Zoom>
            </Grid>
          </Grid>
        </Container>
      </Box>


      {/* How It Works - Three-Step Process */}
      <Box sx={{ py: 10, bgcolor: 'white' }}>
        <Container maxWidth="lg">
          <Fade in={animateElements} timeout={1000}>
            <Box sx={{ textAlign: 'center', mb: 6 }}>
              <Typography
                variant="overline"
                sx={{
                  color: theme.palette.primary.main,
                  fontWeight: 'bold',
                  letterSpacing: 2,
                  mb: 1,
                  display: 'block'
                }}
              >
                THE PROCESS
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                {processSteps.title || "How KalinisAralan Works"}
              </Typography>
              <Typography
                variant="body1"
                sx={{
                  maxWidth: '800px',
                  mx: 'auto',
                  color: 'text.secondary',
                  fontSize: '1.1rem',
                }}
              >
                Our initiative improves school sanitation in three simple steps
              </Typography>
            </Box>
          </Fade>


          <Grid container spacing={6}>
            {processSteps.map((step, index) => (
              <Grid item xs={12} md={4} key={step.id || index}>
                <Fade in={animateElements} timeout={1000} style={{ transitionDelay: `${200 * (index + 1)}ms` }}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 4,
                      borderRadius: 4,
                      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      transition: 'transform 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'white',
                        mb: 3,
                        position: 'relative',
                        '&::before': {
                          content: `"${index + 1}"`,
                          position: 'absolute',
                          top: -10,
                          right: -10,
                          width: 30,
                          height: 30,
                          borderRadius: '50%',
                          bgcolor: 'secondary.main',
                          color: 'white',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontWeight: 'bold',
                          fontSize: '1.2rem',
                        }
                      }}
                    >
                      {getIconByType(step.iconType)}
                    </Box>
                    <Typography variant="h4" component="h3" sx={{ mb: 2 }}>
                      {step.title}
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      {step.description}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* Remove the entire school partner projects section and go directly to testimonials */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={testimonial.id || index}>
                <Fade in={animateElements} timeout={1000} style={{ transitionDelay: `${200 * (index + 1)}ms` }}>
                  <Box
                    sx={{
                      textAlign: 'center',
                      p: 3,
                      height: '100%',
                      borderRadius: 4,
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <Box
                      sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        width: 70,
                        height: 70,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        color: 'primary.contrastText',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <FavoriteIcon fontSize="large" />
                    </Box>
                    <Typography variant="body1" sx={{ mb: 3, fontStyle: 'italic' }}>
                      "{testimonial.quote}"
                    </Typography>
                    <Typography
                      variant="h6"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        mb: 1,
                      }}
                    >
                      {testimonial.author}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="text.secondary"
                    >
                      {testimonial.role}
                    </Typography>
                  </Box>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>


      {/* Call to Action */}
      <Box
        sx={{
          py: 10,
          bgcolor: 'primary.main',
          color: 'white',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3)), url("/images/cta-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
          }}
        />
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center" justifyContent="center">
            <Grid item xs={12} md={8} sx={{ textAlign: 'center' }}>
              <Fade in={animateElements} timeout={1000}>
                <Box>
                  <Typography variant="h3" component="h2" sx={{ fontWeight: 'bold', mb: 3 }}>
                    Join Us in Transforming School Sanitation
                  </Typography>
                  <Typography variant="h6" sx={{ mb: 4, maxWidth: '800px', mx: 'auto' }}>
                    Be part of our mission to improve health and education outcomes in Philippine public schools through better sanitation facilities.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={3}
                    justifyContent="center"
                  >
                    <Button
                      variant="outlined"
                      size="large"
                      component="a"
                      href="/contact"
                      sx={{
                        py: 1.5,
                        px: 4,
                        color: 'white',
                        borderColor: 'white',
                        fontWeight: 'bold',
                        '&:hover': {
                          borderColor: 'white',
                          bgcolor: 'rgba(255, 255, 255, 0.1)',
                        }
                      }}
                    >
                      Contact Us
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
}


export default HomePage;