import React from 'react';

const PreFooter: React.FC = () => {
  return (
    <div className="bg-gray-300 p-4">
      <div className="flex flex-col sm:flex-row">
        <div className="flex-1 sm:w-1/2 sm:mr-2 bg-blue-400 h-32 mb-2 sm:mb-0"></div>
        <div className="flex-1 sm:w-1/2 sm:ml-2 bg-red-400 h-32"></div>
      </div>
    </div>
  );
};

export default PreFooter;
