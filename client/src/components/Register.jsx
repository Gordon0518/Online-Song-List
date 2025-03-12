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

const Register = () => {
  const [username, setUsername] = useState('');
  const [userid, setUserid] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/register', { username, userid, password });
      setUsername('');
      setUserid('');
      setPassword('');
      setError(null);
      navigate('/login');
    } catch (err) {
      console.error('Error registering user:', err);
      setError('Failed to register user');
    }
  };

  return (
    <Box sx={{ background: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', minHeight: '100vh', pt: 8 }}>
      <StyledPaper elevation={3}>
        <Typography 
          variant="h4" 
          sx={{ fontWeight: 700, color: '#1976d2', mb: 4, textAlign: 'center' }}
        >
          Join SongList
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
            label="Username (Display Name)"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            variant="outlined"
            fullWidth
            sx={{ '& .MuiOutlinedInput-root': { borderRadius: '8px' } }}
          />
          <TextField
            label="User ID"
            value={userid}
            onChange={(e) => setUserid(e.target.value)}
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
          <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center', mt: 2 }}>
            <Button
              type="submit"
              variant="contained"
              size="large"
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '8px',
                backgroundColor: '#1976d2',
                '&:hover': { backgroundColor: '#1565c0' },
              }}
            >
              Register
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => navigate('/')}
              sx={{
                py: 1.5,
                px: 4,
                borderRadius: '8px',
                borderColor: '#1976d2',
                color: '#1976d2',
                '&:hover': { borderColor: '#1565c0', color: '#1565c0' },
              }}
            >
              Cancel
            </Button>
          </Box>
        </Box>
        
        <Typography 
          sx={{ mt: 2, textAlign: 'center', color: '#424242' }}
        >
          Already have an account?{' '}
          <Button component="a" href="/login" sx={{ color: '#1976d2', textTransform: 'none' }}>
            Login
          </Button>
        </Typography>
      </StyledPaper>
    </Box>
  );
};

export default Register;
