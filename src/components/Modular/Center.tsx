import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import TradeConfig from './TradeConfig';
import WalletDetails from './UserDetails/WalletDetails';
import RatingBar from './RatingBar';
import { Button } from '@mui/material';
import BuySellGraph from './BuySellGraph';
import VolChangeGraph from './VolChangeGraph';

const Center: React.FC = () => {
  // Generate dummy data for buy and sell percentages
  const buyPercentage = 70;
  const sellPercentage = 30;
  const buyVolumePercentage = 87;
  const sellVolumePercentage = 13;
  const buyVolume = 8700;
  const sellVolume = 1300;
  const buysAmount = 70;
  const sellsAmount = 30;

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
              <div className="gruppo text-center mt-2 font-bold text-sm text-white">
                <b>HELIX SCORE</b>
              </div>
            </div>
            <BuySellGraph buyPercentage={buyPercentage} sellPercentage={sellPercentage} buysAmount={buysAmount} sellsAmount={sellsAmount} />
            <VolChangeGraph
              buyVolume={buyVolume}
              sellVolume={sellVolume}
              buyVolumePercentage={buyVolumePercentage}
              sellVolumePercentage={sellVolumePercentage}
            />
            <div className="flex justify-end">
              <Button variant="contained" color="primary">
                Click Me
              </Button>
            </div>
          </div>
          <div className="col-span-2 row-span-1 bg-yellow-400">Sup</div>
        </div>
      </div>
    </div>
  );
};

export default Center;
