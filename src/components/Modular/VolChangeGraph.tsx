import React from "react";
import { motion } from "framer-motion";
import styled from "styled-components";

const GraphContainer = styled.div`
  position: relative;
  margin-top: -9rem; /* Adjust this value to move the graph up or down */
`;

const BuysText = styled.div<{ sellVolume: number }>`
  position: absolute;
  top: -20px; /* Adjust this value to control the distance from the graph */
  left: -8px;
  transform: translateX(${(props) => props.sellVolume}%);
  color: white;
  font-size: 12px;
`;

const SellsText = styled.div<{ buyVolume: number }>`
  position: absolute;
  top: -20px; /* Adjust this value to control the distance from the graph */
  right: -8px;
  transform: translateX(-${(props) => 100 - props.buyVolume}%);
  color: white;
  font-size: 12px;
`;

const VolumeText = styled.div<{ align: "left" | "right" }>`
  position: relative;
  top: -8px;
  ${(props) => (props.align === "left" ? "left: 0;" : "right: 0;")}
  color: white;
  font-size: 12px;
`;

interface VolChangeGraphProps {
  buyVolume: number;
  sellVolume: number;
  buyVolumePercentage: number;
  sellVolumePercentage: number;
}

const VolChangeGraph: React.FC<VolChangeGraphProps> = ({
  buyVolume,
  sellVolume,
  buyVolumePercentage,
  sellVolumePercentage,
}) => {
  return (
    <GraphContainer>
      <div className="w-full h-4 bg-red-500 relative mt-2">
        <motion.div
          initial={{ width: `${sellVolumePercentage}%` }}
          animate={{ width: `${buyVolumePercentage}%` }}
          transition={{ duration: 0.5 }}
          className="h-full bg-green-500 absolute top-0 left-0"
        />
      </div>
      <div className="gruppo text-m">
        <BuysText sellVolume={sellVolumePercentage}>
          BUY VOL.
          <VolumeText align="left">
          <div className="audiowide mt-0.5 text-green-300" style={{ fontSize: '0.6rem' }}>${buyVolume}</div>
          </VolumeText>
        </BuysText>
        <SellsText buyVolume={buyVolumePercentage}>
          SELL VOL.
          <VolumeText align="right">
            <div className="audiowide mt-0.5 text-red-300" style={{ fontSize: '0.6rem' }}>
              ${sellVolume}
            </div>
            </VolumeText>
        </SellsText>
      </div>
    </GraphContainer>
  );
};

export default VolChangeGraph;
