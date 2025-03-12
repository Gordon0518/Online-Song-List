import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  Button,
  List,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, Add as AddIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
}));

const SongCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
  },
}));

const SongList = ({ user }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user) {
      const fetchSongs = async () => {
        try {
          const response = await axios.get(`/api/songListByCreator?creator=${user}`);
          setSongs(response.data);
          setLoading(false);
        } catch (err) {
          setError('Failed to load songs');
          setLoading(false);
        }
      };
      fetchSongs();
    } else {
      setLoading(false);
    }
  }, [user]);

  const deleteSong = async (songid) => {
    if (window.confirm('Are you sure you want to delete this song?')) {
      try {
        await axios.delete(`/api/deleteSong/${songid}`);
        setSongs(songs.filter((song) => song._id !== songid));
      } catch (err) {
        setError('Failed to delete song');
      }
    }
  };

  if (loading) {
    return (
      <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={4} />
      </Box>
    );
  }

  if (!user) {
    return (
      <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', pt: 8 }}>
        <StyledPaper sx={{ maxWidth: 600, mx: 'auto', textAlign: 'center' }}>
          <Typography variant="h5" sx={{ fontWeight: 700, color: '#1976d2', mb: 3 }}>
            Please log in to manage your songs
          </Typography>
          <Button
            component={Link}
            to="/login"
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
            Login
          </Button>
        </StyledPaper>
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
      <StyledPaper sx={{ maxWidth: 800, mx: 'auto' }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#1976d2' }}>
            My Songs
          </Typography>
          <Button
            component={Link}
            to="/addSong"
            variant="contained"
            startIcon={<AddIcon />}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Add Song
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {songs.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No songs yet—add some to get started!
          </Typography>
        ) : (
          <List>
            {songs.map((song) => (
              <SongCard key={song._id}>
                <CardContent sx={{ py: 2 }}>
                  <Typography variant="h6" sx={{ fontWeight: 500, color: '#424242' }}>
                    {song.songName}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {song.singer}
                  </Typography>
                  {song.songURL && (
                    <Typography variant="body2">
                      <a
                        href={song.songURL}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ textDecoration: 'none', color: '#1976d2' }}
                      >
                        Listen Now
                      </a>
                    </Typography>
                  )}
                </CardContent>
                <Divider />
                <CardActions sx={{ justifyContent: 'flex-end', py: 1 }}>
                  <IconButton
                    component={Link}
                    to={`/editSong/${song._id}`}
                    aria-label="edit"
                    sx={{ color: '#42a5f5', '&:hover': { color: '#1976d2' } }}
                  >
                    <EditIcon />
                  </IconButton>
                  <IconButton
                    onClick={() => deleteSong(song._id)}
                    aria-label="delete"
                    sx={{ color: '#ef5350', '&:hover': { color: '#d32f2f' } }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </CardActions>
              </SongCard>
            ))}
          </List>
        )}
      </StyledPaper>
    </Box>
  );
};

export default SongList;