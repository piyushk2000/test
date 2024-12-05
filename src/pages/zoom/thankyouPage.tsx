import React, { useEffect } from 'react';
import { Box, Typography, Button } from '@mui/material';
import logo from "../../assets/images/logo_hd.png";

interface ThankYouPageProps {
  onJoinAgain: () => void;
}

const ThankYouPage: React.FC<ThankYouPageProps> = ({ onJoinAgain }) => {
  useEffect(() => {
    localStorage.removeItem('zoom_counter_obj');
  }, []);

  return (
    <Box sx={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
    }}>
      <img src={logo} alt="logo" width="200px" />
      <Box sx={{
        mt: 5,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Typography variant="body1" sx={{ color: 'rgb(236, 147, 36)', fontWeight: 'bold', marginY: 2, textAlign: 'center' }}>
          Thank You for Joining!
        </Typography>
        <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center', width: { md: '60%' }, p: 5 }}>
          We hope you had a great experience. Feel free to reach out if you have any questions or need assistance.
          <br />
          <a style={{color:'blue'}} href="mailto:support@infollion.com">support@infollion.com</a>
        </Typography>
        <Button
          variant="contained"
          onClick={onJoinAgain}
          sx={{
            border: 'none',
            color: 'white',
            fontSize: '16px',
            borderRadius: '30px',
            textTransform: 'initial',
            padding: '8px 16px',
            backgroundColor: 'rgb(236, 147, 36)',
            boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px',
            fontFamily: 'inherit',
            width: '200px',
            mt: 2,
            fontWeight: 500,
            '&:hover': { backgroundColor: 'rgb(216, 127, 16)' }
          }}
        >
          Join Again
        </Button>
      </Box>
    </Box>
  );
};

export default ThankYouPage;