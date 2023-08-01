import React from 'react';
import TradeConfig from './TradeConfig';
import WalletDetails from './UserDetails/WalletDetails';
import RatingBar from './RatingBar';
import { Button } from '@mui/material'; // Import the Button component from MUI

const Center: React.FC = () => {
  return (
    <div className="my-1 text-white">
      <WalletDetails />
      <div className="flex justify-center">
        <div
          className="grid h-96 w-96 grid-cols-2 gap-2 rounded bg-white bg-opacity-5 p-2"
          style={{ width: '100%', height: '100%' }}
        >
          <div className="col-span-1 row-span-1 bg-transparent">
            <TradeConfig />
          </div>
          <div className="col-span-1 row-span-2 bg-transparent flex flex-col justify-between">
            <div>
              <RatingBar score={76} />
              <div className="gruppo mt-8 ml-5 text-left font-bold text-sm text-white">
                <b>HELIX SCORE</b>
              </div>
            </div>
            {/* Add the button to the right of the graphic and text */}
            <div className="flex justify-end">
              <Button variant="contained" color="primary">
                Click Me
              </Button>
            </div>
          </div>
          <div className="col-span-2 row-span-1 bg-yellow-400">
            Sup
          </div>
        </div>
      </div>
    </div>
  );
};

export default Center;
