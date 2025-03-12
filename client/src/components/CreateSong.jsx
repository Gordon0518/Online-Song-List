import React, { useState } from 'react';
import { Typography, Container, Box, Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const CreateSong = ({ user }) => {
  const [formData, setFormData] = useState({
    songName: '',
    singer: '',
    songURL: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/addSong', { ...formData, creator: user });
      setFormData({ songName: '', singer: '', songURL: '' });
      alert('Song added successfully!');
    } catch (error) {
      alert('Error adding song');
    }
  };

  return (
    <Container sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: '#1976d2', mb: 4, textAlign: 'center' }}
        >
          Add New Song
        </Typography>
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Song Name"
            name="songName"
            value={formData.songName}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          
          <TextField
            label="Singer"
            name="singer"
            value={formData.singer}
            onChange={handleChange}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          
          <TextField
            label="Song URL (optional)"
            name="songURL"
            value={formData.songURL}
            onChange={handleChange}
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Add Song
          </Button>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default CreateSong;

