import React from 'react';
import TopNav from '../components/Modular/TopNav';
import LeftSide from '../components/Modular/LeftSide';
import Center from '../components/Modular/Center';
import RightSide from '../components/Modular/RightSide';
import PreFooter from '../components/Modular/PreFooter';
import Footer from '../components/Modular/Footer';

import Helmet from 'react-helmet';

import '../index.css';

export default function Root() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-black to-gray-900 flex flex-col">
      <TopNav />
      <main className="flex-grow container mx-auto px-2 py-5"> {/* Updated padding */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-2"> {/* Updated spacing */}
          <div className="w-full"> {/* Updated width */}
            <LeftSide />
          </div>
          <div className="w-full"> {/* Updated width */}
            <Center />
          </div>
          <div className="w-full"> {/* Updated width */}
            <RightSide />
          </div>
        </div>
      </main>
      <PreFooter />
      <Footer />
    </div>
  );
}
