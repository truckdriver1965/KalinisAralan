import { createTheme } from '@mui/material';

// UST color theme
const ustTheme = createTheme({
  palette: {
    primary: {
      main: '#F2A900', // UST Gold
      dark: '#D49000',
      light: '#FFBE33',
      contrastText: '#000000',
    },
    secondary: {
      main: '#000000', // Black
      light: '#333333',
      dark: '#000000',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#FFFFFF',
      paper: '#FAFAFA',
    },
    text: {
      primary: '#333333',
      secondary: '#666666',
    },
    divider: '#E0E0E0',
  },
  typography: {
    fontFamily: '"Roboto", "Arial", sans-serif',
    h3: {
      fontWeight: 700,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 30,
          textTransform: 'none',
          fontWeight: 600,
          boxShadow: 'none',
          padding: '10px 24px',
        },
        containedPrimary: {
          '&:hover': {
            boxShadow: '0 6px 10px rgba(242, 169, 0, 0.3)',
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: '0 4px 20px rgba(0, 0, 0, 0.08)',
          borderRadius: 16,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiStepLabel: {
      styleOverrides: {
        label: {
          fontWeight: 500,
        },
      },
    },
  },
});

export default ustTheme;