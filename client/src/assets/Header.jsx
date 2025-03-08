import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box, Container } from '@mui/material';
import { Link } from 'react-router-dom';

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom>
            Song List
          </Typography>
        </Container>
        <Box sx={{ flexGrow: 1 }} />
        <Button color="inherit" component={Link} to="/login" size="small">
          Login
        </Button>
        <Button color="inherit" component={Link} to="/register" size="small">
          Register
        </Button>
      </Toolbar>
      <Toolbar>
        <Container>
          <Button color="inherit" component={Link} to="/" size="small">
            Main
          </Button>
          <Button color="inherit" component={Link} to="/songList" size="small">
            Button 2
          </Button>
          <Button color="inherit" size="small">
            Button 3
          </Button>
          <Button color="inherit" size="small">
            Button 4
          </Button>
          <Button color="inherit" size="small">
            Button 5
          </Button>
        </Container>
      </Toolbar>
    </AppBar>
  );
}

export default Header;