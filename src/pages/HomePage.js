import React, { useEffect } from 'react';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
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

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animateElements, setAnimateElements] = React.useState(false);
  
  useEffect(() => {
    setAnimateElements(true);
    
    window.scrollTo(0, 0);
  }, []);

  const featuredProjects = [
    {
      title: 'Effective Sanitation Practices',
      description: 'Documenting and sharing successful sanitation practices while enabling support for facility improvements.',
      image: '/images/project1.jpg',
      progress: 85,
    },
    {
      title: 'Hygiene Education Program',
      description: 'Comprehensive hygiene education initiatives combined with facility enhancement support.',
      image: '/images/project2.jpg',
      progress: 65,
    },
    {
      title: 'Maintenance Best Practices',
      description: 'Sharing maintenance strategies while facilitating partnerships for sustainable facility management.',
      image: '/images/project3.jpg',
      progress: 100,
    },
  ];

  const testimonials = [
    {
      quote: "With KalinisAralan's help, we've installed proper toilets and handwashing stations. Absenteeism has dropped by 30% since the facilities were completed.",
      author: "Maria Santos",
      role: "School Principal, Partner School",
      image: "/images/testimonial1.jpg"
    },
    {
      quote: "The sanitation project has transformed our school environment. Our students now have dignity and privacy when using school facilities.",
      author: "Juan Reyes",
      role: "Teacher, Partner School",
      image: "/images/testimonial2.jpg"
    },
    {
      quote: "As a student, I'm happy that we now have clean toilets and places to wash our hands. I don't worry about getting sick anymore.",
      author: "Elena Magsaysay",
      role: "Student, Partner School",
      image: "/images/testimonial3.jpg"
    }
  ];

  const sdgGoals = [
    {
      title: "Clean Water & Sanitation",
      description: "SDG 6: Ensuring availability and sustainable management of water and sanitation for all",
      icon: <WaterIcon fontSize="large" />,
      color: "#26bde2"
    },
    {
      title: "Good Health & Well-being",
      description: "SDG 3: Ensuring healthy lives and promoting well-being for all at all ages",
      icon: <MedicalServicesIcon fontSize="large" />,
      color: "#4c9f38"
    },
    {
      title: "Quality Education",
      description: "SDG 4: Ensuring inclusive and equitable quality education for all",
      icon: <MenuBookIcon fontSize="large" />,
      color: "#c5192d"
    }
  ];

  return (
    <Box>
      <Box
        sx={{
          position: 'relative',
          height: { xs: '90vh', md: '85vh' },
          display: 'flex',
          alignItems: 'center',
          overflow: 'hidden',
          bgcolor: 'black',
        }}
      >
        <Box
          sx={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundImage: 'linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.7)), url("/images/hero-bg.jpg")',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            zIndex: 0,
            animation: 'zoomEffect 20s infinite alternate',
            '@keyframes zoomEffect': {
              '0%': { transform: 'scale(1)' },
              '100%': { transform: 'scale(1.1)' }
            }
          }}
        />
        
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7}>
              <Fade in={true} timeout={1000}>
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
                    IMPROVING SCHOOL SANITATION
                  </Typography>
                  <Typography
                    component="h1"
                    variant="h2"
                    sx={{ 
                      color: 'white',
                      fontWeight: 'bold',
                      mb: 2,
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      lineHeight: 1.2
                    }}
                  >
                    Transforming School Sanitation in the Philippines
                  </Typography>
                  <Typography
                    variant="h6"
                    sx={{ 
                      color: 'rgba(255, 255, 255, 0.8)',
                      mb: 4,
                      maxWidth: '600px',
                      lineHeight: 1.6
                    }}
                  >
                    KalinisAralan documents and shares our partner school's successful sanitation practices while enabling support for more schools to implement better facilities for their students.
                  </Typography>
                  <Stack
                    direction={{ xs: 'column', sm: 'row' }}
                    spacing={2}
                  >
                    <Button
                      variant="contained"
                      color="primary"
                      size="large"
                      component="a"
                      href="/donate"
                      sx={{
                        py: 1.5,
                        px: 4,
                        fontWeight: 'bold',
                      }}
                    >
                      Support Our Cause
                    </Button>
                    <Button
                      variant="outlined"
                      size="large"
                      component="a"
                      href="/projects"
                      sx={{
                        py: 1.5,
                        px: 4,
                        color: 'white',
                        borderColor: 'white',
                        '&:hover': {
                          borderColor: theme.palette.primary.main,
                          backgroundColor: 'rgba(255, 255, 255, 0.05)',
                        }
                      }}
                    >
                      View Best Practices
                    </Button>
                  </Stack>
                </Box>
              </Fade>
            </Grid>
            <Grid item xs={12} md={5} sx={{ display: { xs: 'none', md: 'block' } }}>
              <Zoom in={true} timeout={1500} style={{ transitionDelay: '500ms' }}>
                <Box
                  sx={{
                    position: 'relative',
                    height: '400px',
                    width: '100%',
                    borderRadius: '20px',
                    overflow: 'hidden',
                    boxShadow: '0 20px 40px rgba(0, 0, 0, 0.4)',
                    border: '5px solid rgba(255, 255, 255, 0.1)',
                  }}
                >
                  <Box
                    component="img"
                    src="/images/children-water.jpg"
                    alt="Students using new handwashing facilities"
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
              <Grid item xs={12} md={4} key={index}>
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
                      {goal.icon}
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
                    OUR APPROACH
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
                    Creating Model School Sanitation
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
                    KalinisAralan combines documentation of effective sanitation practices with a platform for support, creating a sustainable model that both shares knowledge and enables improvement of facilities across Philippine public schools.
                  </Typography>
                
                  <Box sx={{ mb: 4 }}>
                    {[
                      'Documenting and sharing effective sanitation practices',
                      'Facilitating support for facility improvements',
                      'Creating comprehensive maintenance guides',
                      'Building partnerships for sustainable development',
                      'Enabling knowledge and resource sharing between schools'
                    ].map((item, index) => (
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
                  
                  <Button
                    variant="contained"
                    color="primary"
                    component="a"
                    href="/our-approach"
                    endIcon={<ArrowForwardIcon />}
                    sx={{
                      py: 1.5,
                      px: 4,
                      fontWeight: 'bold',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateX(5px)',
                      }
                    }}
                  >
                    Learn More About Our Approach
                  </Button>
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
                    src="/images/mission-image.jpg"
                    alt="Students using upgraded sanitation facilities"
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
                How KalinisAralan Works
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
            {[
              {
                title: "Document",
                description: "We document successful sanitation practices while identifying areas for improvement and support.",
                icon: <HandshakeIcon fontSize="large" />
              },
              {
                title: "Connect",
                description: "We connect schools with resources and support to enhance their sanitation facilities.",
                icon: <WaterIcon fontSize="large" />
              },
              {
                title: "Share",
                description: "We share best practices and success stories to inspire and guide other public schools.",
                icon: <CheckCircleIcon fontSize="large" />
              }
            ].map((step, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                      {step.icon}
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
                OUR PROJECTS
              </Typography>
              <Typography
                variant="h3"
                component="h2"
                sx={{ 
                  fontWeight: 'bold',
                  mb: 2,
                }}
              >
                Featured Initiatives
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
                Explore our ongoing and completed sanitation projects at our partner school
              </Typography>
            </Box>
          </Fade>

          <Grid container spacing={4}>
            {featuredProjects.map((project, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Fade in={animateElements} timeout={1000} style={{ transitionDelay: `${200 * (index + 1)}ms` }}>
                  <Card 
                    sx={{ 
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-10px)',
                        boxShadow: '0 15px 30px rgba(0, 0, 0, 0.1)',
                      }
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image={project.image}
                      alt={project.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Typography variant="h5" component="h3" gutterBottom>
                        {project.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" paragraph>
                        {project.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Fade>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
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
                      variant="contained"
                      size="large"
                      component="a"
                      href="/get-involved"
                      sx={{
                        py: 1.5,
                        px: 4,
                        bgcolor: 'white',
                        color: 'primary.main',
                        fontWeight: 'bold',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.9)',
                        }
                      }}
                    >
                      Get Involved
                    </Button>
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