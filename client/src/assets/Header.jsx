import React from 'react';
import { AppBar, Toolbar, Button, Box, Container, Typography, Avatar, IconButton } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import LogoutIcon from '@mui/icons-material/Logout';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  background: 'linear-gradient(90deg, #1976d2 0%, #42a5f5 100%)',
  boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
}));

const NavButton = styled(Button)(({ theme }) => ({
  color: '#fff',
  textTransform: 'none',
  fontSize: '1rem',
  padding: theme.spacing(1, 2),
  borderRadius: '8px',
  '&:hover': {
    backgroundColor: 'rgba(255,255,255,0.15)',
    transform: 'translateY(-1px)',
    transition: 'all 0.2s ease',
  },
}));

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <StyledAppBar position="static">
      <Container maxWidth="lg">
        <Toolbar sx={{ py: 2, justifyContent: 'space-between' }} disableGutters>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <MusicNoteIcon sx={{ color: '#fff', fontSize: 32 }} />
            <Typography
              variant="h5"
              component={Link}
              to="/"
              sx={{
                fontWeight: 700,
                color: '#fff',
                textDecoration: 'none',
                letterSpacing: '0.5px',
                '&:hover': { color: '#e3f2fd' },
              }}
            >
              SongList
            </Typography>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <NavButton component={Link} to="/">Home</NavButton>
            <NavButton component={Link} to="/songList">My Songs</NavButton>
            <NavButton component={Link} to="/public">Community</NavButton>
            <NavButton component={Link} to="/search">Search</NavButton>
            
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {user ? (
              <>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, bgcolor: 'rgba(255,255,255,0.1)', borderRadius: '20px', px: 2, py: 0.5 }}>
                  <Avatar sx={{ width: 32, height: 32, bgcolor: '#ff4081' }}>
                    {user[0].toUpperCase()}
                  </Avatar>
                  <Typography sx={{ color: '#fff', fontWeight: 500 }}>
                    {user}
                  </Typography>
                </Box>
                <IconButton
                  onClick={handleLogout}
                  sx={{
                    color: '#fff',
                    '&:hover': { bgcolor: 'rgba(255,255,255,0.15)' },
                  }}
                >
                  <LogoutIcon />
                </IconButton>
              </>
            ) : (
              <>
                <NavButton component={Link} to="/login">
                  Login
                </NavButton>
                <NavButton
                  variant="contained"
                  component={Link}
                  to="/register"
                  sx={{
                    backgroundColor: '#ff4081',
                    '&:hover': { backgroundColor: '#f50057' },
                  }}
                >
                  Register
                </NavButton>
              </>
            )}
          </Box>
        </Toolbar>
      </Container>
    </StyledAppBar>
  );
}

export default Header;