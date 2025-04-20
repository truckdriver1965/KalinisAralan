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
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  TextField,
  InputAdornment,
  IconButton
} from '@mui/material';
import ArticleIcon from '@mui/icons-material/Article';
import VideoLibraryIcon from '@mui/icons-material/VideoLibrary';
import PictureAsPdfIcon from '@mui/icons-material/PictureAsPdf';
import DownloadIcon from '@mui/icons-material/Download';
import SearchIcon from '@mui/icons-material/Search';
import SchoolIcon from '@mui/icons-material/School';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import EngineeringIcon from '@mui/icons-material/Engineering';

function ResourcesPage() {
  const [tabValue, setTabValue] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };
  
  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };
  
  // Sample resources data
  const resources = {
    educational: [
      {
        id: 1,
        title: "Proper Handwashing Techniques",
        type: "PDF Guide",
        description: "A comprehensive guide on proper handwashing techniques for students and teachers.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <PictureAsPdfIcon color="error" />
      },
      {
        id: 2,
        title: "Sanitation and Health Curriculum",
        type: "Lesson Plans",
        description: "A series of lesson plans for teachers to educate students about the importance of sanitation.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <ArticleIcon color="primary" />
      },
      {
        id: 3,
        title: "Hygiene Education Video Series",
        type: "Video",
        description: "Engaging videos teaching students about personal hygiene and sanitation practices.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <VideoLibraryIcon color="secondary" />
      },
      {
        id: 4,
        title: "School Sanitation Assessment Tool",
        type: "Interactive Tool",
        description: "A tool for school administrators to assess their current sanitation facilities and identify areas for improvement.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <SchoolIcon color="primary" />
      }
    ],
    technical: [
      {
        id: 5,
        title: "Handwashing Station Design Guide",
        type: "Technical Manual",
        description: "Detailed specifications and designs for building cost-effective handwashing stations.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <EngineeringIcon color="warning" />
      },
      {
        id: 6,
        title: "Toilet Facility Construction Manual",
        type: "Construction Guide",
        description: "Step-by-step instructions for constructing durable and accessible toilet facilities.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <PictureAsPdfIcon color="error" />
      },
      {
        id: 7,
        title: "Water System Maintenance Guide",
        type: "Maintenance Manual",
        description: "Guidelines for maintaining water systems to ensure clean water supply for sanitation.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <ArticleIcon color="primary" />
      },
      {
        id: 8,
        title: "Sustainable Sanitation Solutions",
        type: "Case Studies",
        description: "Examples of successful sustainable sanitation solutions implemented in various schools.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <PictureAsPdfIcon color="error" />
      }
    ],
    health: [
      {
        id: 9,
        title: "Sanitation-Related Disease Prevention",
        type: "Health Guide",
        description: "Information on preventing diseases related to poor sanitation in school environments.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <LocalHospitalIcon color="error" />
      },
      {
        id: 10,
        title: "Menstrual Hygiene Management",
        type: "Educational Material",
        description: "Resources for schools to support menstrual hygiene management for female students.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <ArticleIcon color="primary" />
      },
      {
        id: 11,
        title: "Clean Hands, Healthy Students",
        type: "Poster Series",
        description: "Printable posters promoting handwashing and hygiene practices for school display.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <PictureAsPdfIcon color="error" />
      },
      {
        id: 12,
        title: "School Health Assessment Toolkit",
        type: "Assessment Tool",
        description: "Tools for evaluating the health impact of sanitation improvements in schools.",
        thumbnail: "/placeholder.jpg",
        downloadLink: "#",
        icon: <LocalHospitalIcon color="error" />
      }
    ]
  };
  
  // Filter resources based on search query
  const getFilteredResources = () => {
    const categoryResources = tabValue === 0 
      ? [...resources.educational, ...resources.technical, ...resources.health]
      : tabValue === 1 
        ? resources.educational 
        : tabValue === 2 
          ? resources.technical
          : resources.health;
          
    if (!searchQuery) return categoryResources;
    
    return categoryResources.filter(resource => 
      resource.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
      resource.type.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };
  
  const filteredResources = getFilteredResources();

  return (
    <Container>
      <Typography variant="h3" component="h1" color="primary" gutterBottom align="center">
        Resources
      </Typography>
      <Typography variant="h6" paragraph align="center" sx={{ mb: 4 }}>
        Educational materials, technical guides, and health resources for school sanitation
      </Typography>
      
      {/* Search Bar */}
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          placeholder="Search resources..."
          value={searchQuery}
          onChange={handleSearchChange}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />
      </Box>
      
      {/* Resource Categories */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 4 }}>
        <Tabs 
          value={tabValue} 
          onChange={handleTabChange} 
          centered
          variant="fullWidth"
        >
          <Tab label="All Resources" />
          <Tab label="Educational Materials" />
          <Tab label="Technical Guides" />
          <Tab label="Health Resources" />
        </Tabs>
      </Box>
      
      {/* Resource Cards */}
      {filteredResources.length > 0 ? (
        <Grid container spacing={3}>
          {filteredResources.map((resource) => (
            <Grid item xs={12} sm={6} md={4} key={resource.id}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                  component="img"
                  height="140"
                  image={resource.thumbnail}
                  alt={resource.title}
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    {resource.icon}
                    <Typography variant="caption" color="text.secondary" sx={{ ml: 1 }}>
                      {resource.type}
                    </Typography>
                  </Box>
                  <Typography gutterBottom variant="h6" component="h3">
                    {resource.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" paragraph>
                    {resource.description}
                  </Typography>
                  <Button 
                    variant="outlined" 
                    size="small" 
                    startIcon={<DownloadIcon />}
                    href={resource.downloadLink}
                  >
                    Download
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography variant="h6" color="text.secondary">
            No resources found matching your search.
          </Typography>
        </Box>
      )}
      
      {/* Featured Resources Section */}
      <Box sx={{ mt: 6, mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Featured Resources
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <List>
          <ListItem>
            <ListItemIcon>
              <ArticleIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="School Sanitation Guidelines for the Philippines" 
              secondary="Comprehensive guidelines aligned with Department of Education standards"
            />
            <Button variant="text" endIcon={<DownloadIcon />}>
              Download
            </Button>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <VideoLibraryIcon color="secondary" />
            </ListItemIcon>
            <ListItemText 
              primary="Sanitation Success Stories: Video Series" 
              secondary="Inspiring stories from schools that have transformed their sanitation facilities"
            />
            <Button variant="text" endIcon={<DownloadIcon />}>
              Watch
            </Button>
          </ListItem>
          <ListItem>
            <ListItemIcon>
              <PictureAsPdfIcon color="error" />
            </ListItemIcon>
            <ListItemText 
              primary="Funding Guide for School Sanitation Projects" 
              secondary="Resources for schools seeking funding for sanitation improvements"
            />
            <Button variant="text" endIcon={<DownloadIcon />}>
              Download
            </Button>
          </ListItem>
        </List>
      </Box>
      
      {/* Request Resources Section */}
      <Box sx={{ bgcolor: 'primary.light', p: 4, borderRadius: 2, mt: 4 }}>
        <Typography variant="h5" gutterBottom align="center">
          Need specific resources?
        </Typography>
        <Typography variant="body1" paragraph align="center">
          If you can't find what you're looking for, please contact us. We're happy to help!
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
          <Button variant="contained" color="primary" href="/contact">
            Request Resources
          </Button>
        </Box>
      </Box>
    </Container>
  );
}

export default ResourcesPage;