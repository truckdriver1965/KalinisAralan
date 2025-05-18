import React from 'react';
import { 
  Container, 
  Typography, 
  Box, 
  Grid, 
  Card, 
  CardContent, 
  Button,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';

function AdminDashboardPage() {
  const { user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Grid container spacing={3}>
        {/* Sidebar */}
        <Grid item xs={12} md={3}>
          <Card sx={{ mb: 3 }}>
            <CardContent sx={{ p: 2 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PersonIcon sx={{ mr: 1 }} />
                <Typography variant="h6">
                  Welcome, {user?.username}
                </Typography>
              </Box>
              <Typography variant="body2" color="text.secondary">
                Role: Administrator
              </Typography>
            </CardContent>
          </Card>
          
          <Card>
            <List component="nav">
              <ListItem button component={Link} to="/admin" selected>
                <ListItemIcon>
                  <DashboardIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItem>
              
              <ListItem button component={Link} to="/admin/recommendations">
                <ListItemIcon>
                  <MessageIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Recommendations" />
              </ListItem>
              
              <ListItem button component={Link} to="/admin/donations">
                <ListItemIcon>
                  <VolunteerActivismIcon color="primary" />
                </ListItemIcon>
                <ListItemText primary="Donations" />
              </ListItem>
              
              <Divider />
              
              <ListItem button onClick={handleLogout}>
                <ListItemIcon>
                  <LogoutIcon color="error" />
                </ListItemIcon>
                <ListItemText primary="Logout" sx={{ color: 'error.main' }} />
              </ListItem>
            </List>
          </Card>
        </Grid>
        
        {/* Main Content */}
        <Grid item xs={12} md={9}>
          <Typography variant="h4" gutterBottom>
            Admin Dashboard
          </Typography>
          
          <Grid container spacing={3} sx={{ mb: 4 }}>
            <Grid item xs={12} sm={6}>
              <Card sx={{ bgcolor: 'primary.light', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="primary.contrastText">Recommendations</Typography>
                  <Typography variant="h3" color="primary.contrastText">--</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to="/admin/recommendations"
                      sx={{ bgcolor: 'white', color: 'primary.main' }}
                    >
                      View All
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <Card sx={{ bgcolor: 'secondary.light', height: '100%' }}>
                <CardContent>
                  <Typography variant="h6" color="secondary.contrastText">Donations</Typography>
                  <Typography variant="h3" color="secondary.contrastText">--</Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      component={Link} 
                      to="/admin/donations"
                      sx={{ bgcolor: 'white', color: 'secondary.main' }}
                    >
                      View All
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
          
          <Card>
            <CardContent>
              <Typography variant="h5" gutterBottom>
                Quick Actions
              </Typography>
              <Grid container spacing={2} sx={{ mt: 1 }}>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    color="primary" 
                    fullWidth 
                    component={Link} 
                    to="/admin/recommendations"
                    sx={{ py: 1.5 }}
                  >
                    Manage Recommendations
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button 
                    variant="outlined" 
                    color="secondary" 
                    fullWidth 
                    component={Link} 
                    to="/admin/donations"
                    sx={{ py: 1.5 }}
                  >
                    Manage Donations
                  </Button>
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
}

export default AdminDashboardPage;