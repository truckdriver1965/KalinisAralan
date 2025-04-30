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
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import WaterIcon from '@mui/icons-material/Water';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import PeopleIcon from '@mui/icons-material/People';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';

function HomePage() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [animateElements, setAnimateElements] = React.useState(false);
  
  useEffect(() => {
    setAnimateElements(true);
    
    window.scrollTo(0, 0);
  }, []);

  const stats = [
    { number: '50+', label: 'Schools Served', icon: <SchoolIcon fontSize="large" /> },
    { number: '25,000+', label: 'Students Impacted', icon: <PeopleIcon fontSize="large" /> },
    { number: '200+', label: 'Sanitation Facilities', icon: <WaterIcon fontSize="large" /> },
    { number: '₱5M+', label: 'Funds Raised', icon: <VolunteerActivismIcon fontSize="large" /> },
  ];

  const featuredProjects = [
    {
      title: 'Clean Water for Mindanao Schools',
      description: 'Providing clean water systems to 15 schools in rural Mindanao, benefiting over 5,000 students.',
      image: '/images/project1.jpg',
      progress: 85,
    },
    {
      title: 'Sanitation Facilities in Visayas',
      description: 'Building modern toilet facilities in 10 schools across the Visayas region to improve hygiene.',
      image: '/images/project2.jpg',
      progress: 65,
    },
    {
      title: 'Hygiene Education Program',
      description: 'Teaching proper hygiene practices to students and teachers in 25 schools throughout Luzon.',
      image: '/images/project3.jpg',
      progress: 100,
    },
  ];

  const testimonials = [
    {
      quote: "The new facilities have made a huge difference in our school. Students are healthier and attendance has improved significantly.",
      author: "Maria Santos",
      role: "School Principal, Cebu City",
      image: "/images/testimonial1.jpg"
    },
    {
      quote: "KalinisAralan's work has transformed our learning environment. Our students now have access to clean water throughout the school day.",
      author: "Juan Reyes",
      role: "Teacher, Davao Elementary School",
      image: "/images/testimonial2.jpg"
    },
    {
      quote: "As a parent, I'm grateful for the improved facilities. My children are healthier and more eager to attend school.",
      author: "Elena Magsaysay",
      role: "Parent, Manila",
      image: "/images/testimonial3.jpg"
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
                    TRANSFORMING SCHOOL SANITATION
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
                    Clean Water & Sanitation for Philippine Schools
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
                    We're on a mission to provide clean water and improved sanitation facilities to schools across the Philippines, creating healthier learning environments for students.
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
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-5px)',
                          boxShadow: '0 10px 20px rgba(242, 169, 0, 0.4)',
                        }
                      }}
                    >
                      Donate Now
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
                      Our Projects
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
                    alt="Happy children with clean water"
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

      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Fade in={animateElements} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
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
                      {stat.icon}
                    </Box>
                    <Typography
                      variant="h3"
                      component="div"
                      sx={{
                        fontWeight: 'bold',
                        color: 'primary.main',
                        mb: 1,
                      }}
                    >
                      {stat.number}
                    </Typography>
                    <Typography
                      variant="h6"
                      color="text.secondary"
                    >
                      {stat.label}
                    </Typography>
                  </Box>
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
                    OUR MISSION
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
                    Creating Healthier Learning Environments
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
                    At KalinisAralan, we believe that every student deserves access to clean water and proper sanitation facilities. Our mission is to transform school environments across the Philippines, particularly in underserved communities, by providing sustainable water and sanitation solutions.
                  </Typography>
                  
                  <Box sx={{ mb: 4 }}>
                    {[
                      'Improving access to clean water in schools',
                      'Building and renovating sanitation facilities',
                      'Providing hygiene education to students and teachers',
                      'Creating sustainable maintenance programs'
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
                    href="/about"
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
                    Learn More About Us
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
                    alt="Students using clean water facilities"
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
                Explore some of our ongoing and completed projects across the Philippines
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
    </Box>
  );
}

export default HomePage;