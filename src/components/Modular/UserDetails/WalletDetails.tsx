import React, { useState, useEffect } from "react";
import { Button } from "@mui/material";
import { RedLight, GreenLight, YellowLight } from "./ConnectionIndicators";
import { useConnect, useAccount, useDisconnect, useBalance } from "wagmi";

import ethchain from "../img/ethchain.svg";

const WalletDetails: React.FC = () => {
  const { connect, connectors, isLoading } = useConnect();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect();

  const { data: balanceData, isLoading: isBalanceLoading } = useBalance({
    address: address,
  });

  const wallets = [
    // Example array of wallets with addresses and balances
    {
      address: address,
    },
    {
      address: "0xWalletAddress2",
    },
    // Add more wallets as needed
  ];

  const [selectedWalletIndex, setSelectedWalletIndex] = useState(0);
  const selectedWallet = wallets[selectedWalletIndex];

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

  useEffect(() => {
    if (isConnected) {
      console.log("Wallet connected: ", address);
    } else {
      console.log("Wallet disconnected");
    }
  }, [isConnected, address]);

  return (
    <div className="flex ml-2 flex-col">
      <div className="flex items-center mr-2 text-sm allerta-stencil">
        {isLoading ? (
          <>
            <YellowLight style={{ width: "10px", height: "10px" }} />
            <span>Connecting...</span>
          </>
        ) : isConnected ? (
          <>
            <GreenLight style={{ width: "10px", height: "10px" }} />
            <span>Connected!</span>
          </>
        ) : (
          <>
            <RedLight style={{ width: "10px", height: "10px" }} />
            <span>Not connected!</span>
          </>
        )}
      </div>
      <div className="flex flex-col ml-2">
        {isBalanceLoading ? (
          <span>Loading balance...</span>
        ) : (
          <div>
            <span className="gruppo">
              <b>Address:</b>{" "}
              {selectedWallet.address
                ? `${selectedWallet.address.slice(
                    0,
                    3
                  )}...${selectedWallet.address.slice(-10)}`
                : "None found"}
            </span>
            <div className="flex">
              <span className="gruppo">
                <b>Balance:</b>{" "}
                {balanceData?.formatted
                  ? balanceData.formatted
                  : "Unknown balance"}
              </span>
              <img
                src={ethchain}
                alt="Ethchain"
                style={{ width: "20px", height: "20px", marginLeft: "5px" }}
              />
            </div>
          </div>
        )}
      </div>
      {isConnected ? (
        <Button variant="outlined" color="primary" onClick={disconnectWallet}>
          <div className="audiowide">Disconnect Wallet</div>
        </Button>
      ) : (
        <Button variant="outlined" color="primary" onClick={connectWallet}>
          <div className="audiowide">Connect Wallet</div>
        </Button>
      )}
    </div>
  );
};

export default WalletDetails;
