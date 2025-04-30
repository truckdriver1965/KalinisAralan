import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
  Alert,
  useTheme,
} from '@mui/material';
<<<<<<< HEAD
import { projectsApi } from '../services/api';
=======
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Handwashing Stations",
    location: "Outside the gymnasium",
    date: "January 2025",
    status: "Completed",
    beneficiaries: 2000,
    description: "Installation of 15 multi-faucet handwashing stations across 5 schools, benefiting over 2,000 students.",
    image: "/placeholder.jpg",
    category: "Handwashing"
  },
  {
    id: 2,
    title: "Toilet Renovation",
    location: "Every floor",
    date: "March 2025",
    status: "Completed",
    beneficiaries: 1500,
    description: "Complete renovation of toilet facilities in 3 schools, including improved plumbing, privacy features, and accessibility.",
    image: "/placeholder.jpg",
    category: "Toilets"
  },
  {
    id: 3,
    title: "Water System Upgrade",
    location: "Water fountain stations",
    date: "May 2025",
    status: "In Progress",
    progress: 75,
    beneficiaries: 3000,
    description: "Upgrading water supply systems in 4 schools to ensure consistent access to clean water for sanitation.",
    image: "/placeholder.jpg",
    category: "Water Systems"
  }
];
>>>>>>> 8a0e5a6adc90771ae0ce537ebec74ef782c3a08e

function ProjectsPage() {
  const theme = useTheme();
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Scroll to top when component mounts
    window.scrollTo(0, 0);
    
    // Fetch projects data
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      setLoading(true);
      // For development/testing, you can use this mock data if your API isn't ready
      // Comment this out when your real API is ready
      const mockData = [
        {
          id: 1,
          title: 'Clean Water for Mindanao Schools',
          description: 'Providing clean water systems to 15 schools in rural Mindanao, benefiting over 5,000 students.',
          fullDescription: 'This project aims to install water filtration systems in schools across rural Mindanao, where access to clean water is limited. Each system can provide safe drinking water for hundreds of students daily, reducing waterborne illnesses and improving attendance rates.',
          image: '/images/project1.jpg',
          progress: 85,
          goal: 1500000,
          raised: 1275000,
          location: 'Mindanao',
        },
        {
          id: 2,
          title: 'Sanitation Facilities in Visayas',
          description: 'Building modern toilet facilities in 10 schools across the Visayas region to improve hygiene.',
          fullDescription: 'Many schools in the Visayas region lack proper sanitation facilities, forcing students to use inadequate or unhygienic facilities. This project will construct modern toilet blocks with handwashing stations in 10 schools, directly benefiting over 3,000 students.',
          image: '/images/project2.jpg',
          progress: 65,
          goal: 2000000,
          raised: 1300000,
          location: 'Visayas',
        },
        {
          id: 3,
          title: 'Hygiene Education Program',
          description: 'Teaching proper hygiene practices to students and teachers in 25 schools throughout Luzon.',
          fullDescription: 'This comprehensive education program focuses on teaching proper handwashing techniques, personal hygiene, and sanitation practices to both students and teachers. The program includes workshops, educational materials, and follow-up assessments to ensure lasting behavioral change.',
          image: '/images/project3.jpg',
          progress: 100,
          goal: 800000,
          raised: 800000,
          location: 'Luzon',
        },
      ];
      
      setProjects(mockData);
      
      // Uncomment this when your API is ready
      // const data = await projectsApi.getAll();
      // setProjects(data);
      
      setLoading(false);
    } catch (err) {
      console.error('Error fetching projects:', err);
      setError('Failed to load projects. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '60vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Container maxWidth="lg" sx={{ my: 8 }}>
        <Alert severity="error" sx={{ mb: 4 }}>{error}</Alert>
        <Button variant="contained" onClick={fetchProjects}>Try Again</Button>
      </Container>
    );
  }

  return (
<<<<<<< HEAD
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
            Our Projects
          </Typography>
          <Typography
            variant="h5"
            sx={{ maxWidth: '800px' }}
          >
            Explore our ongoing and completed initiatives to improve water and sanitation facilities in schools across the Philippines.
          </Typography>
        </Container>
=======
    <Container>
      <Typography variant="h3" component="h1" color="primary" gutterBottom align="center">
        Our Projects
      </Typography>
      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        Transforming sanitation facilities in Baliwag North Central School
      </Typography>
      
      {/* Project Filters */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          variant="fullWidth"
        >
          <Tab label="All Projects" />
          <Tab label="Completed" />
          <Tab label="In Progress" />
          <Tab label="Planned" />
        </Tabs>
>>>>>>> 8a0e5a6adc90771ae0ce537ebec74ef782c3a08e
      </Box>

      {/* Projects List */}
      <Container maxWidth="lg" sx={{ mb: 8 }}>
        <Grid container spacing={4}>
          {projects.map((project) => (
            <Grid item xs={12} md={6} lg={4} key={project.id}>
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
                  height="200"
                  image={project.image}
                  alt={project.title}
                />
                <CardContent sx={{ flexGrow: 1, p: 3 }}>
                  <Typography variant="h5" component="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                    {project.title}
                  </Typography>
                  <Typography variant="body1" paragraph>
                    {project.description}
                  </Typography>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="body2" color="text.secondary">
                      Progress: {project.progress}%
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Location: {project.location}
                    </Typography>
                  </Box>
                  <Box sx={{ mt: 1, width: '100%', bgcolor: 'background.paper', borderRadius: 1, height: 8 }}>
                    <Box
                      sx={{
                        width: `${project.progress}%`,
                        bgcolor: 'primary.main',
                        height: '100%',
                        borderRadius: 1,
                      }}
                    />
                  </Box>
                  <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="body2" color="text.secondary">
                      ₱{project.raised.toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ₱{project.goal.toLocaleString()}
                    </Typography>
                  </Box>
                  <Button 
                    variant="contained" 
                    fullWidth 
                    sx={{ mt: 3 }}
                    component="a"
                    href={`/donate?project=${project.id}`}
                  >
                    Support This Project
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default ProjectsPage;