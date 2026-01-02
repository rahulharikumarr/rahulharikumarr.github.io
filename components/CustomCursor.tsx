
import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { COLORS } from '../constants';

interface CustomCursorProps {
  mousePos: { x: number; y: number };
  fatigue: number;
}

export const CustomCursor: React.FC<CustomCursorProps> = ({ mousePos, fatigue }) => {
  const [trail, setTrail] = useState<{ x: number, y: number }[]>([]);
  
  useEffect(() => {
    setTrail(prev => {
      const trailLength = Math.floor(fatigue / 15); // Shorter trail for usability
      return [{ x: mousePos.x, y: mousePos.y }, ...prev.slice(0, trailLength)];
    });
  }, [mousePos, fatigue]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999]">
      {/* Ghost Trail */}
      {trail.map((pos, i) => {
        if (i === 0) return null; // Don't draw over main cursor
        return (
          <div 
            key={i}
            className="absolute w-4 h-4"
            style={{ 
              left: pos.x, 
              top: pos.y, 
              transform: 'translate(-50%, -50%)',
              opacity: 0.6 - (i / trail.length) * 0.5,
              zIndex: 9999 - i
            }}
          >
            <div 
              className="w-full h-full" 
              style={{ 
                backgroundColor: i % 2 === 0 ? COLORS.MAGENTA : COLORS.HIVIS_GREEN,
                clipPath: 'polygon(20% 0%, 80% 0%, 100% 100%, 0% 100%)' 
              }} 
            />
          </div>
        );
      })}

      {/* Main Cursor */}
      <motion.div 
        className="absolute w-8 h-8 border-[3px] border-black flex items-center justify-center bg-white"
        animate={{ 
          rotate: fatigue > 50 ? [0, 90, 180, 270, 360] : 0,
          scale: fatigue > 80 ? 1.2 : 1
        }}
        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
        style={{ 
          left: mousePos.x, 
          top: mousePos.y, 
          transform: 'translate(-50%, -50%)',
          boxShadow: fatigue > 20 ? `4px 4px 0px 0px ${COLORS.HIVIS_GREEN}` : 'none'
        }}
      >
        <div className="w-1.5 h-1.5 bg-black" />
      </motion.div>
    </div>
  );
};
