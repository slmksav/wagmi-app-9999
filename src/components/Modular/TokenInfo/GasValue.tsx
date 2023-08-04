import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';

const GasValue: React.FC = () => {
  const [gasValue, setGasValue] = useState('Loading...');

  const fetchGasPrice = async () => {
    try {
      const response = await axios.get(
        'https://carthage-backend-infura-production.up.railway.app/gasprice',
      );
      return response.data.gasPrice;
    } catch (error) {
      console.error('Error fetching gas price:', error);
      return 'N/A'; 
    }
  };

  const fetchETHPriceInEUR = async () => {
    try {
      const response = await axios.get(
        'https://api.coingecko.com/api/v3/simple/price',
        {
          params: {
            ids: 'ethereum',
            vs_currencies: 'eur',
          },
        }
      );
      return response.data.ethereum.eur;
    } catch (error) {
      console.error('Error fetching ETH price in EUR:', error);
      return 'N/A'; 
    }
  };

  const updateGasValue = async () => {
    const gasPriceInGwei = await fetchGasPrice();
    const gasLimit = 184555; 
    const priceOfGweiInETH = gasPriceInGwei * 10 ** -9;

    const ethPriceInEUR = await fetchETHPriceInEUR();

    const gasFeeInEUR = gasLimit * gasPriceInGwei * 10 ** -9 * ethPriceInEUR;

    setGasValue(gasFeeInEUR.toFixed(2));
  };

  useEffect(() => {
    updateGasValue();

    // Update gas fee value every 10 seconds
    const interval = setInterval(() => {
      updateGasValue();
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem' }}>
      <div className="text-white">
        <FontAwesomeIcon
          icon={faGasPump}
          style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
        />
      </div>
      <div className="gruppo text-white text-sm">
        <span>
          Avg. <b>Gas:</b> {gasValue} EUR
        </span>
      </div>
    </div>
  );
};

export default GasValue;
