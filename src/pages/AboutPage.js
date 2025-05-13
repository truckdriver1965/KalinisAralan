import React from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Divider
} from '@mui/material';

function AboutPage() {
  return (
    <Container>
      {/* Mission and Vision Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom align="center">
          About KalinisAralan
        </Typography>
        <Typography variant="h5" paragraph align="center" sx={{ mb: 4 }}>
          Showcasing Effective School Sanitation Practices
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography variant="h5" component="h2" color="primary" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  KalinisAralan aims to document and share effective school sanitation practices through our partner school, 
                  while enabling support mechanisms for other public schools across the Philippines to implement similar systems.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ 
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography variant="h5" component="h2" color="primary" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  We envision a network of Philippine public schools implementing effective sanitation practices through 
                  knowledge sharing and mutual support, creating healthier learning environments for all students.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Story
        </Typography>
        <Typography variant="body1" paragraph>
          In 2025, KalinisAralan was established as a collaborative project with our partner school, 
          Baliwag North Central School, to document their effective sanitation practices and create a platform 
          that enables both knowledge sharing and support mechanisms for other public schools.
        </Typography>
        <Typography variant="body1" paragraph>
          Through our documentation work and support initiatives, we aim to create a comprehensive digital platform 
          that not only highlights successful practices but also facilitates partnerships and resources 
          to help other schools improve their facilities.
        </Typography>
      </Box>

      {/* Our Approach Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Approach
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Documentation & Support
                </Typography>
                <Typography variant="body2">
                  We thoroughly document our partner school's practices while identifying opportunities 
                  for support and collaboration between schools to improve sanitation facilities.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Digital Platform
                </Typography>
                <Typography variant="body2">
                  Our platform serves as both a knowledge hub and a connection point, enabling schools 
                  to learn from successful practices and access support for implementation.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ 
              height: '100%',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
              borderRadius: '16px',
              transition: 'transform 0.3s ease',
              '&:hover': {
                transform: 'translateY(-5px)'
              }
            }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Community Building
                </Typography>
                <Typography variant="body2">
                  We facilitate knowledge sharing and support networks between schools, creating a 
                  community committed to improving sanitation standards through collaboration.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Our Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Team
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          Meet the dedicated team behind KalinisAralan's mission to document and share 
          effective school sanitation practices.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: 'Jade Lloyd de Lara', position: 'Full-Stack Developer', image: '/images/jade.jpg' },
            { name: 'Sean Kelly Jordan', position: 'Front-End Developer', image: '/images/sean.png' },
            { name: 'John Rafael Villacorte', position: 'Back-End Developer', image: '/images/john.jpg' }
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ 
                height: '100%', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                p: 2,
                boxShadow: '0 4px 20px rgba(0, 0, 0, 0.1)',
                borderRadius: '16px',
                transition: 'transform 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-5px)'
                }
              }}>
                <Avatar 
                  sx={{ width: 120, height: 120, mb: 2 }}
                  alt={member.name}
                  src={member.image}
                />
                <Typography variant="h6" component="h3" align="center">
                  {member.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" align="center">
                  {member.position}
                </Typography>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Partner School Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Partner School
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          We are proud to collaborate with Baliwag North Central School in documenting and sharing 
          effective school sanitation practices, while building partnerships to support other schools 
          in implementing similar improvements.
        </Typography>
      </Box>
    </Container>
  );
}

export default AboutPage;