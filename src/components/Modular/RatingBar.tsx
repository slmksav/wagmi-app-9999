import React from 'react';
import {CircularProgress} from '@mui/material';
import {motion} from 'framer-motion';



const RatingBar: React.FC<{score: number}> = ({score}) => {
  const percentage = Math.min(Math.max(score, 0), 100);

  return (
    <div className="relative h-16 ml-2w-32">
      <motion.div
        className="absolute h-16 w-32"
        style={{rotate: '-90deg'}}
        initial={{opacity: 0, scale: 0}}
        animate={{opacity: 1, scale: 1}}
        transition={{duration: 0.5}}
      >
        <CircularProgress
          variant="determinate"
          value={percentage}
          color={percentage >= 50 ? 'primary' : 'secondary'}
          size={80} // Adjust the size of the CircularProgress (smaller value)
          thickness={4} // Adjust the thickness of the CircularProgress (smaller value)
        />
      </motion.div>
      {/* Score display */}
      <motion.div
        className="absolute flex h-16 w-32 items-center justify-center font-bold text-white"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        initial={{opacity: 0}}
        animate={{opacity: 1}}
        transition={{duration: 0.5, delay: 0.5}}
      >
        <div className="ml-4 mt-12 text-sm">{`${percentage}/100`}</div>
      </motion.div>
    </div>
  );
};

export default RatingBar;
