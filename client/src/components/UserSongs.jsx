import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, Link, useNavigate } from 'react-router-dom';
import {
  List,
  Typography,
  CircularProgress,
  Box,
  Card,
  CardContent,
  CardActions,
  IconButton,
  Divider,
  Button,
  Paper,
} from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon, ArrowBack as ArrowBackIcon } from '@mui/icons-material';
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

const UserSongs = ({ user }) => {
  const { username } = useParams();
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`/api/songListByCreator?creator=${username}`);
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load songs');
        setLoading(false);
      }
    };
    fetchSongs();
  }, [username]);

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
            Songs by {username}
          </Typography>
          <Button
            variant="outlined"
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/public')}
            sx={{
              py: 1.5,
              px: 3,
              borderRadius: '8px',
              borderColor: '#1976d2',
              color: '#1976d2',
              '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
            }}
          >
            Back to Community
          </Button>
        </Box>
        
        <Divider sx={{ mb: 3 }} />
        
        {songs.length === 0 ? (
          <Typography variant="body1" color="text.secondary" align="center" sx={{ py: 4 }}>
            No songs available from {username}
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
                {user === username && (
                  <>
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
                  </>
                )}
              </SongCard>
            ))}
          </List>
        )}
      </StyledPaper>
    </Box>
  );
};

export default UserSongs;