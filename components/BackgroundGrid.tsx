
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

interface BackgroundGridProps {
  fatigue: number;
  isResting: boolean;
}

export const BackgroundGrid: React.FC<BackgroundGridProps> = ({ fatigue, isResting }) => {
  const gridSize = 60;
  
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-30">
      <motion.svg 
        width="100%" 
        height="100%" 
        animate={{
          scale: isResting ? [1, 1.02, 1] : 1,
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut"
        }}
      >
        <defs>
          <pattern id="grid" width={gridSize} height={gridSize} patternUnits="userSpaceOnUse">
            <path 
              d={`M ${gridSize} 0 L 0 0 0 ${gridSize}`} 
              fill="none" 
              stroke={COLORS.HIVIS_GREEN} 
              strokeWidth="0.5"
            />
            {fatigue > 50 && Math.random() > 0.98 && (
              <circle cx={gridSize/2} cy={gridSize/2} r="1.5" fill={COLORS.MAGENTA} className="animate-pulse" />
            )}
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
        
        {/* Occasional glitching wires - only at high fatigue */}
        {fatigue > 60 && Array.from({ length: 3 }).map((_, i) => (
           <motion.line
            key={i}
            x1={Math.random() * 100 + "%"}
            y1={Math.random() * 100 + "%"}
            x2={Math.random() * 100 + "%"}
            y2={Math.random() * 100 + "%"}
            stroke={Math.random() > 0.5 ? COLORS.MAGENTA : COLORS.CYAN}
            strokeWidth="1"
            initial={{ opacity: 0 }}
            animate={{ 
              opacity: [0, 0.4, 0],
              x1: [Math.random() * 100 + "%", Math.random() * 100 + "%"],
              strokeWidth: [1, 4, 1]
            }}
            transition={{ 
              duration: 0.15, 
              repeat: Infinity, 
              repeatDelay: Math.random() * 8 
            }}
           />
        ))}
      </motion.svg>
    </div>
  );
};
