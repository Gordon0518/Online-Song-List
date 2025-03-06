import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import SongList from './components/SongList';
import CreateSong from './components/CreateSong';
import EditSong from './components/EditSong';
import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Container>
          <Typography variant="h3" component="h1" gutterBottom>
            Song List
          </Typography>
          <Routes>
            <Route exact path="/" element={<SongList />} />
            <Route path="/addSong" element={<CreateSong />} />
            <Route path="/editSong/:id" element={<EditSong />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;