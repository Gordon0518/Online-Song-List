import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Container } from '@mui/material';

const Register = () => {
  const [username, setUserName] = useState('');
  const [userid, setUserID] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', {
        username,
        userid,
        password,
      });
      setUserName('');
      setUserID('');
      setPassword('');
      setError(null);
      navigate('/');
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register user');
    }
  };

  return (
    <Container>
      <Typography variant="h4" component="h2" gutterBottom>
        Register
      </Typography>
      {error && <Typography color="error">{error}</Typography>}
      <form onSubmit={handleSubmit}>
        <TextField
          label="User Name (Will show on the page)"
          value={username}
          onChange={(e) => setUserName(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="User ID"
          value={userid}
          onChange={(e) => setUserID(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary" style={{ marginTop: '20px' }}>
          Register
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

export default Register;
