import React, { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock } from '@fortawesome/free-solid-svg-icons';

interface SystemTimeProps {
  fetchTime: boolean;
  onTimeFetched: () => void; // Callback function to reset fetchTime state
}

const SystemTime: React.FC<SystemTimeProps> = ({ fetchTime, onTimeFetched }) => {
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    if (fetchTime) {
      setCurrentTime(new Date());
      onTimeFetched(); // Reset fetchTime state after fetching time
    }
  }, [fetchTime, onTimeFetched]);

  return (
    <div className="flex items-center ml-2 text-sm">
      <FontAwesomeIcon icon={faClock} className="text-white mr-1" />
      <span className="text-white">{currentTime.toLocaleTimeString()}</span>
    </div>
  );
};

export default SystemTime;
