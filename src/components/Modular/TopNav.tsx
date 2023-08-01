import React from 'react';
import styled from 'styled-components';
import Navigation from '../Navigation/Navigation';

const GlowingText = styled.div`
  font-size: 2rem;
  font-weight: bold;
  font-family: 'audiowide', sans-serif;
  color: white;
`;

const TopNav: React.FC = () => {
  return (
    <nav className="bg-gradient-to-b from-gray-900 w-full p-4">
      <div className="container mx-auto flex flex-col sm:flex-row items-center justify-between">
        <div className="flex flex-col items-center sm:items-start">
          <GlowingText className="text-center sm:text-left">MODULAR AUTOTRADING WEB DAPP</GlowingText>
          <div className="text-sm font-bold allerta-stencil text-blue-100 sm:hidden">TRADE THE FUTURE. NOW.</div> {/* Hide on mobile */}
          <div className="text-sm allerta-stencil text-blue-100 hidden sm:block ml-6">TRADE THE FUTURE. NOW.</div> {/* Show on larger screens and apply ml-28 class */}
        </div>
        <Navigation />
      </div>
    </nav>
  );
};

export default TopNav;
