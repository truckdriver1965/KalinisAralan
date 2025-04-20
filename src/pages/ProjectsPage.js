import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  CardMedia, 
  Button,
  Tabs,
  Tab,
  Chip,
  LinearProgress,
  Divider
} from '@mui/material';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import PeopleIcon from '@mui/icons-material/People';

// Sample project data
const projects = [
  {
    id: 1,
    title: "Handwashing Stations in Quezon Province",
    location: "Quezon Province",
    date: "January 2023",
    status: "Completed",
    beneficiaries: 2000,
    description: "Installation of 15 multi-faucet handwashing stations across 5 schools, benefiting over 2,000 students.",
    image: "/placeholder.jpg",
    category: "Handwashing"
  },
  {
    id: 2,
    title: "Toilet Renovation in Cebu Schools",
    location: "Cebu",
    date: "March 2023",
    status: "Completed",
    beneficiaries: 1500,
    description: "Complete renovation of toilet facilities in 3 schools, including improved plumbing, privacy features, and accessibility.",
    image: "/placeholder.jpg",
    category: "Toilets"
  },
  {
    id: 3,
    title: "Water System Upgrade in Davao",
    location: "Davao",
    date: "May 2023",
    status: "In Progress",
    progress: 75,
    beneficiaries: 3000,
    description: "Upgrading water supply systems in 4 schools to ensure consistent access to clean water for sanitation.",
    image: "/placeholder.jpg",
    category: "Water Systems"
  },
  {
    id: 4,
    title: "Hygiene Education Program in Iloilo",
    location: "Iloilo",
    date: "June 2023",
    status: "In Progress",
    progress: 50,
    beneficiaries: 5000,
    description: "Comprehensive hygiene education program reaching 10 schools, teaching proper handwashing techniques and sanitation practices.",
    image: "/placeholder.jpg",
    category: "Education"
  },
  {
    id: 5,
    title: "Sustainable Toilets in Batangas",
    location: "Batangas",
    date: "August 2023",
    status: "Planned",
    beneficiaries: 1200,
    description: "Installation of environmentally sustainable toilet facilities in 2 rural schools with limited water access.",
    image: "/placeholder.jpg",
    category: "Toilets"
  },
  {
    id: 6,
    title: "School Sanitation Assessment in Pampanga",
    location: "Pampanga",
    date: "September 2023",
    status: "Planned",
    beneficiaries: 4000,
    description: "Comprehensive assessment of sanitation needs in 15 schools to prioritize future interventions.",
    image: "/placeholder.jpg",
    category: "Assessment"
  }
];

function ProjectsPage() {
  const [tabValue, setTabValue] = useState(0);
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  // Filter projects based on selected tab
  const filteredProjects = tabValue === 0 
    ? projects 
    : tabValue === 1 
      ? projects.filter(project => project.status === "Completed") 
      : tabValue === 2 
        ? projects.filter(project => project.status === "In Progress")
        : projects.filter(project => project.status === "Planned");

  return (
    <Container>
      <Typography variant="h3" component="h1" color="primary" gutterBottom align="center">
        Our Projects
      </Typography>
      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        Transforming sanitation facilities in schools across the Philippines
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
      </Box>
      
      {/* Project Cards */}
      <Grid container spacing={4}>
        {filteredProjects.map((project) => (
          <Grid item xs={12} md={6} key={project.id}>
            <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardMedia
                component="img"
                height="200"
                image={project.image}
                alt={project.title}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                  <Typography gutterBottom variant="h5" component="h2">
                    {project.title}
                  </Typography>
                  <Chip 
                    label={project.status} 
                    color={
                      project.status === "Completed" ? "success" : 
                      project.status === "In Progress" ? "primary" : 
                      "default"
                    }
                    size="small"
                  />
                </Box>
                
                {project.status === "In Progress" && (
                  <Box sx={{ mb: 2 }}>
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Progress: {project.progress}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={project.progress} 
                      sx={{ height: 8, borderRadius: 5 }}
                    />
                  </Box>
                )}
                
                <Typography variant="body2" color="text.secondary" paragraph>
                  {project.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <LocationOnIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {project.location}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <CalendarTodayIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {project.date}
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <PeopleIcon fontSize="small" color="action" sx={{ mr: 0.5 }} />
                    <Typography variant="body2" color="text.secondary">
                      {project.beneficiaries.toLocaleString()} beneficiaries
                    </Typography>
                  </Box>
                </Box>
                
                <Divider sx={{ my: 2 }} />
                
                <Button size="small" color="primary">
                  View Details
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      {/* No Projects Message */}
      {filteredProjects.length === 0 && (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No projects found in this category.
          </Typography>
        </Box>
      )}
      
      {/* Get Involved Section */}
      <Box sx={{ bgcolor: 'primary.light', p: 4, borderRadius: 2, mt: 6 }}>
        <Typography variant="h5" gutterBottom align="center">
          Want to support our projects?
        </Typography>
        <Typography variant="body1" paragraph align="center">
          We welcome donations, partnerships, and volunteer support to help us reach more schools.
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" href="/donate">
            Donate Now
          </Button>
          <Button variant="outlined" color="primary" href="/contact">
            Contact Us
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ProjectsPage;