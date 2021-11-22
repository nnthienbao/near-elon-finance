import React from 'react';
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export default function SignIn({signIn}) {
  return (
    <Container>
    <Box sx={{  display: 'flex', justifyContent: 'center' }}>
      <Typography variant="h5" gutterBottom component="div">
          Please Login here...
      </Typography>
    </Box>
    <Box sx={{  display: 'flex', justifyContent: 'center' }}>
    <Button color="inherit" onClick={signIn}>Login</Button>
    </Box>
    </Container>
  );
}
