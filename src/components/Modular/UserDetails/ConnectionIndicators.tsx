// ConnectionIndicators.js
import styled, { keyframes } from "styled-components";

const pulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 0, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 0, 0, 0);
  }
`;

const greenPulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(0, 255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(0, 255, 0, 0);
  }
`;

const yellowPulseAnimation = keyframes`
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 0, 0.7);
  }
  70% {
    box-shadow: 0 0 0 10px rgba(255, 255, 0, 0);
  }
  100% {
    box-shadow: 0 0 0 0 rgba(255, 255, 0, 0);
  }
`;

const Light = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  margin-right: 10px;
`;

const RedLight = styled(Light)`
  background-color: red;
  animation: ${pulseAnimation} 2s infinite;
`;

const GreenLight = styled(Light)`
  background-color: green;
  animation: ${greenPulseAnimation} 2s infinite;
`;

const YellowLight = styled(Light)`
  background-color: yellow;
  animation: ${yellowPulseAnimation} 2s infinite;
`;

export { RedLight, GreenLight, YellowLight };
