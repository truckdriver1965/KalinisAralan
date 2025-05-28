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
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { practicesApi } from '../services/api';

const categories = ['Education', 'Management', 'Maintenance', 'Community'];

function ProjectsPage() {
  const theme = useTheme();
  const [practices, setPractices] = useState([]);
  const [videos, setVideos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [selectedProject, setSelectedProject] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setLoading(true);
      const [practicesRes, videosRes] = await Promise.all([
        practicesApi.getAll(),
        practicesApi.getVideos()
      ]);
      setPractices(practicesRes.data);
      setVideos(videosRes.data);
      setError(null);
    } catch (err) {
      console.error('Error fetching data:', err);
      setError('Failed to load content. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const filteredPractices = practices.filter(practice => 
    selectedCategory === 'all' ? true : practice.category === selectedCategory
  );

  const handleNextVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === videos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrevVideo = () => {
    setCurrentVideoIndex((prevIndex) => 
      prevIndex === 0 ? videos.length - 1 : prevIndex - 1
    );
  };

  const handleOpenDialog = (practice) => {
    setSelectedProject(practice);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedProject(null);
  };

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
          <Typography variant="h2" component="h1" sx={{ fontWeight: 'bold', mb: 2 }}>
            Sanitation Best Practices
          </Typography>
          <Typography variant="h5" sx={{ maxWidth: '800px' }}>
            Explore our partner school's proven sanitation and maintenance practices. Each practice is documented in detail to help other schools implement similar systems effectively.
          </Typography>
          <Typography variant="body1" sx={{ mt: 2, maxWidth: '800px', opacity: 0.9 }}>
            Filter by category to find specific practices or browse through our complete collection of documented success stories.
          </Typography>
        </Container>
      </Box>

      {/* Loading and Error States */}
      {loading && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 4 }}>
          <CircularProgress />
        </Box>
      )}
      
      {error && (
        <Container maxWidth="lg" sx={{ mb: 4 }}>
          <Alert severity="error">{error}</Alert>
        </Container>
      )}

      {!loading && !error && (
        <>
          {/* Category Filter */}
          <Container maxWidth="lg" sx={{ mb: 4 }}>
            <Box sx={{ 
              display: 'flex', 
              flexWrap: 'wrap',
              gap: 2, 
              mb: 4 
            }}>
              <Button 
                variant={selectedCategory === 'all' ? 'contained' : 'outlined'}
                onClick={() => setSelectedCategory('all')}
              >
                All Practices
              </Button>
              {categories.map(category => (
                <Button 
                  key={category}
                  variant={selectedCategory === category ? 'contained' : 'outlined'}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </Box>
          </Container>

          {/* Best Practices List */}
          <Container maxWidth="lg" sx={{ mb: 8 }}>
            <Grid container spacing={4}>
              {filteredPractices.map((practice) => (
                <Grid item xs={12} md={6} lg={4} key={practice.id}>
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
                        transform: 'translateY(-10px)',
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      sx={{
                        height: 300,
                        objectFit: 'cover',
                        width: '100%',
                        cursor: 'pointer', // Add cursor pointer to indicate clickable
                        '&:hover': {
                          opacity: 0.9 // Add hover effect
                        }
                      }}
                      image={practice.image}
                      alt={practice.title}
                      onClick={() => handleOpenDialog(practice)} // Add click handler to image
                    />
                    <CardContent sx={{ 
                      flexGrow: 1,
                      p: 3,
                      display: 'flex',
                      flexDirection: 'column'
                    }}>
                      <Typography 
                        variant="h5" 
                        component="h2" 
                        gutterBottom 
                        sx={{ 
                          fontWeight: 'bold',
                          fontSize: '1.25rem',
                          mb: 2,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {practice.title}
                      </Typography>
                      <Typography 
                        variant="subtitle1" 
                        sx={{ 
                          mb: 2,
                          color: 'text.primary',
                          fontWeight: 500,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {practice.description}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        sx={{ 
                          color: 'text.secondary',
                          mb: 2,
                          lineHeight: 1.6,
                          flexGrow: 1,
                          display: '-webkit-box',
                          WebkitLineClamp: 4,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {practice.fullDescription}
                      </Typography>
                      <Box sx={{ 
                        mt: 'auto', 
                        pt: 2, 
                        borderTop: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center'
                      }}>
                        <Typography variant="body2" sx={{
                          display: 'inline-block',
                          px: 1.5,
                          py: 0.5,
                          bgcolor: 'primary.light',
                          color: 'white',
                          borderRadius: 1,
                          fontSize: '0.75rem'
                        }}>
                          {practice.category}
                        </Typography>
                        <Button
                          size="small"
                          onClick={() => handleOpenDialog(practice)}
                          sx={{ ml: 1 }}
                        >
                          See More
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Container>
        </>
      )}
      
      {/* Video Resources Section */}
      {!loading && !error && videos.length > 0 && (
        <Box sx={{ bgcolor: 'grey.100', py: 8 }}>
          <Container maxWidth="lg">
            <Typography variant="h3" component="h2" sx={{ 
              fontWeight: 'bold',
              mb: 3,
              textAlign: 'center'
            }}>
              Educational Videos
            </Typography>
            <Typography variant="h6" sx={{ 
              mb: 6,
              textAlign: 'center',
              color: 'text.secondary'
            }}>
              Watch helpful videos about water conservation, proper handwashing techniques, and sanitation practices.
            </Typography>
      
            <Box sx={{ position: 'relative', maxWidth: '1200px', mx: 'auto', px: 6 }}>
              {/* Navigation Buttons */}
              <IconButton 
                onClick={handlePrevVideo}
                sx={{
                  position: 'absolute',
                  left: -30,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <NavigateBeforeIcon />
              </IconButton>
      
              <IconButton 
                onClick={handleNextVideo}
                sx={{
                  position: 'absolute',
                  right: -30,
                  top: '50%',
                  transform: 'translateY(-50%)',
                  bgcolor: 'white',
                  boxShadow: 2,
                  width: 48,
                  height: 48,
                  '&:hover': { 
                    bgcolor: 'grey.100',
                    transform: 'translateY(-50%) scale(1.1)'
                  },
                  transition: 'all 0.2s ease'
                }}
              >
                <NavigateNextIcon />
              </IconButton>
      
              {/* Videos Display */}
              <Grid container spacing={4}>
                {[
                  videos[(currentVideoIndex - 1 + videos.length) % videos.length],
                  videos[currentVideoIndex],
                  videos[(currentVideoIndex + 1) % videos.length]
                ].map((video, index) => (
                  <Grid item xs={12} md={4} key={video.id}>
                    <Card sx={{
                      height: '100%',
                      display: 'flex',
                      flexDirection: 'column',
                      borderRadius: 2,
                      overflow: 'hidden',
                      boxShadow: index === 1 ? '0 10px 30px rgba(0,0,0,0.2)' : '0 4px 12px rgba(0,0,0,0.1)',
                      transform: index === 1 ? 'scale(1.05)' : 'scale(1)',
                      opacity: index === 1 ? 1 : 0.7,
                      transition: 'all 0.3s ease'
                    }}>
                      <Box sx={{ position: 'relative', pt: '56.25%' }}>
                        <iframe
                          style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            border: 0
                          }}
                          src={video.embedUrl}
                          title={video.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                        />
                      </Box>
                      <CardContent>
                        <Typography variant="h6" component="h3" gutterBottom>
                          {video.title}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          {video.description}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            </Box>
          </Container>
        </Box>
      )}
      {/* Project Details Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="md"
        PaperProps={{
          sx: {
            maxWidth: 800,
            maxHeight: '90vh',
            borderRadius: 2
          }
        }}
      >
        {selectedProject && (
          <>
            <DialogTitle sx={{ 
              pb: 1,
              fontWeight: 'bold' 
            }}>
              {selectedProject.title}
            </DialogTitle>
            <DialogContent sx={{ p: 0 }}>
              <Box sx={{ mb: 2 }}>
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxHeight: '500px',
                    objectFit: 'cover'
                  }}
                />
              </Box>
              <Box sx={{ px: 3, pb: 3 }}>
                <Typography variant="subtitle1" sx={{ mb: 2, fontWeight: 500 }}>
                  {selectedProject.description}
                </Typography>
                <Typography variant="body1" sx={{ whiteSpace: 'pre-wrap' }}>
                  {selectedProject.fullDescription}
                </Typography>
              </Box>
            </DialogContent>
            <DialogActions sx={{ p: 2 }}>
              <Button onClick={handleCloseDialog}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Box>
  );
}

export default ProjectsPage;