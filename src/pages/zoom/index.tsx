// This is landing page
import { useEffect, useRef, useState } from 'react';
import { Grid, Paper, Button, TextField, Typography, Box } from '@mui/material';
import CryptoJS from 'crypto-js';
import VideocamIcon from '@mui/icons-material/Videocam';
import PersonIcon from '@mui/icons-material/Person';
import logo from "../../assets/images/logo_hd.png";
import sidePanel from "../../assets/images/sidePanel_new.svg";
import {
  leftSidePanelStyles,
  mainGridStyles,
  rightSidePanelStyles,
} from "./styles";
import MeetingSDK from './meetingSDK';
import zoom_announcment from '../../assets/audio/zoom_announcement.mp3'
import ThankYouPage from './thankyouPage';

const secretKey = 'pQxk6MFev1';
interface ZoomObj {
  [key: string]: string;
}

export default function ZoomPage() {
  const [linkNotValid, setLinkNotValid] = useState(false);
  const [userName, setUserName] = useState('');
  const [nickName, setNickName] = useState('');
  const [isNickName, setIsNicName] = useState(false); // its for checking => if to put counter or not to put counter,
  const [showLandingPage, setShowLandingPage] = useState(true);
  const [showThankYou, setShowThankYou] = useState(false);
  const [zoomObj, setZoomObj] = useState<ZoomObj>(() => {
    const storedData = localStorage.getItem('zoom_counter_obj');
    return storedData ? JSON.parse(storedData) : {};
  });
  const [meetingData, setMeetingData] = useState({
    meetingNumber: '',
    passWord: '',
    sdkKey: '',
    role: 0,
    isExpert: false,
  });

  const audioRef = useRef(null);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const encryptedData = urlParams.get('id') || '';
    const left = urlParams.get('left');

    try {
      if (left === 'true') {
        setShowThankYou(true);
      } else {
      const decryptedData = CryptoJS.AES.decrypt(encryptedData, secretKey);
      const decryptedJson = JSON.parse(decryptedData.toString(CryptoJS.enc.Utf8));
      console.log("🚀 ~ decryptData ~ decryptedJson:", decryptedJson);

      setMeetingData({
        meetingNumber: decryptedJson.id || '',
        passWord: decryptedJson.password || '',
        sdkKey: decryptedJson.client || '',
        role: (decryptedJson.name === 'Infollion Client' || decryptedJson.name === 'Infollion') ? 1 : 0,
        isExpert: (decryptedJson.name === 'Infollion Expert') ? true : false
      });
      setUserName(decryptedJson.name);
      }
      
    } catch (error) {
      console.error('Error decrypting data:', error);
      setLinkNotValid(true);
    }
  }, []);

  const toPlayAudio = () => {
    let str = zoomObj?.[meetingData.meetingNumber] || ''
    let nameToMatch = str.substring(0, str.lastIndexOf(' '))
    return ( !(nameToMatch == userName) );
  }

  const handleJoin = (useNickname: boolean = false) => {
    if (useNickname) {
      setIsNicName(true)
      setUserName(nickName);
    }
    setShowLandingPage(false);

    // Play the audio
    if (audioRef.current && meetingData.isExpert && toPlayAudio() ) {
      (audioRef.current as HTMLAudioElement).play().catch(error => {
        console.error("Audio playback failed:", error);
      });
    }
  };

  useEffect(() => {
    if (meetingData.meetingNumber && !meetingData.isExpert) {
      handleJoin()
    }
  }, [meetingData])

  const handleJoinAgain = () => {
    // Remove the 'left' parameter from the URL
    const newUrl = window.location.href.replace(/[?&]left=true/, '');
    window.location.href = newUrl;
  };

  if (showThankYou) {
    return <ThankYouPage onJoinAgain={handleJoinAgain} />;
  }

  if (linkNotValid) {
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
            Invalid Link
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 2, textAlign: 'center', width: { md: '50%' }, p: 5 }}>
            The link provided appears to be either invalid or incorrect. Kindly verify the link in your email, or contact your point of contact at Infollion for assistance. Alternatively, you may reach out to our support team at{' '}
            <a href="mailto:support@infollion.com" style={{ color: 'rgb(0, 0, 238)', textDecoration: 'underline', cursor: 'pointer' }}>
              support@infollion.com
            </a>.
          </Typography>
        </Box>
      </Box>
    );
  }

  return (
    <>
      <audio ref={audioRef} src={zoom_announcment} />
      {showLandingPage && meetingData.isExpert && toPlayAudio() ? (
        <Grid container component="main" sx={{ height: "100vh" }}>
          <Grid item xs={false} sm={4} md={6} className="svg-container" sx={mainGridStyles}>
            <div style={leftSidePanelStyles}>
              <img src={sidePanel} width="100%" height="100%" alt="panel" />
            </div>
          </Grid>
          <Grid item xs={12} sm={12} md={6} component={Paper} elevation={6} square>
            <Box sx={rightSidePanelStyles}>
              <img src={logo} alt="logo" width="200px" style={{ marginBottom: '100px' }} />

              {meetingData.isExpert &&
                <>

                  <Button
                    variant="contained"
                    color="primary"
                    startIcon={<VideocamIcon />}
                    onClick={() => handleJoin()}
                    sx={{ border: 'none', color: 'white', fontSize: '16px', borderRadius: '30px', textTransform: 'initial', padding: '8px 16px', backgroundColor: 'rgb(236, 147, 36)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px', fontFamily: 'inherit', width: '100%', mt: meetingData.isExpert ? 0 : 15, fontWeight: 500, '&:hover': { backgroundColor: 'rgb(216, 127, 16)' } }}
                  >
                    Join Anonymously
                  </Button>
                  <TextField
                    variant="standard"
                    label="Nickname"
                    sx={{ width: '90%', mb: 2, borderRadius: '30px', mt: 5 }}
                    onChange={(e) => setNickName(e.target.value)}
                  />
                  <Button
                    variant="contained"
                    startIcon={<PersonIcon />}
                    onClick={() => {
                      handleJoin(true)
                    }
                    }
                    sx={{ border: 'none', color: 'white', fontSize: '16px', borderRadius: '30px', textTransform: 'initial', padding: '8px 16px', backgroundColor: 'rgb(236, 147, 36)', boxShadow: 'rgba(0, 0, 0, 0.2) 0px 0px 10px', fontFamily: 'inherit', width: '100%', marginTop: '1rem', fontWeight: 500, '&:hover': { backgroundColor: 'rgb(216, 127, 16)' } }}
                  >
                    Join with Nickname
                  </Button>
                </>
              }
            </Box>
          </Grid>
        </Grid>
      ) : (
        <>

          {meetingData.meetingNumber &&
            <MeetingSDK
              meetingNumber={meetingData.meetingNumber}
              passWord={meetingData.passWord}
              sdkKey={meetingData.sdkKey}
              role={meetingData.role}
              userName={userName}
              isNickName={isNickName}
              zoomObj={zoomObj}
              setZoomObj={setZoomObj}
            />}
        </>

      )}
    </>
  );
}