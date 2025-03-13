import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  CircularProgress,
  Box,
  IconButton,
  Paper,
  Divider,
  Fade,
  Tooltip,
} from '@mui/material';
import { ThumbUp as ThumbUpIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

const UserCard = styled(ListItem)(({ theme }) => ({
  backgroundColor: '#ffffff',
  borderRadius: '12px',
  marginBottom: theme.spacing(1.5),
  padding: theme.spacing(2),
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
    backgroundColor: '#f8f9fa',
  },
}));

const StyledIconButton = styled(IconButton)(({ theme, liked }) => ({
  transition: 'all 0.2s ease',
  '&:hover': {
    transform: 'scale(1.1)',
    backgroundColor: liked ? 'rgba(25, 118, 210, 0.1)' : 'rgba(0, 0, 0, 0.05)',
  },
}));

const LikeCount = styled(Typography)(({ theme }) => ({
  fontWeight: 500,
  color: theme.palette.grey[600],
  minWidth: '24px',
  textAlign: 'center',
}));

const Container = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)',
  minHeight: '100vh',
  padding: theme.spacing(4),
}));

const Public = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('/api/users');
        const usersWithLikes = await Promise.all(
          response.data.map(async (u) => {
            const songResponse = await axios.get(`/api/songListByCreator?creator=${u.username}`);
            const totalSongLikes = songResponse.data.reduce((acc, song) => acc + (song.likes ? song.likes.length : 0), 0);
            const userResponse = await axios.get(`/api/userLikes/${u.username}`);
            return { 
              ...u, 
              likeCount: userResponse.data.length,
              totalSongLikes: totalSongLikes,
              isLiked: userResponse.data.includes(user)
            };
          })
        );
        setUsers(usersWithLikes);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching users:', err);
        setError('Failed to load users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, [user]);

  const handleLike = async (username, e) => {
    e.preventDefault();
    e.stopPropagation();
    
    if (!user) {
      alert('Please log in to like users.');
      return;
    }

    try {
      const targetUser = users.find(u => u.username === username);
      const isCurrentlyLiked = targetUser.isLiked;
      
      const response = await axios.post(`/api/likeUser`, { 
        user: user, 
        username 
      });
      
      setUsers(prevUsers =>
        prevUsers.map(u =>
          u.username === username
            ? {
                ...u,
                likeCount: response.data.likes.length,
                isLiked: !isCurrentlyLiked
              }
            : u
        )
      );
    } catch (err) {
      console.error('Failed to like user:', err);
      setError('Failed to like user');
    }
  };

  if (loading) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
        <CircularProgress size={60} thickness={4} />
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
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
      </Container>
    );
  }

  return (
    <Container>
      <Paper 
        elevation={3}
        sx={{ 
          maxWidth: 800, 
          mx: 'auto', 
          p: 3, 
          borderRadius: '16px',
          backgroundColor: 'rgba(255, 255, 255, 0.95)'
        }}
      >
        <Typography 
          variant="h4" 
          sx={{ 
            fontWeight: 700, 
            color: '#1976d2', 
            mb: 3,
            textAlign: 'center',
            letterSpacing: '0.5px'
          }}
        >
          Community Creators
        </Typography>
        <Divider sx={{ mb: 3 }} />
        <List>
          {users.map((u) => (
            <Fade key={u._id} in={true} timeout={500}>
              <UserCard component="div">
                <ListItemText 
                  primary={
                    <Link 
                      to={`/userSongs/${u.username}`} 
                      style={{ 
                        textDecoration: 'none', 
                        color: '#1976d2',
                        fontWeight: 500,
                        '&:hover': { color: '#1565c0' }
                      }}
                    >
                      {u.username}
                    </Link>
                  }
                  secondary={
                    <Typography 
                      variant="body2" 
                      color="text.secondary"
                    >
                      {u.likeCount} creator likes
                    </Typography>
                  }
                />
                <Box sx={{ display: 'flex', alignItems: 'center', ml: 2 }}>
                  <LikeCount>
                    {u.likeCount}
                  </LikeCount>
                  <Tooltip title={u.isLiked ? "Unlike" : "Like this creator"} placement="top">
                    <StyledIconButton
                      onClick={(e) => handleLike(u.username, e)}
                      aria-label="like"
                      liked={u.isLiked}
                      sx={{ 
                        color: u.isLiked ? '#1976d2' : '#757575',
                        '&:hover': { 
                          color: u.isLiked ? '#1565c0' : '#424242'
                        }
                      }}
                    >
                      <ThumbUpIcon />
                    </StyledIconButton>
                  </Tooltip>
                </Box>
              </UserCard>
            </Fade>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Public;