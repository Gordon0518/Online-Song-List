import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { Button, List, ListItem, ListItemText, ListItemSecondaryAction, IconButton, Typography } from '@mui/material';
import { Delete as DeleteIcon, Edit as EditIcon } from '@mui/icons-material';

const SongList = ({ user }) => {
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchSongs = async () => {
      try {
        const response = await axios.get(`/api/songList?creator=${user}`);
        setSongs(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load songs');
        setLoading(false);
      }
    };
    fetchSongs();
  }, [user]);

  const deleteSong = async (songid) => {
    try {
      await axios.delete(`/api/deleteSong/${songid}`);
      setSongs(songs.filter((song) => song._id !== songid));
    } catch (err) {
      setError('Failed to delete song');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <Button component={Link} to="/addSong" variant="contained" color="primary" style={{ marginBottom: '20px' }}>
        Add Song
      </Button>
      {songs.length === 0 ? (
        <Typography>No songs available</Typography>
      ) : (
        <List>
          {songs.map((song) => (
            <ListItem key={song._id}>
              <ListItemText
                primary={`${song.songName} - ${song.singer}`}
                secondary={song.songURL && <a href={song.songURL} target="_blank" rel="noopener noreferrer">Link</a>}
              />
              <ListItemSecondaryAction>
                <IconButton edge="end" aria-label="edit" component={Link} to={`/editSong/${song._id}`}>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" aria-label="delete" onClick={() => deleteSong(song._id)}>
                  <DeleteIcon />
                </IconButton>
              </ListItemSecondaryAction>
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default SongList;
