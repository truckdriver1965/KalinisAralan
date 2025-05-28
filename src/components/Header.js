import React, { useState } from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Container,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  useMediaQuery,
  useTheme,
  Tooltip,
  Chip,
  Menu,
  MenuItem,
} from '@mui/material';
import { Link as RouterLink, useLocation, useNavigate } from 'react-router-dom';
import MenuIcon from '@mui/icons-material/Menu';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import WaterDropIcon from '@mui/icons-material/WaterDrop';
import { useAuth } from '../contexts/AuthContext';

function Header() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorElAdminMenu, setAnchorElAdminMenu] = useState(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { isAuthenticated, user, logout } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Projects', path: '/projects' },
    { name: 'Contact', path: '/contact' },
    { name: 'Donate', path: '/donate' }
  ];

  const isActive = (path) => {
    if (path === '/') {
      return location.pathname === path;
    }
    return location.pathname.startsWith(path);
  };

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setDrawerOpen(open);
  };

  // Admin menu handlers
  const handleAdminMenuOpen = (event) => {
    setAnchorElAdminMenu(event.currentTarget);
  };

  const handleAdminMenuClose = () => {
    setAnchorElAdminMenu(null);
  };

  const handleAdminLoginClick = () => {
    handleAdminMenuClose();
    navigate('/admin/login');
  };

  const handleAdminLogoutClick = () => {
    handleAdminMenuClose();
    logout(); // Assuming logout function is provided by useAuth
    navigate('/');
  };

  return (
    <AppBar position="static" color="inherit" sx={{ bgcolor: 'white', boxShadow: 1 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <WaterDropIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, color: 'primary.main' }} />
          <Typography
            variant="h6"
            component={RouterLink}
            to="/"
            sx={{
              mr: 2,
              display: 'flex',
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'primary.main',
              textDecoration: 'none',
              flexGrow: isMobile ? 1 : 0
            }}
          >
            KalinisAralan
          </Typography>

          {/* Add admin indicator */}
          {isAuthenticated && user && (
            <Chip
              label={`Welcome, ${user.username}`}
              color="primary"
              size="small"
              sx={{ 
                mr: 2,
                display: { xs: 'none', md: 'flex' },
                backgroundColor: 'primary.main',
                color: 'white'
              }}
            />
          )}

          {isMobile ? (
            <>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={toggleDrawer(true)}
                color="primary"
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={drawerOpen}
                onClose={toggleDrawer(false)}
              >
                <Box
                  sx={{ width: 250 }}
                  role="presentation"
                  onClick={toggleDrawer(false)}
                  onKeyDown={toggleDrawer(false)}
                >
                  <List>
                    {navItems.map((item) => (
                      <ListItem 
                        button 
                        key={item.name} 
                        component={RouterLink} 
                        to={item.path}
                        sx={{
                          bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                          color: 'text.primary',
                          fontWeight: isActive(item.path) ? 700 : 400
                        }}
                      >
                        <ListItemText primary={item.name} />
                      </ListItem>
                    ))}
                  </List>
                </Box>
              </Drawer>
            </>
          ) : (
            <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
              {navItems.map((item) => (
                <Button
                  key={item.name}
                  component={RouterLink}
                  to={item.path}
                  sx={{
                    mx: 1,
                    color: 'text.primary',
                    bgcolor: isActive(item.path) ? 'primary.light' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive(item.path) ? 'primary.light' : 'rgba(0, 0, 0, 0.04)'
                    },
                    fontWeight: isActive(item.path) ? 700 : 400
                  }}
                >
                  {item.name}
                </Button>
              ))}
            </Box>
          )}

          {/* Admin Dashboard button for authenticated users */}
          {isAuthenticated && (
            <Button
              component={RouterLink}
              to="/admin"
              variant="outlined"
              color="primary"
              sx={{ mx: 1 }}
            >
              Dashboard
            </Button>
          )}

          {/* Admin Login/Logout icon button with hover menu */}
          {!isMobile && (
            <Box sx={{ flexGrow: 0 }}>
              <Tooltip title={isAuthenticated ? 'Logout' : 'Login'}>
                <IconButton 
                  color="primary" 
                  onClick={handleAdminMenuOpen}
                  size="small"
                  sx={{
                    opacity: isActive('/admin') ? 1 : 0.7,
                    bgcolor: isActive('/admin') ? 'primary.light' : 'transparent'
                  }}
                  aria-controls={Boolean(anchorElAdminMenu) ? 'admin-login-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={Boolean(anchorElAdminMenu) ? 'true' : undefined}
                >
                  <AdminPanelSettingsIcon fontSize="small" />
                </IconButton>
              </Tooltip>

              <Menu
                id="admin-login-menu"
                anchorEl={anchorElAdminMenu}
                open={Boolean(anchorElAdminMenu)}
                onClose={handleAdminMenuClose}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'right',
                }}
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'right',
                }}
                keepMounted
              >
                {!isAuthenticated && (
                  <MenuItem onClick={handleAdminLoginClick}>Login</MenuItem>
                )}
                {isAuthenticated && (
                  <MenuItem onClick={handleAdminLogoutClick} sx={{ color: 'error.main' }}>
                    Logout
                  </MenuItem>
                )}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;

