import React from 'react';
import { Menu, MenuItem, Tooltip, IconButton, styled, Button, Box } from '@mui/material';
import { useSnackbar } from 'notistack';
import PhoneCall from '../../assets/images/expert/call_expert.png';
import Envelope from '../../assets/images/expert/letter_expert.png';
import Contact from '../../assets/images/contact-mail.png';

interface ContactMailProps {
  primary_mobile: string;
  primary_email: string;
}
const imgstyle = {
  height: '17px',
  width: '15px',
}
const imgStyle = {
  height: '17px',
  width: '20px',
};
const imgStyling = {
  width: '15px',
  height: '17px',
}

const iconBackgroundStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '24px',
  height: '24px',
  backgroundColor: '#E7E9E8',
  borderRadius: '50%',

};

const StyledContactMail = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '16px',
  // marginLeft: '7px',
  // marginTop: '8px',
  fontSize: '9px',
  '& .icon, & .text': {
    display: 'flex',
    alignItems: 'center',
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  padding: 0,
  minWidth: 'unset',
  '&:hover': {
    backgroundColor: 'transparent',
  },
}));

const ContactMail: React.FC<ContactMailProps> = ({ primary_mobile, primary_email }) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const { enqueueSnackbar } = useSnackbar();

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleCopy = async (text: string, label: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar(`${label} copied to clipboard`, {
        variant: 'success',
        autoHideDuration: 2000,
        anchorOrigin: { vertical: 'bottom', horizontal: 'left' },
      });
    } catch (err) {
      console.error(`Failed to copy ${label} to clipboard`, err);
    }
  };

  return (
    <>
      {primary_mobile || primary_email ? (
        <StyledContactMail>
          <StyledButton
            id="contact-mail-button"
            aria-controls={open ? 'contact-mail-menu' : undefined}
            aria-haspopup="true"
            aria-expanded={open ? 'true' : undefined}
            onClick={handleClick}
          >
            <Tooltip title="Available" arrow  >
              <img src={Contact} alt="Contact Icon" style={imgstyle} />
            </Tooltip>
          </StyledButton>

          <>
            <Menu
              id="contact-mail-menu"
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} sx={{ margin: '-13px', mb: '5px',mt:'2px',ml:'2px'  }}>
                <Tooltip title="Copy mobile number" arrow>
                  <div onClick={() => handleCopy(primary_mobile, 'Primary Mobile Number')} 
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={iconBackgroundStyle}>
                      <img src={PhoneCall} alt="Phone Call Icon" style={imgStyle} />
                    </div>
                    <span style={{ fontSize: '12px', marginLeft: '7px'}}>{primary_mobile}</span>
                  </div>
                </Tooltip>
              </MenuItem>

              <MenuItem onClick={handleClose} sx={{ margin: '-13px', mb: '2px',mt:'2px',ml:'2px',mr:'2px' }}>
                <Tooltip title="Copy email address" arrow>
                  <div onClick={() => handleCopy(primary_email, 'Primary Email')}
                    style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={iconBackgroundStyle}>
                      <img src={Envelope} alt="Envelope Icon" style={imgStyle} />
                    </div>
                    <span style={{ fontSize: '12px', marginLeft: '7px' }}>{primary_email}</span>
                  </div>
                </Tooltip>
              </MenuItem>
            </Menu>
          </>

        </StyledContactMail>
      ) : (
        <Tooltip title="Contact Details not available" arrow  >
          <img src={Contact} alt="Contact Icon" style={imgStyling} />
        </Tooltip>
      )}
    </>
  );
};

export default ContactMail;