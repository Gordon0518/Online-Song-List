import React from 'react';
import { Typography, Box, Button, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { Link } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(6),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  maxWidth: 600,
  margin: '0 auto',
}));

const MainPage = ({ user }) => {
  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', pt: 12 }}>
      <StyledPaper elevation={3}>
        <Box sx={{ textAlign: 'center', mb: 4 }}>
          <MusicNoteIcon sx={{ fontSize: 60, color: '#1976d2', mb: 2 }} />
          <Typography 
            variant="h3" 
            sx={{ fontWeight: 700, color: '#1976d2', mb: 2 }}
          >
            {user ? `Welcome Back, ${user}!` : 'Welcome to SongList'}
          </Typography>
          
          {user ? (
            // Content for logged-in users
            <>
              <Typography 
                variant="h6" 
                sx={{ color: '#424242', lineHeight: 1.6, mb: 4 }}
              >
                Explore your music collection or discover what others are sharing in our community.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/songList"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  My Songs
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/public"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
                  }}
                >
                  Community
                </Button>
                <Button
                  variant="contained"
                  component={Link}
                  to="/addSong"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    backgroundColor: '#42a5f5',
                    '&:hover': { backgroundColor: '#2196f3' },
                  }}
                >
                  Add New Song
                </Button>
              </Box>
            </>
          ) : (
            // Content for logged-out users
            <>
              <Typography 
                variant="h6" 
                sx={{ color: '#424242', lineHeight: 1.6, mb: 4 }}
              >
                Discover, create, and share your favorite songs with our community! Sign up or log in to get started.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                <Button
                  variant="contained"
                  component={Link}
                  to="/login"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    backgroundColor: '#1976d2',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  Login
                </Button>
                <Button
                  variant="outlined"
                  component={Link}
                  to="/register"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: '8px',
                    borderColor: '#1976d2',
                    color: '#1976d2',
                    '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
                  }}
                >
                  Register
                </Button>
              </Box>
            </>
          )}
        </Box>
      </StyledPaper>
    </Box>
  );
};

export default MainPage;