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
          Transforming School Sanitation Across the Philippines
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 2 }}>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" color="primary" gutterBottom>
                  Our Mission
                </Typography>
                <Typography variant="body1" paragraph>
                  KalinisAralan aims to improve the health and educational outcomes of Filipino students 
                  by providing clean, accessible, and sustainable sanitation facilities in schools 
                  across the Philippines.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h5" component="h2" color="primary" gutterBottom>
                  Our Vision
                </Typography>
                <Typography variant="body1" paragraph>
                  We envision a Philippines where every student has access to clean, safe, and 
                  dignified sanitation facilities, contributing to improved health, increased 
                  school attendance, and better learning outcomes.
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
          KalinisAralan was founded in 2020 by a group of educators, public health professionals, 
          and community development workers who recognized the critical link between proper 
          sanitation facilities and educational outcomes in Philippine schools.
        </Typography>
        <Typography variant="body1" paragraph>
          After visiting numerous schools across the country and witnessing firsthand the 
          inadequate toilet facilities and handwashing stations, our founders committed to 
          addressing this often-overlooked aspect of educational infrastructure.
        </Typography>
        <Typography variant="body1" paragraph>
          Starting with just three pilot schools in Metro Manila, our initiative has now 
          expanded to multiple regions, impacting thousands of students through improved 
          sanitation facilities and hygiene education programs.
        </Typography>
      </Box>

      {/* Our Approach Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Approach
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Community-Led
                </Typography>
                <Typography variant="body2">
                  We work closely with school administrators, teachers, parents, and students 
                  to ensure our solutions meet the specific needs of each community and are 
                  culturally appropriate.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Sustainable Design
                </Typography>
                <Typography variant="body2">
                  Our facilities are designed with sustainability in mind, using locally 
                  available materials and technologies that can be maintained by the school 
                  community with minimal external support.
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  Education & Training
                </Typography>
                <Typography variant="body2">
                  We provide comprehensive hygiene education and facility maintenance 
                  training to ensure the long-term impact and sustainability of our 
                  interventions.
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
          KalinisAralan is powered by a dedicated team of professionals from diverse backgrounds, 
          all united by a common passion for improving educational environments in the Philippines.
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {[
            { name: 'Jade Lloyd de Lara', position: 'Full-Stack Developer', image: '/images/jade.jpg' },
            { name: 'Sean Kelly Jordan', position: 'Front-End Developer', image: '/images/sean.png' },
            { name: 'John Rafael Villacorte', position: 'Back-End Developer', image: '/images/john.jpg' }
          ].map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', p: 2 }}>
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

      {/* Our Partners Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          Our Partners
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          We collaborate with a wide range of organizations to maximize our impact and reach.
        </Typography>
        
        <Grid container spacing={3}>
          {[1, 2, 3, 4, 5, 6].map((item) => (
            <Grid item xs={6} sm={4} md={2} key={item}>
              <Box 
                sx={{ 
                  height: 100, 
                  display: 'flex', 
                  alignItems: 'center', 
                  justifyContent: 'center',
                  border: '1px solid #eee',
                  borderRadius: 1,
                  p: 2
                }}
              >
                <Typography variant="body2" align="center">
                  Partner Logo {item}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}

export default AboutPage;
