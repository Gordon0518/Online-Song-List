import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  TextField,
  Button,
  Paper,
  Divider,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import SearchIcon from '@mui/icons-material/Search';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const SongItem = styled(ListItem)(({ theme }) => ({
  borderRadius: '8px',
  padding: theme.spacing(1.5),
  marginBottom: theme.spacing(1),
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#f8f9fa',
    transform: 'translateY(-2px)',
  },
}));

const Search = () => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get('/api/search');
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load songs');
        setLoading(false);
      }
    };
    fetchSongs();
  }, []);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`/api/search?search=${search}`);
      setSongs(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to load songs');
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', pt: 8 }}>
        <Typography 
          color="error" 
          align="center" 
          variant="h6"
          sx={{ 
            backgroundColor: 'rgba(255, 235, 238, 0.9)', 
            p: 2, 
            borderRadius: '8px',
            maxWidth: 600,
            mx: 'auto'
          }}
        >
          {error}
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', py: 4 }}>
      <StyledPaper elevation={3} sx={{ maxWidth: 800, mx: 'auto' }}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: '#1976d2', mb: 3, textAlign: 'center' }}
        >
          Explore Songs
        </Typography>
        
        <Box sx={{ display: 'flex', mb: 4, gap: 2 }}>
          <TextField
            label="Search Songs"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            fullWidth
            variant="outlined"
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
            onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          />
          <Button
            variant="contained"
            onClick={handleSearch}
            sx={{
              py: 1.5,
              px: 4,
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            <SearchIcon />
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        <List>
          {songs.map((song) => (
            <SongItem key={song._id}>
              <ListItemText 
                primary={
                  <Typography sx={{ color: '#1976d2', fontWeight: 500 }}>
                    {song.songName}
                  </Typography>
                }
                secondary={
                  <Typography variant="body2" color="text.secondary">
                    {song.singer} • Created by {song.creator}
                  </Typography>
                }
              />
            </SongItem>
          ))}
          {songs.length === 0 && (
            <Typography sx={{ textAlign: 'center', color: '#757575', py: 2 }}>
              No songs found matching your search
            </Typography>
          )}
        </List>
      </StyledPaper>
    </Box>
  );
};

export default Search;