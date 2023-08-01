// GasValue.tsx
import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGasPump } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios'; // Import Axios

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
      return 'N/A'; // Default value if fetching fails
    }
  };

  const updateGasValue = async () => {
    const gasPrice = await fetchGasPrice();
    setGasValue(gasPrice);
  };

  useEffect(() => {
    // Fetch the initial gas value
    updateGasValue();

    // Update gas value every 10 seconds
    const interval = setInterval(() => {
      updateGasValue();
    }, 10000);

    // Clean up the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ display: 'flex', alignItems: 'center', marginBottom: '0.1rem' }}>
      <div className="text-black">
        <FontAwesomeIcon
          icon={faGasPump}
          style={{ fontSize: '1.5rem', marginRight: '0.5rem' }}
        />
      </div>
      <div className="gruppo text-white">
        <span>
          <b>Gas:</b> {gasValue} Gwei
        </span>
      </div>
    </div>
  );
};

export default GasValue;
