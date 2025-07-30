import React from 'react'
import ReactDOM from 'react-dom/client'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import CssBaseline from '@mui/material/CssBaseline'
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import './react-toastify-custom.css'

const theme = createTheme({
  palette: {
    primary: {
      main: '#667eea',
      light: '#8b9ef0',
      dark: '#4a5fd8',
    },
    secondary: {
      main: '#4facfe',
      light: '#7bc4ff',
      dark: '#3a8fd8',
    },
    background: {
      default: 'transparent',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    text: {
      primary: '#1a1a1a',
      secondary: '#666',
    },
    error: {
      main: '#e53e3e',
    },
    success: {
      main: '#38a169',
    },
    info: {
      main: '#319795',
    },
  },
  typography: {
    fontFamily: '"Inter", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
    h1: {
      fontSize: '28px',
      fontWeight: 700,
      color: '#1a1a1a',
    },
    h2: {
      fontSize: '24px',
      fontWeight: 600,
      color: '#1a1a1a',
    },
    body1: {
      fontSize: '16px',
      fontWeight: 400,
      color: '#666',
    },
    body2: {
      fontSize: '14px',
      fontWeight: 500,
      color: '#666',
    },
  },
  shape: {
    borderRadius: 16,
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(20px)',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          boxShadow: '0 20px 40px rgba(0, 0, 0, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 16,
          fontWeight: 600,
          boxShadow: '0 4px 12px rgba(102, 126, 234, 0.3)',
          '&:hover': {
            boxShadow: '0 6px 20px rgba(102, 126, 234, 0.4)',
          },
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 16,
            backgroundColor: '#f8fafc',
            '&:hover': {
              backgroundColor: '#f1f5f9',
            },
            '&.Mui-focused': {
              backgroundColor: '#f8fafc',
            },
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 16,
          backgroundColor: '#f8fafc',
          '&:hover': {
            backgroundColor: '#f1f5f9',
          },
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
) 