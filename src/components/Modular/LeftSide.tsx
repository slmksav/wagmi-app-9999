import React, {useState} from 'react';
import {Button} from '@mui/material';
import EthTokenInfo from './TokenInfo/EthTokenInfo';
import BscTokenInfo from './TokenInfo/BscTokenInfo';
import SystemTime from './SystemTime';
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faSync} from '@fortawesome/free-solid-svg-icons';
import {tokenData1min, tokenData5min, tokenData15min} from '../Data/tokenData';
import ethchain from './img/ethchain.svg';

const LeftSide: React.FC = () => {
  const [selectedChain, setSelectedChain] = useState('ETH');
  const [selectedInterval, setSelectedInterval] = useState('1min');
  const [reloadIconRotation, setReloadIconRotation] = useState(0);
  const [fetchTime, setFetchTime] = useState(false); // New state variable

  const handleEthButtonClick = () => {
    setSelectedChain('ETH');
  };

  const handleBscButtonClick = () => {
    setSelectedChain('BSC');
  };

  const handleIntervalButtonClick = (interval: string) => {
    setSelectedInterval(interval);
  };

  const handleReloadClick = () => {
    setReloadIconRotation((prevRotation) => prevRotation + 30);
    setFetchTime(true); // Start fetching time when the reload button is pressed
    // Add any other reload functionality you may need here
  };

  const handleTimeFetched = () => {
    setFetchTime(false); // Reset fetchTime state after fetching time
  };

  const selectedTokenData =
    selectedInterval === '1min'
      ? tokenData1min
      : selectedInterval === '5min'
      ? tokenData5min
      : tokenData15min;

  return (
    <div className="h-full bg-white bg-opacity-5 text-white">
      <div className="mb-4 flex justify-center space-x-3 p-1">
        <Button
          variant="outlined"
          color={selectedChain === 'ETH' ? 'primary' : 'inherit'}
          onClick={handleEthButtonClick}
        >
          <div className="audiowide">ETH</div>
          <div>
        {' '}
        <img
          src={ethchain}
          alt="Ethchain"
          style={{width: '20px', height: '20px'}}
        />
      </div>
        </Button>
        <Button
          variant="outlined"
          color={selectedChain === 'BSC' ? 'primary' : 'inherit'}
          onClick={handleBscButtonClick}
        >
          <div className="audiowide">BSC</div>
        </Button>
      </div>
      <div className="mb-2 flex justify-center space-x-4 md:justify-center md:space-x-4 md:pl-6">
        <div className="flex space-x-4">
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIntervalButtonClick('1min')}
            size="small"
            style={{
              border:
                selectedInterval === '1min'
                  ? '2px solid #1976d2'
                  : '1px solid #ffffff',
              backgroundColor:
                selectedInterval === '1min' ? 'transparent' : '#fffff',
              color: selectedInterval === '1min' ? '#1976d2' : 'white',
              minWidth: '3rem',
            }}
          >
            <div className="audiowide">1M</div>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIntervalButtonClick('5min')}
            size="small"
            style={{
              border:
                selectedInterval === '5min'
                  ? '2px solid #1976d2'
                  : '1px solid #ffffff',
              backgroundColor:
                selectedInterval === '5min' ? 'transparent' : 'transparent',
              color: selectedInterval === '5min' ? '#1976d2' : 'white',
              minWidth: '3rem',
            }}
          >
            <div className="audiowide">5M</div>
          </Button>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleIntervalButtonClick('15min')}
            size="small"
            style={{
              border:
                selectedInterval === '15min'
                  ? '2px solid #1976d2'
                  : '1px solid #ffffff',
              backgroundColor:
                selectedInterval === '15min' ? 'transparent' : 'transparent',
              color: selectedInterval === '15min' ? '#1976d2' : 'white',
              minWidth: '3rem',
            }}
          >
            <div className="audiowide">15M</div>
          </Button>
        </div>
        <div className="flex items-center md:flex-row md:justify-end md:space-x-4 md:pl-0">
          <button
            type="button"
            onClick={handleReloadClick}
            className="rounded-full bg-transparent p-1 text-white md:hover:text-blue-200"
          >
            <FontAwesomeIcon
              icon={faSync}
              style={{transform: `rotate(${reloadIconRotation}deg)`}}
            />
          </button>
        </div>
      </div>
      <div className="gruppo mb-2 flex justify-center text-sm">
        {' '}
        {/* Wrap remaining buttons in a container */}
        Last updated:{' '}
        <SystemTime fetchTime={fetchTime} onTimeFetched={handleTimeFetched} />
      </div>
      {selectedChain === 'ETH' ? (
        <EthTokenInfo {...selectedTokenData} />
      ) : (
        <BscTokenInfo {...selectedTokenData} />
      )}
    </div>
  );
};

export default LeftSide;
