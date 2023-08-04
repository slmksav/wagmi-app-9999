import React from 'react';
import { CircularProgress } from '@mui/material';
import { motion } from 'framer-motion';

const RatingBar: React.FC<{ score: number }> = ({ score }) => {
  const percentage = Math.min(Math.max(score, 0), 100);

  return (
    <div className="relative h-16 ml-2w-32 mt-2">
      {/* Score display and CircularProgress */}
      <motion.div
        className="absolute h-16 w-32 flex items-center justify-center font-bold text-white"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)', // Center the content
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <CircularProgress
          variant="determinate"
          value={percentage}
          color={percentage >= 50 ? 'primary' : 'secondary'}
          size={80}
          thickness={4}
        />
        <div className="text-sm" style={{ position: 'absolute' }}>{`${percentage}/100`}</div>
      </motion.div>
    </div>
  );
};

export default RatingBar;
