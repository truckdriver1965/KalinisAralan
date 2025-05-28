import React, { useState, useEffect } from 'react';
import axios from 'axios';
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
  Divider,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DashboardIcon from '@mui/icons-material/Dashboard';
import MessageIcon from '@mui/icons-material/Message';
import VolunteerActivismIcon from '@mui/icons-material/VolunteerActivism';
import LogoutIcon from '@mui/icons-material/Logout';
import PersonIcon from '@mui/icons-material/Person';
import CollectionsIcon from '@mui/icons-material/Collections'; // Add this import

function AdminDashboardPage() {
  const { user, logout } = useAuth();
  const [openLogoutDialog, setOpenLogoutDialog] = useState(false);
  const [stats, setStats] = useState({
    recommendations: {
      total: 0,
      pending: 0
    },
    donations: {
      total: 0,
      amount: 0
    }
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [recommendationsRes, donationsRes] = await Promise.all([
          axios.get('http://localhost:5000/api/recommendations'),
          axios.get('http://localhost:5000/api/donations')
        ]);

        const recommendations = recommendationsRes.data;
        const donations = donationsRes.data;

        setStats({
          recommendations: {
            total: recommendations.length,
            pending: recommendations.filter(r => r.status === 'pending').length
          },
          donations: {
            total: donations.length,
            amount: donations.reduce((sum, donation) => sum + (parseFloat(donation.amount) || 0), 0)
          }
        });
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);
  
  const handleLogoutClick = () => {
    setOpenLogoutDialog(true);
  };

  const handleLogoutConfirm = () => {
    logout();
    setOpenLogoutDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenLogoutDialog(false);
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
              
              <ListItem button component={Link} to="/admin/projects">
                <ListItemIcon>
                  <CollectionsIcon />
                </ListItemIcon>
                <ListItemText primary="Manage Projects" />
              </ListItem>
              
              <Divider />
              
              <ListItem button onClick={handleLogoutClick}>
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
                  <Typography variant="h3" color="primary.contrastText">{stats.recommendations.total}</Typography>
                  <Typography variant="subtitle1" color="primary.contrastText">
                    Pending: {stats.recommendations.pending}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="primary" 
                      component={Link} 
                      to="/admin/recommendations"
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
                  <Typography variant="h3" color="secondary.contrastText">{stats.donations.total}</Typography>
                  <Typography variant="subtitle1" color="secondary.contrastText">
                    Total Amount: ₱{stats.donations.amount.toLocaleString()}
                  </Typography>
                  <Box sx={{ mt: 2 }}>
                    <Button 
                      variant="contained" 
                      color="secondary" 
                      component={Link} 
                      to="/admin/donations"
                    >
                      View All
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={openLogoutDialog}
        onClose={handleLogoutCancel}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">Confirm Logout</DialogTitle>
        <DialogContent>
          <Typography>Are you sure you want to log out?</Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleLogoutCancel}>Cancel</Button>
          <Button onClick={handleLogoutConfirm} color="error" variant="contained">
            Logout
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
}

export default AdminDashboardPage;