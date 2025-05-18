import React, { useState, useEffect } from 'react';
import { 
  AppBar, 
  Box, 
  Toolbar, 
  Typography, 
  Button, 
  Container, 
  IconButton, 
  Drawer, 
  List, 
  ListItem, 
  ListItemText, 
  useScrollTrigger,
  Slide,
  Fade,
  useTheme,
  useMediaQuery
} from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import WaterDropIcon from '@mui/icons-material/WaterDrop';

// Hide AppBar on scroll down
function HideOnScroll(props) {
  const { children } = props;
  const trigger = useScrollTrigger();

  return (
    <Slide appear={false} direction="down" in={!trigger}>
      {children}
    </Slide>
  );
}

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const handleDrawerToggle = () => {
    setDrawerOpen(!drawerOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 20;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [scrolled]);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Practices', path: '/projects' },
    { name: 'About', path: '/about' },
    { name: 'Contact Us', path: '/contact' },
  ];

  const isActive = (path) => {
    return location.pathname === path;
  };

  return (
    <HideOnScroll>
      <AppBar 
        position="sticky" 
        color="default" 
        elevation={scrolled ? 4 : 0}
        sx={{
          bgcolor: scrolled ? 'white' : 'transparent',
          transition: 'all 0.3s ease',
          backdropFilter: scrolled ? 'blur(10px)' : 'none',
          borderBottom: scrolled ? '1px solid' : 'none',
          borderColor: 'divider',
        }}
      >
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ py: 1 }}>
            <Fade in={true} timeout={800}>
              <Box sx={{ 
                display: 'flex', 
                alignItems: 'center', 
                flexGrow: { xs: 1, md: 0 },
                mr: { md: 4 }
              }}>
                <WaterDropIcon 
                  sx={{ 
                    color: 'primary.main', 
                    fontSize: 36, 
                    mr: 1,
                    animation: 'pulse 2s infinite',
                    '@keyframes pulse': {
                      '0%': { opacity: 0.7, transform: 'scale(1)' },
                      '50%': { opacity: 1, transform: 'scale(1.1)' },
                      '100%': { opacity: 0.7, transform: 'scale(1)' }
                    }
                  }} 
                />
                <Typography
                  variant="h5"
                  component={RouterLink}
                  to="/"
                  sx={{
                    fontWeight: 700,
                    color: 'primary.main',
                    textDecoration: 'none',
                    letterSpacing: 1,
                    transition: 'color 0.3s ease',
                    '&:hover': {
                      color: 'primary.dark',
                    }
                  }}
                >
                  KalinisAralan
                </Typography>
              </Box>
            </Fade>

            {/* Desktop Navigation */}
            <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'center' }}>
              {navItems.map((item, index) => (
                <Fade 
                  key={item.name} 
                  in={true} 
                  timeout={800} 
                  style={{ transitionDelay: `${100 * (index + 1)}ms` }}
                >
                  <Button
                    component={RouterLink}
                    to={item.path}
                    sx={{
                      mx: 1.5,
                      color: isActive(item.path) ? 'primary.main' : 'text.primary',
                      fontWeight: isActive(item.path) ? 700 : 500,
                      position: 'relative',
                      '&::after': {
                        content: '""',
                        position: 'absolute',
                        width: isActive(item.path) ? '100%' : '0%',
                        height: '3px',
                        bottom: -5,
                        left: 0,
                        backgroundColor: 'primary.main',
                        transition: 'width 0.3s ease',
                        borderRadius: 5,
                      },
                      '&:hover::after': {
                        width: '100%',
                      }
                    }}
                  >
                    {item.name}
                  </Button>
                </Fade>
              ))}
            </Box>

            <Fade in={true} timeout={800} style={{ transitionDelay: '500ms' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Button
                  component={RouterLink}
                  to="/donate"
                  variant="contained"
                  color="primary"
                  sx={{
                    display: { xs: 'none', md: 'block' },
                    borderRadius: 30,
                    px: 3,
                    fontWeight: 'bold',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      transform: 'translateY(-3px)',
                      boxShadow: '0 6px 10px rgba(242, 169, 0, 0.3)',
                    }
                  }}
                >
                  Donate Now
                </Button>
                <IconButton
                  color="inherit"
                  aria-label="open drawer"
                  edge="end"
                  onClick={handleDrawerToggle}
                  sx={{ display: { md: 'none' } }}
                >
                  <MenuIcon />
                </IconButton>
              </Box>
            </Fade>
          </Toolbar>
        </Container>

        {/* Mobile Navigation Drawer */}
        <Drawer
          anchor="right"
          open={drawerOpen}
          onClose={handleDrawerToggle}
          sx={{
            '& .MuiDrawer-paper': { 
              width: '100%', 
              maxWidth: 300,
              boxSizing: 'border-box',
              bgcolor: 'background.paper',
              backgroundImage: 'linear-gradient(rgba(242, 169, 0, 0.05), rgba(242, 169, 0, 0.02))',
            },
          }}
        >
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            borderBottom: '1px solid',
            borderColor: 'divider'
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <WaterDropIcon sx={{ color: 'primary.main', fontSize: 28, mr: 1 }} />
              <Typography variant="h6" color="primary.main" fontWeight="bold">
                KalinisAralan
              </Typography>
            </Box>
            <IconButton onClick={handleDrawerToggle}>
              <CloseIcon />
            </IconButton>
          </Box>
          <List sx={{ pt: 2 }}>
            {navItems.map((item) => (
              <ListItem 
                key={item.name} 
                disablePadding
                component={RouterLink}
                to={item.path}
                onClick={handleDrawerToggle}
                sx={{ 
                  color: 'text.primary',
                  textDecoration: 'none',
                  mb: 1
                }}
              >
                <ListItemText 
                  primary={item.name} 
                  sx={{ 
                    pl: 3,
                    py: 1.5,
                    borderLeft: isActive(item.path) ? '4px solid' : '4px solid transparent',
                    borderColor: isActive(item.path) ? 'primary.main' : 'transparent',
                    bgcolor: isActive(item.path) ? 'rgba(242, 169, 0, 0.1)' : 'transparent',
                    '& .MuiTypography-root': {
                      fontWeight: isActive(item.path) ? 700 : 500,
                      color: isActive(item.path) ? 'primary.main' : 'inherit',
                    }
                  }}
                />
              </ListItem>
            ))}
            <ListItem sx={{ mt: 2, px: 2 }}>
              <Button
                component={RouterLink}
                to="/donate"
                variant="contained"
                color="primary"
                fullWidth
                onClick={handleDrawerToggle}
                sx={{
                  borderRadius: 30,
                  py: 1.2,
                  fontWeight: 'bold',
                }}
              >
                Donate Now
              </Button>
            </ListItem>
          </List>
        </Drawer>
      </AppBar>
    </HideOnScroll>
  );
}

export default Header;