import React, { useState } from 'react';
import { Button, Popover, Typography, IconButton } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faInfoCircle, faTimes } from '@fortawesome/free-solid-svg-icons';
import styled, { keyframes } from 'styled-components';

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;

const RedLight = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: red;
  animation: ${pulseAnimation} 2s infinite;
  margin-right: 10px;
`;

const InfoButton: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <IconButton
        onClick={handlePopoverOpen}
        size="small"
        sx={{ color: 'white', marginRight: '0.2rem', marginTop: '0.2rem' }} // Adjust margins as needed
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
      >
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: 'absolute', top: 5, right: 5 }}
          onClick={handlePopoverClose}
        >
          <FontAwesomeIcon icon={faTimes} />
        </IconButton>
        <Typography sx={{ p: 1, maxWidth: 250 }}>
          <div className="gruppo text-black">
            What is a Web3 Wallet? I dont know bro Who knows bro
          </div>
        </Typography>
      </Popover>
    </>
  );
};

const WalletDetails: React.FC = () => {
  return (
    <div className="flex ml-2 justify-between">
      {/* Red round light */}
      <div className="flex items-center mr-2 text-sm allerta-stencil">
        <RedLight /> Wallet not connected!
      </div>
      <Button
        variant="contained"
        color="primary"
        sx={{
          color: 'white',
          border: '1px solid white',
          background: 'transparent',
          fontFamily: 'Audiowide',
          padding: '0.4rem 0.45rem', // Add padding around the button (adjust as needed)
          margin: '0.45rem', // Add margin all around the button (adjust as needed)
          display: 'flex', // Set the button to use flexbox
          alignItems: 'center', // Align items to the center
          '&:hover': {
            color: '#1976d2', // Replace with your primary color
            border: '1px solid #1976d2', // Replace with your primary color
            background: 'transparent',
          },
          '&:focus': {
            color: '#1976d2', // Replace with your primary color
            border: '1px solid #1976d2', // Replace with your primary color
          },
          '&:active': {
            color: '#1976d2', // Replace with your primary color
            border: '1px solid #1976d2', // Replace with your primary color
          },
        }}
      >
        <InfoButton />
        <span style={{ flex: 1, marginTop: '4px' }}>Connect Wallet</span> {/* Use a span to allow the text to shrink */}
      </Button>
    </div>
  );
};

export default WalletDetails;
