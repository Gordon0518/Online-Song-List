import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const EditSong = () => {
  const { id } = useParams();
  const [songName, setSongName] = useState('');
  const [singer, setSinger] = useState('');
  const [songURL, setSongURL] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchSong = async () => {
      try {
        const response = await axios.get(`/api/songList/${id}`);
        setSongName(response.data.songName);
        setSinger(response.data.singer);
        setSongURL(response.data.songURL);
      } catch (err) {
        console.error('Error fetching song:', err);
        setError('Failed to fetch song');
      }
    };
    fetchSong();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`/api/editSong/${id}`, {
        songName,
        singer,
        songURL,
      });
      navigate('/');
    } catch (err) {
      console.error('Error updating song:', err);
      setError('Failed to update song');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Edit Song
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
          Update Song
        </Button>
        <Button variant="contained" color="secondary" style={{ marginTop: '20px', marginLeft: '20px' }} onClick={() => navigate('/')}>
          Cancel
        </Button>
      </form>
    </Container>
  );
};

export default EditSong;