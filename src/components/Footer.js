import React from 'react';
import { 
  Box, 
  Container, 
  Grid, 
  Typography, 
  Link, 
  Divider, 
  IconButton, 
  useTheme,
  Button,
  TextField,
  InputAdornment,
  Paper
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import YouTubeIcon from '@mui/icons-material/YouTube';
import SendIcon from '@mui/icons-material/Send';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

function Footer() {
  const theme = useTheme();
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: 'About Us',
      links: [
        { name: 'Our Mission', path: '/about' },
        { name: 'Our Team', path: '/about#team' },
        { name: 'Our Partners', path: '/about#partners' },
        { name: 'Our Impact', path: '/about#impact' },
      ]
    },
    {
      title: 'Get Involved',
      links: [
        { name: 'Donate', path: '/donate' },
        { name: 'Volunteer', path: '/volunteer' },
        { name: 'Partner With Us', path: '/partner' },
        { name: 'Fundraise', path: '/fundraise' },
      ]
    },
    {
      title: 'Resources',
      links: [
        { name: 'Blog', path: '/blog' },
        { name: 'News', path: '/news' },
        { name: 'Reports', path: '/reports' },
        { name: 'FAQs', path: '/faqs' },
      ]
    }
  ];

  const socialLinks = [
    { icon: <FacebookIcon />, url: 'https://facebook.com' },
    { icon: <TwitterIcon />, url: 'https://twitter.com' },
    { icon: <InstagramIcon />, url: 'https://instagram.com' },
    { icon: <LinkedInIcon />, url: 'https://linkedin.com' },
    { icon: <YouTubeIcon />, url: 'https://youtube.com' },
  ];

  return (
    <Box component="footer" sx={{ bgcolor: '#111', color: 'white', pt: 8, pb: 4 }}>
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Logo and About */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <WaterDropIcon sx={{ color: theme.palette.primary.main, fontSize: 36, mr: 1 }} />
              <Typography
                variant="h5"
                component={RouterLink}
                to="/"
                sx={{
                  fontWeight: 700,
                  color: theme.palette.primary.main,
                  textDecoration: 'none',
                  letterSpacing: 1,
                }}
              >
                KalinisAralan
              </Typography>
            </Box>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
              KalinisAralan is dedicated to improving water and sanitation facilities in schools across the Philippines, creating healthier learning environments for students.
            </Typography>
            
            <Box sx={{ mb: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'flex-start', mb: 2 }}>
                <LocationOnIcon sx={{ color: theme.palette.primary.main, mr: 1, mt: 0.5 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  123 España Blvd, Sampaloc, Manila, 1008 Metro Manila
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PhoneIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  +63 2 8123 4567
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <EmailIcon sx={{ color: theme.palette.primary.main, mr: 1 }} />
                <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.7)' }}>
                  info@kalinisaralan.org
                </Typography>
              </Box>
            </Box>
            
            <Box sx={{ display: 'flex', gap: 1 }}>
              {socialLinks.map((social, index) => (
                <IconButton 
                  key={index} 
                  component="a" 
                  href={social.url} 
                  target="_blank" 
                  rel="noopener noreferrer"
                  sx={{ 
                    color: 'rgba(255,255,255,0.7)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      color: theme.palette.primary.main,
                      transform: 'translateY(-3px)',
                    }
                  }}
                >
                  {social.icon}
                </IconButton>
              ))}
            </Box>
          </Grid>
          
          {/* Quick Links */}
          {footerLinks.map((section, index) => (
            <Grid item xs={12} sm={6} md={2} key={index}>
              <Typography 
                variant="h6" 
                sx={{ 
                  mb: 3, 
                  color: 'white',
                  position: 'relative',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    bottom: -8,
                    left: 0,
                    width: 40,
                    height: 3,
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1
                  }
                }}
              >
                {section.title}
              </Typography>
              <Box component="ul" sx={{ p: 0, m: 0, listStyle: 'none' }}>
                {section.links.map((link, linkIndex) => (
                  <Box component="li" key={linkIndex} sx={{ mb: 1.5 }}>
                    <Link
                      component={RouterLink}
                      to={link.path}
                      sx={{
                        color: 'rgba(255,255,255,0.7)',
                        textDecoration: 'none',
                        transition: 'all 0.2s ease',
                        display: 'inline-flex',
                        alignItems: 'center',
                        '&:hover': {
                          color: theme.palette.primary.main,
                          transform: 'translateX(5px)',
                        },
                        '&::before': {
                          content: '"›"',
                          marginRight: '8px',
                          fontSize: '18px',
                          color: 'rgba(255,255,255,0.4)',
                          transition: 'color 0.2s ease',
                        },
                        '&:hover::before': {
                          color: theme.palette.primary.main,
                        }
                      }}
                    >
                      {link.name}
                    </Link>
                  </Box>
                ))}
              </Box>
            </Grid>
          ))}
          
          {/* Newsletter */}
          <Grid item xs={12} md={4}>
            <Typography 
              variant="h6" 
              sx={{ 
                mb: 3, 
                color: 'white',
                position: 'relative',
                '&::after': {
                  content: '""',
                  position: 'absolute',
                  bottom: -8,
                  left: 0,
                  width: 40,
                  height: 3,
                  backgroundColor: theme.palette.primary.main,
                  borderRadius: 1
                }
              }}
            >
              Subscribe to Our Newsletter
            </Typography>
            <Typography variant="body2" sx={{ mb: 3, color: 'rgba(255,255,255,0.7)' }}>
              Stay updated with our latest projects, events, and ways to get involved.
            </Typography>
            
            <Paper
              component="form"
              sx={{
                p: '2px 4px',
                display: 'flex',
                alignItems: 'center',
                bgcolor: 'rgba(255,255,255,0.1)',
                border: '1px solid rgba(255,255,255,0.2)',
                borderRadius: 30,
                mb: 3,
              }}
            >
              <TextField
                fullWidth
                placeholder="Your email address"
                variant="standard"
                InputProps={{
                  disableUnderline: true,
                  startAdornment: (
                    <InputAdornment position="start">
                      <EmailIcon sx={{ color: 'rgba(255,255,255,0.5)', ml: 1 }} />
                    </InputAdornment>
                  ),
                  sx: { 
                    color: 'white',
                    px: 1,
                    '& input::placeholder': {
                      color: 'rgba(255,255,255,0.5)',
                      opacity: 1,
                    }
                  }
                }}
              />
              <IconButton 
                type="submit" 
                sx={{ 
                  p: '10px', 
                  color: 'black',
                  bgcolor: theme.palette.primary.main,
                  '&:hover': {
                    bgcolor: theme.palette.primary.dark,
                  }
                }}
              >
                <SendIcon />
              </IconButton>
            </Paper>
          
          </Grid>
        </Grid>
        
        <Divider sx={{ my: 4, borderColor: 'rgba(255,255,255,0.1)' }} />
        
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'center', sm: 'flex-start' } }}>
          <Typography variant="body2" sx={{ color: 'rgba(255,255,255,0.5)', textAlign: { xs: 'center', sm: 'left' } }}>
            © {currentYear} KalinisAralan Foundation. All rights reserved.
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, mt: { xs: 2, sm: 0 } }}>
            <Link href="/privacy" sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
              Privacy Policy
            </Link>
            <Link href="/terms" sx={{ color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: theme.palette.primary.main } }}>
              Terms of Service
            </Link>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}

export default Footer;