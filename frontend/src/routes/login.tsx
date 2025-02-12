import { createFileRoute, useNavigate } from '@tanstack/react-router'
import { useState } from 'react';
import { Button, TextField, Typography } from '@mui/material';
import { fetchClient } from '../client';

export const Route = createFileRoute('/login')({
  component: RouteComponent,
})

function RouteComponent() {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const onLogin = async () => {
    const response = await fetchClient.POST('/auth/access', {
      body: {
        username,
        password,
      }
    })

    if (response.error) {
      return setError(response.error.message as string)
    }

    localStorage.setItem('access', response.data.access);
    localStorage.setItem('refresh', response.data.refresh);
    navigate({ to: '/' });
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen" >
      <div className='flex flex-col items-center w-full max-w-md p-8 rounded shadow-lg bg-white text-black' >
        <Typography variant="h4" gutterBottom>
          Login
        </Typography>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          margin="normal"
          fullWidth
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          margin="normal"
          fullWidth
        />
        {error && <Typography color="error">{error}</Typography>}
        <Button variant="contained" color="primary" onClick={() => onLogin()} sx={{ mt: 2 }}>
          Login
        </Button>
      </div>
    </div>
  );
}
