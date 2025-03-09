import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const CreateSong = ({ user, onSongAdded }) => {
  const [songName, setSongName] = useState('');
  const [singer, setSinger] = useState('');
  const [songURL, setSongURL] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/addSong', {
        songName,
        singer,
        songURL,
        creator: user, // Include the creator information
      });
      setSongName('');
      setSinger('');
      setSongURL('');
      setError(null);
      if (onSongAdded) {
        onSongAdded(response.data);
      }
      navigate('/songList');
    } catch (err) {
      console.error('Error adding song:', err);
      setError('Failed to add song');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Add a New Song
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="Song Name"
          value={songName}
          onChange={(e) => setSongName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Singer"
          value={singer}
          onChange={(e) => setSinger(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Song URL (optional)"
          value={songURL}
          onChange={(e) => setSongURL(e.target.value)}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Add Song
        </Button>
        <Button
          variant="contained"
          color="secondary"
          style={{ marginTop: '20px', marginLeft: '20px' }}
          onClick={() => navigate('/')}
        >
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default CreateSong;


