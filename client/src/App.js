import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Header from './assets/Header';
import SongList from './components/SongList';
import MainPage from './components/MainPage';
import CreateSong from './components/CreateSong';
import EditSong from './components/EditSong';
import Register from './components/Register';
import Login from './components/Login';
import Public from './components/Public';
import UserSongs from './components/UserSongs';
import Search from './components/Search';
import About from './components/About';
import './App.css';

const theme = createTheme();

function App() {
  const [user, setUser] = useState(null);

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Header user={user} setUser={setUser} />
        <Container>
          <Routes>
            <Route exact path="/" element={<MainPage  user={user}/>} />
            <Route path="/songList" element={<SongList user={user} />} />
            <Route path="/addSong" element={<CreateSong user={user} />} />
            <Route path="/editSong/:id" element={<EditSong />} />
            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login setUser={setUser} />} />
            <Route path="/public" element={<Public user={user} />} />
            <Route path="/userSongs/:username" element={<UserSongs user={user} />} />
            <Route path="/search" element={<Search />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </Container>
      </Router>
    </ThemeProvider>
  );
}

export default App;