import React from 'react';
import { Typography, Container, Box, Paper, Divider } from '@mui/material';
import { styled } from '@mui/material/styles';
import MusicNoteIcon from '@mui/icons-material/MusicNote';

const StyledContainer = styled(Container)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const About = () => {
  return (
    <StyledContainer>
      <StyledPaper elevation={3}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
          <MusicNoteIcon sx={{ fontSize: 40, color: '#1976d2' }} />
          <Typography 
            variant="h3" 
            sx={{ 
              fontWeight: 700, 
              color: '#1976d2',
              letterSpacing: '0.5px'
            }}
          >
            About SongList
          </Typography>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.8, 
            color: '#424242',
            fontSize: '1.1rem'
          }}
        >
          Welcome to SongList, your premier platform for discovering and sharing music. We're dedicated to connecting music enthusiasts globally, offering a space to explore new tunes, curate playlists, and share your favorite tracks with the community.
        </Typography>

        <Typography 
          variant="body1" 
          sx={{ 
            mb: 3, 
            lineHeight: 1.8, 
            color: '#424242',
            fontSize: '1.1rem'
          }}
        >
          Our passionate team blends love for music with cutting-edge technology to deliver an exceptional user experience. Whether you're a casual listener or a dedicated audiophile, SongList is designed with you in mind.
        </Typography>

        <Box sx={{ bgcolor: '#f5f7fa', p: 3, borderRadius: '12px', mb: 3 }}>
          <Typography 
            variant="h6" 
            sx={{ 
              color: '#1976d2', 
              mb: 1,
              fontWeight: 600
            }}
          >
            Get in Touch
          </Typography>
          <Typography 
            variant="body2" 
            sx={{ 
              color: '#424242',
              lineHeight: 1.6
            }}
          >
            Questions or feedback? Reach us at{' '}
            <a href="mailto:contact@songlist.com" style={{ color: '#1976d2', textDecoration: 'none' }}>
              contact@songlist.com
            </a>
            . Follow us on social media for the latest updates and features!
          </Typography>
        </Box>

        <Typography 
          variant="body1" 
          sx={{ 
            color: '#424242',
            fontStyle: 'italic',
            textAlign: 'center',
            fontSize: '1.1rem'
          }}
        >
          Thank you for joining the SongList community!
        </Typography>
      </StyledPaper>
    </StyledContainer>
  );
};

export default About;