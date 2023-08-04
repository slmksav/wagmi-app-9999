import React, { useState } from 'react';
import EthLatestDeployed from './TokenInfo/EthLatestDeployed';
import BscLatestDeployed from './TokenInfo/EthLatestDeployed'; // Fix import to BscLatestDeployed
import ethchain from './img/ethchain.svg';
import { Button, ButtonGroup } from '@mui/material'; // Import Button and ButtonGroup from Material UI
import { Theme, SwapWidget } from "@uniswap/widgets";

// Define a custom theme to override default attributes
const theme: Theme = {
  fontFamily: '"Helvetica"',
};


const RightSide: React.FC = () => {
  const [activeButton, setActiveButton] = useState('eth');

  const handleButtonClick = (buttonType: string) => {
    setActiveButton(buttonType);
  };

  return (
    <div className="flex h-full flex-col space-y-4">
      <div className="flex-grow bg-white bg-opacity-5 p-2">
      </div>
      <div className="flex-grow overflow-auto bg-white bg-opacity-5 p-1">
        <h2 className="audiowide text-center text-xl font-bold text-white">
          LATEST DEPLOYED TOKENS
        </h2>
        <div className="mt-4 flex justify-center space-x-4">
          <ButtonGroup variant="contained" color="primary">
            {/* Use Button instead of div */}
            <Button
              onClick={() => handleButtonClick('eth')} // Add an arrow function here
              variant={activeButton === 'eth' ? 'contained' : 'outlined'} // Highlight the active button
            >
              <div className="audiowide">ETH</div>
              <div>
                {' '}
                <img
                  src={ethchain}
                  alt="Ethchain"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            </Button>
            <Button
              onClick={() => handleButtonClick('bsc')} // Add an arrow function here
              variant={activeButton === 'bsc' ? 'contained' : 'outlined'} // Highlight the active button
            >
              <div className="audiowide">BSC</div>
              <div>
                {' '}
                <img
                  src={ethchain}
                  alt="Ethchain"
                  style={{ width: '20px', height: '20px' }}
                />
              </div>
            </Button>
          </ButtonGroup>
        </div>
        {activeButton === 'eth' ? <EthLatestDeployed /> : <BscLatestDeployed />}
      </div>
    </div>
  );
};

export default RightSide;
