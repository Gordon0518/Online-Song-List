import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from './assets/Header';
import SongList from './components/SongList';
import MainPage from './components/MainPage';
import CreateSong from './components/CreateSong';
import EditSong from './components/EditSong';
import Register from './components/Register';

import './App.css';

const theme = createTheme();

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header />
        <Container>
          <Routes>
            <Route exact path="/" element={<MainPage />} />
            <Route path="/songList" element={<SongList />} />
            <Route path="/addSong" element={<CreateSong />} />
            <Route path="/editSong/:id" element={<EditSong />} />
            <Route path="/register" element={<Register />} />
          
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;