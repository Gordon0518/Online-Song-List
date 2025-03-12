import React, { useState, useEffect } from 'react';
import { Typography, Container, Box, Paper, TextField, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const EditSong = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    songName: '',
    singer: '',
    songURL: '',
  });

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`/api/songList/${id}`);
        setFormData({
          songName: response.data.songName,
          singer: response.data.singer,
          songURL: response.data.songURL || '',
        });
      } catch (error) {
        alert('Error loading song');
      }
    };
    fetchSong();
  }, [id]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/editSong/${id}`, formData);
      alert('Song updated successfully!');
      navigate('/songList');
    } catch (error) {
      alert('Error updating song');
    }
  };

  return (
    <Container sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', py: 4 }}>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: '#1976d2', mb: 4, textAlign: 'center' }}
        >
          Edit Song
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
          
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Save Changes
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/songList')}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '8px',
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
      </StyledPaper>
    </Container>
  );
};

export default EditSong;