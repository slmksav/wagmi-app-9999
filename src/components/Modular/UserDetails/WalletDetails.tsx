import React, { useState, useEffect } from "react";
import { Button, Popover, Typography, IconButton } from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle, faTimes } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";
import { useConnect, useAccount, useDisconnect } from "wagmi";

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

const greenPulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
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

const GreenLight = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: green;
  animation: ${greenPulseAnimation} 2s infinite;
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
        sx={{ color: "white", marginRight: "0.2rem", marginTop: "0.2rem" }}
      >
        <FontAwesomeIcon icon={faInfoCircle} />
      </IconButton>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handlePopoverClose}
        anchorOrigin={{
          vertical: "center",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "center",
          horizontal: "left",
        }}
      >
        <IconButton
          aria-label="close"
          size="small"
          style={{ position: "absolute", top: 5, right: 5 }}
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
  const { connect, connectors, error, isLoading, pendingConnector } =
    useConnect();
  const { address, connector, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  // Function to connect wallet
  const connectWallet = async () => {
    if (connectors && connectors.length > 0) {
      try {
        await connect({ connector: connectors[0] });
      } catch (e) {
        console.error(e);
      }
    }
  };

  const disconnectWallet = async () => {
    try {
      await disconnect();
    } catch (e) {
      console.error(e);
    }
  };

  // Handle wallet state changes
  useEffect(() => {
    if (isConnected) {
      // Handle connected state
      console.log("Wallet connected: ", address);
    } else {
      // Handle disconnected state
      console.log("Wallet disconnected");
    }
  }, [isConnected, address]);

  return (
    <div className="flex ml-2 justify-between">
      <div className="flex items-center mr-2 text-sm allerta-stencil">
        {isConnected ? <GreenLight /> : <RedLight />}{" "}
        {/* Conditionally render RedLight or GreenLight */}
        {isConnected ? "Wallet connected!" : "Wallet not connected!"}
      </div>
      {isConnected ? (
        <Button
          variant="contained"
          color="primary"
          onClick={disconnectWallet}
          sx={{
            color: "white",
            border: "1px solid white",
            background: "transparent",
            fontFamily: "Audiowide",
            padding: "0.4rem 0.45rem",
            margin: "0.45rem",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "#1976d2",
              border: "1px solid #1976d2",
              background: "transparent",
            },
            "&:focus": {
              color: "#1976d2",
              border: "1px solid #1976d2",
            },
            "&:active": {
              color: "#1976d2",
              border: "1px solid #1976d2",
            },
          }}
        >
          Disconnect Wallet
        </Button>
      ) : (
        <Button
          variant="contained"
          color="primary"
          onClick={connectWallet}
          sx={{
            color: "white",
            border: "1px solid white",
            background: "transparent",
            fontFamily: "Audiowide",
            padding: "0.4rem 0.45rem",
            margin: "0.45rem",
            display: "flex",
            alignItems: "center",
            "&:hover": {
              color: "#1976d2",
              border: "1px solid #1976d2",
              background: "transparent",
            },
            "&:focus": {
              color: "#1976d2",
              border: "1px solid #1976d2",
            },
            "&:active": {
              color: "#1976d2",
              border: "1px solid #1976d2",
            },
          }}
        >
          <InfoButton />
          <span style={{ flex: 1, marginTop: "4px" }}>Connect Wallet</span>
        </Button>
      )}
    </div>
  );
};

export default WalletDetails;
