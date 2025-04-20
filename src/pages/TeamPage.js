import React, { useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Fade,
  useTheme
} from '@mui/material';

function TeamPage() {
  const theme = useTheme();
  
  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
  }, []);

  // Team members data
  const teamMembers = [
    {
      name: "Jade de Lara",
      role: "Team Member",
      bio: "Jade is passionate about improving educational facilities in underserved communities.",
      image: "/images/team/jade.jpg" // Replace with actual image path
    },
    {
      name: "Rafael Villacorte",
      role: "Team Member",
      bio: "Rafael brings expertise in sustainable water systems and community engagement.",
      image: "/images/team/rafael.jpg" // Replace with actual image path
    },
    {
      name: "Sean Jordan",
      role: "Team Member",
      bio: "Sean focuses on project management and building partnerships with schools and communities.",
      image: "/images/team/sean.jpg" // Replace with actual image path
    }
  ];

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          bgcolor: 'primary.main',
          color: 'white',
          py: 8,
          mb: 6
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            component="h1"
            sx={{ 
              fontWeight: 'bold',
              mb: 2
            }}
          >
            Our Team
          </Typography>
          <Typography
            variant="h5"
            sx={{ maxWidth: '800px' }}
          >
            Meet the dedicated individuals behind KalinisAralan's mission to provide clean water and sanitation to schools across the Philippines.
          </Typography>
        </Container>
      </Box>

      {/* Team Members Section */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {teamMembers.map((member, index) => (
            <Grid item xs={12} md={4} key={index}>
              <Fade in={true} timeout={1000} style={{ transitionDelay: `${index * 200}ms` }}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2,
                    overflow: 'hidden',
                    boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
                    transition: 'transform 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-10px)'
                    }
                  }}
                >
                  <CardMedia
                    component="img"
                    height="300"
                    image={member.image}
                    alt={member.name}
                    sx={{ objectFit: 'cover' }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                      {member.name}
                    </Typography>
                    <Typography variant="subtitle1" color="primary.main" gutterBottom>
                      {member.role}
                    </Typography>
                    <Divider sx={{ my: 2 }} />
                    <Typography variant="body1">
                      {member.bio}
                    </Typography>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default TeamPage;