import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Avatar,
  Divider,
  CircularProgress
} from '@mui/material';
import { aboutApi } from '../services/api';

function AboutPage() {
  const [aboutContent, setAboutContent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await aboutApi.getAboutContent();
        setAboutContent(response.data);
      } catch (err) {
        console.error('Error fetching about content:', err);
        setError('Failed to load content');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

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
    <Container sx={{ pt: 4 }}> {/* Add top padding to container */}
      {/* Mission and Vision Section */}
      <Box sx={{ mb: 4 }}>
        <Typography variant="h3" component="h1" color="primary" gutterBottom align="center" sx={{ mt: 2 }}>
          {aboutContent.header.title}
        </Typography>
        <Typography variant="h5" paragraph align="center" sx={{ mb: 4 }}>
          {aboutContent.header.subtitle}
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
                  {aboutContent.mission.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {aboutContent.mission.description}
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
                  {aboutContent.vision.title}
                </Typography>
                <Typography variant="body1" paragraph>
                  {aboutContent.vision.description}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Box>

      {/* Our Story Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          {aboutContent.story.title}
        </Typography>
        {aboutContent.story.paragraphs.map((paragraph, index) => (
          <Typography key={index} variant="body1" paragraph>
            {paragraph}
          </Typography>
        ))}
      </Box>

      {/* Our Approach Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          {aboutContent.approach.title}
        </Typography>
        <Grid container spacing={3}>
          {aboutContent.approach.strategies.map((strategy, index) => (
            <Grid item xs={12} md={4} key={index}>
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
                    {strategy.title}
                  </Typography>
                  <Typography variant="body2">
                    {strategy.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>

      {/* Our Team Section */}
      <Box sx={{ mb: 6 }}>
        <Typography variant="h4" component="h2" color="primary" gutterBottom>
          {aboutContent.team.title}
        </Typography>
        <Typography variant="body1" paragraph sx={{ mb: 4 }}>
          {aboutContent.team.description}
        </Typography>
        
        <Grid container spacing={4} justifyContent="center">
          {aboutContent.team.members.map((member, index) => (
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
    </Container>
  );
}

export default AboutPage;