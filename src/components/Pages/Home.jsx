import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Button, 
  Box,
  Paper
} from '@mui/material';
import Navbar from '../Sharedc/Navbar';
import Footer from '../Sharedc/Footer';

const Home = () => {
  return (
    <Box sx={{ 
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column'
    }}>
      <Navbar />
      <Container 
        component="main" 
        maxWidth="md" 
        sx={{
          mt: 8,
          mb: 8,
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}
      >
        <Paper 
          elevation={3}
          sx={{
            p: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            borderRadius: 2
          }}
        >
          <Typography 
            variant="h3" 
            component="h1" 
            gutterBottom
            sx={{
              fontWeight: 'bold',
              color: 'green',
              textAlign: 'center'
            }}
          >
            Welcome to KNUT Financial Dashboard
          </Typography>
          
          <Typography 
            variant="h5" 
            component="h3" 
            gutterBottom
            sx={{
               mt: 4, 
               color: 'green',  

            }}
          >
            Click here to connect your account
          </Typography>

          <Button 
            variant="contained" 
            size="large"
            component={Link}
            to="/Login"
            sx={{
              mt: 3,
              px: 4,
              py: 1.5,
              borderRadius: 2,
              fontSize: '1.2rem'
            }}
          >
            Connect
          </Button>
        </Paper>
      </Container>
      <Footer />
    </Box>
  );
};

export default Home;