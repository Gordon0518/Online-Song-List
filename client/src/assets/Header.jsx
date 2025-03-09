import React from 'react';
import { AppBar, Toolbar, Button, Box, Container, Typography, ButtonGroup } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';

function Header({ user, setUser }) {
  const navigate = useNavigate();

  const handleLogout = () => {
    setUser(null);
    navigate('/');
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom>
            Song List
          </Typography>
        </Container>
        <Box sx={{ flexGrow: 1 }} />
        {user ? (
          <>
            <Typography variant="h6" component="div" sx={{ marginRight: 2 }}>
              Welcome, {user}
            </Typography>
            <Button color="inherit" onClick={handleLogout} size="small">
              Logout
            </Button>
          </>
        ) : (
          <>
            <Button color="inherit" component={Link} to="/login" size="small">
              Login
            </Button>
            <Button color="inherit" component={Link} to="/register" size="small">
              Register
            </Button>
          </>
        )}
      </Toolbar>
      <Toolbar>
        <Container>
          <ButtonGroup variant="text" color="inherit" aria-label="text button group">
            <Button component={Link} to="/" size="small">
              Main
            </Button>
            <Button component={Link} to="/songList" size="small">
              My Songs
            </Button>
            <Button size="small">
              Public Songs List
            </Button>
            <Button size="small">
              Button 4
            </Button>
            <Button size="small">
              Button 5
            </Button>
          </ButtonGroup>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;