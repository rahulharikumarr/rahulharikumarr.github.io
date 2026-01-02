
import React from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

interface FatigueBarProps {
  fatigue: number;
}

export const FatigueBar: React.FC<FatigueBarProps> = ({ fatigue }) => {
  const isHigh = fatigue > 70;
  
  return (
    <div className="flex flex-col gap-1 items-end">
      <div className="flex gap-1 justify-between w-64 px-1">
        <span className="text-[10px] font-black uppercase">SYSTEM_STAMINA</span>
        <span className={`text-[10px] font-black ${isHigh ? 'text-red-500 animate-pulse' : ''}`}>
          {fatigue.toFixed(0)}%
        </span>
      </div>
      <div className="w-64 h-6 border-2 border-black bg-white p-1 relative overflow-hidden">
        <motion.div 
          className="h-full bg-black transition-all duration-300"
          style={{ 
            width: `${100 - fatigue}%`,
            backgroundColor: isHigh ? COLORS.MAGENTA : COLORS.BLACK
          }}
        />
        {/* Warning Indicator */}
        {isHigh && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-[8px] font-black text-white mix-blend-difference">COOL_DOWN_REQUIRED</span>
          </div>
        )}
      </div>
      <div className="text-[8px] text-zinc-400 uppercase">STOP_FOR_2S_TO_RECALIBRATE</div>
    </div>
  );
};
