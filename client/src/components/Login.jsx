import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Box, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  borderRadius: '16px',
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
  maxWidth: 400,
  margin: '0 auto',
}));

const Login = ({ setUser }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/login', { username, password });
      if (response.data.message === 'Login successful') {
        setUser(username);
        navigate('/');
      }
    } catch (err) {
      setError('Invalid username or password');
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', pt: 8 }}>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: '#1976d2', mb: 4, textAlign: 'center' }}
        >
          Welcome Back
        </Typography>
        
        {error && (
          <Typography 
            sx={{ 
              color: '#d32f2f', 
              bgcolor: 'rgba(211, 47, 47, 0.1)', 
              p: 1, 
              borderRadius: '4px', 
              mb: 3,
              textAlign: 'center'
            }}
          >
            {error}
          </Typography>
        )}
        
        <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
          <TextField
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <Button
            type="submit"
            variant="contained"
            size="large"
            sx={{
              mt: 2,
              py: 1.5,
              borderRadius: '8px',
              backgroundColor: '#1976d2',
              '&:hover': { backgroundColor: '#1565c0' },
            }}
          >
            Login
          </Button>
        </Box>
        
        <Typography 
          sx={{ mt: 2, textAlign: 'center', color: '#424242' }}
        >
          Don't have an account?{' '}
          <Button component="a" href="/register" sx={{ color: '#1976d2', textTransform: 'none' }}>
            Register
          </Button>
        </Typography>
      </StyledPaper>
    </Box>
  );
};

export default Login;