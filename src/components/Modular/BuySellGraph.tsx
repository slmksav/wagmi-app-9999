import React from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

const GraphContainer = styled.div`
  position: relative;
  margin-top: -10rem; /* Adjust this value to move the graph up or down */
`;

const BuysText = styled.div<{ sellPercentage: number }>`
  position: absolute;
  top: -20px; /* Adjust this value to control the distance from the graph */
  left: -10px;
  transform: translateX(${props => props.sellPercentage}%);
  color: white;
  font-size: 12px;
`;

const SellsText = styled.div<{ sellPercentage: number }>`
  position: absolute;
  top: -20px; /* Adjust this value to control the distance from the graph */
  right: 0;
  right: -20px;
  transform: translateX(-${props => 100 - props.sellPercentage}%);
  color: white;
  font-size: 12px;
`;

const AmountText = styled.div<{ align: 'left' | 'right' }>`
  position: absolute;
  top: 10px;
  ${props => (props.align === 'left' ? 'left: 0;' : 'right: 0;')}
  color: white;
  font-size: 12px;
`;

interface BuySellGraphProps {
  buyPercentage: number;
  sellPercentage: number;
  buysAmount: number;
  sellsAmount: number;
}

const BuySellGraph: React.FC<BuySellGraphProps> = ({
  buyPercentage,
  sellPercentage,
  buysAmount,
  sellsAmount,
}) => {
  return (
    <GraphContainer>
      <div className="w-full h-4 bg-red-500 relative mt-2">
        <motion.div
          initial={{ width: `${sellPercentage}%` }}
          animate={{ width: `${buyPercentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-green-500 absolute top-0 left-0"
        />
      </div>
      <div className="gruppo text-m">
        <BuysText sellPercentage={sellPercentage}>
          BUYS
          <AmountText align="left"><div className="audiowide mt-0.5 text-green-300" style={{ fontSize: '0.6rem' }}>{buysAmount}</div></AmountText>
        </BuysText>
        <SellsText sellPercentage={sellPercentage}>
          SELLS
          <AmountText align="right"><div className="audiowide mt-0.5 text-red-300" style={{ fontSize: '0.6rem' }}>{sellsAmount}</div></AmountText>
        </SellsText>
      </div>
    </GraphContainer>
  );
};

export default BuySellGraph;
