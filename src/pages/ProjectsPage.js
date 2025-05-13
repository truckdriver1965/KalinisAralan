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
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';

const categories = [
  'Maintenance',
  'Education',
  'Management',
  'Community'
];

function ProjectsPage() {
  const theme = useTheme();
  const [practices, setPractices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPractices();
  }, []);

  const fetchPractices = async () => {
    try {
      setLoading(true);

      // Mock data (for development)
      const mockData = [
        {
          id: 1,
          title: 'Regular Cleaning Schedule',
          description: 'Daily cleaning schedule implemented by the school maintenance staff',
          fullDescription: 'The school maintains cleanliness through a structured daily schedule: Morning inspection (6:30 AM), After-recess cleanup (10:00 AM), Post-lunch maintenance (1:30 PM), and End-day thorough cleaning (4:30 PM). This systematic approach ensures facilities remain clean throughout the school day.',
          image: '/images/practice1.jpg',
          category: 'Maintenance',
        },
        {
          id: 2,
          title: 'Student Cleanliness Program',
          description: 'Weekly student assignments for basic facility maintenance',
          fullDescription: 'Each section has assigned cleaning duties on rotation. Students handle basic tasks like keeping the sink areas dry, ensuring proper tissue disposal, and reporting any maintenance issues to teachers. This program builds student responsibility while maintaining facility cleanliness.',
          image: '/images/practice2.jpg',
          category: 'Education',
        },
        {
          id: 3,
          title: 'Supply Management',
          description: 'Monthly inventory system for cleaning materials',
          fullDescription: 'The school maintains a monthly inventory of cleaning supplies including tissue paper, hand soap, and cleaning agents. The admin staff tracks usage patterns and ensures timely restocking. This prevents shortages and maintains consistent facility cleanliness.',
          image: '/images/practice3.jpg',
          category: 'Management',
        },
        {
          id: 4,
          title: 'Facility Maintenance Checklist',
          description: 'Daily inspection and maintenance verification system',
          fullDescription: 'Maintenance staff uses a detailed checklist covering all facility areas: functioning water supply, clean toilet bowls, adequate lighting, proper drainage, and ventilation. Issues are immediately reported to the administration for quick resolution.',
          image: '/images/practice4.jpg',
          category: 'Maintenance',
        },
        {
          id: 5,
          title: 'Parent-Teacher Collaboration',
          description: 'Monthly meetings for facility maintenance planning',
          fullDescription: 'The PTA actively participates in facility maintenance through monthly meetings where they discuss maintenance needs, contribute to supply procurement, and organize quarterly general cleaning activities involving parents and teachers.',
          image: '/images/practice5.jpg',
          category: 'Community',
        },
        {
          id: 6,
          title: 'Basic Repairs System',
          description: 'Immediate response protocol for minor facility issues',
          fullDescription: 'The school has a designated maintenance team that handles basic repairs like fixing leaky faucets, unclogging drains, and replacing broken fixtures. This quick-response system prevents small issues from becoming major problems.',
          image: '/images/practice6.jpg',
          category: 'Management',
        }
      ];

      setPractices(mockData);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching best practices:', err);
      setError('Failed to load best practices. Please try again later.');
      setLoading(false);
    }
  };

  const [selectedCategory, setSelectedCategory] = useState('all');
  
  // Filter function
  const filteredPractices = practices.filter(practice => 
    selectedCategory === 'all' ? true : practice.category === selectedCategory
  );

  const videos = [ 
    { 
      id: 1, 
      title: 'Tamang Paggamit ng Tubig sa Paaralan', 
      description: 'Alamin ang mga paraan kung paano makatipid ng tubig sa paaralan.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-1', 
      thumbnail: '/images/video-thumb-1.jpg' 
    }, 
    { 
      id: 2, 
      title: 'Wastong Pangangalaga ng Palikuran', 
      description: 'Mga tips para sa tamang pag-maintain ng school restrooms.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-2', 
      thumbnail: '/images/video-thumb-2.jpg' 
    }, 
    { 
      id: 3, 
      title: 'Proper Handwashing Campaign', 
      description: 'Paano ituro sa mga estudyante ang tamang paghuhugas ng kamay.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-3', 
      thumbnail: '/images/video-thumb-3.jpg' 
    },
    { 
      id: 4, 
      title: 'Paglilinis ng Water Tank', 
      description: 'Step-by-step guide sa tamang paglilinis ng water tank sa paaralan.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-4', 
      thumbnail: '/images/video-thumb-4.jpg' 
    },
    { 
      id: 5, 
      title: 'Water Conservation Tips', 
      description: 'Mga paraan para makatipid ng tubig sa paaralan at bahay.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-5', 
      thumbnail: '/images/video-thumb-5.jpg' 
    },
    { 
      id: 6, 
      title: 'Proper Waste Segregation', 
      description: 'Tamang paghihiwalay ng basura para sa malinis na kapaligiran.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-6', 
      thumbnail: '/images/video-thumb-6.jpg' 
    },
    { 
      id: 7, 
      title: 'School Plumbing Maintenance', 
      description: 'Basic plumbing maintenance para sa mga paaralan.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-7', 
      thumbnail: '/images/video-thumb-7.jpg' 
    },
    { 
      id: 8, 
      title: 'Eco-Friendly School Practices', 
      description: 'Mga environment-friendly na gawain sa paaralan.', 
      embedUrl: 'https://www.youtube.com/embed/your-video-id-8', 
      thumbnail: '/images/video-thumb-8.jpg' 
    }
  ];

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

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
                      height="200"
                      image={practice.image}
                      alt={practice.title}
                    />
                    <CardContent sx={{ flexGrow: 1, p: 3 }}>
                      <Typography variant="h5" component="h2" gutterBottom sx={{ 
                        fontWeight: 'bold',
                        fontSize: '1.25rem',
                        mb: 2
                      }}>
                        {practice.title}
                      </Typography>
                      <Typography variant="subtitle1" sx={{ 
                        mb: 2,
                        color: 'text.primary',
                        fontWeight: 500
                      }}>
                        {practice.description}
                      </Typography>
                      <Typography variant="body2" sx={{ 
                        color: 'text.secondary',
                        mb: 2,
                        lineHeight: 1.6
                      }}>
                        {practice.fullDescription}
                      </Typography>
                      <Box sx={{ 
                        mt: 'auto', 
                        pt: 2, 
                        borderTop: '1px solid',
                        borderColor: 'divider'
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
    </Box>
  );
}

export default ProjectsPage;