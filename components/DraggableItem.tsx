
import React, { useState } from 'react';
import { motion, useMotionValue } from 'framer-motion';

interface DraggableItemProps {
  children: React.ReactNode;
  initialPos?: { x: number, y: number };
  disabled?: boolean;
}

export const DraggableItem: React.FC<DraggableItemProps> = ({ 
  children, 
  initialPos = { x: 0, y: 0 },
  disabled = false
}) => {
  const x = useMotionValue(initialPos.x);
  const y = useMotionValue(initialPos.y);
  const [isDragging, setIsDragging] = useState(false);

  // If disabled, just return children in a static motion div
  if (disabled) {
    return (
      <motion.div
        style={{ position: 'relative', zIndex: 10 }}
        className="pointer-events-auto"
      >
        {children}
      </motion.div>
    );
  }

  return (
    <motion.div
      drag
      dragMomentum={false}
      onDragStart={() => setIsDragging(true)}
      onDragEnd={() => setIsDragging(false)}
      style={{ x, y, position: 'absolute', zIndex: isDragging ? 100 : 10 }}
      whileDrag={{ 
        scale: 1.05, 
        rotate: 1,
        filter: 'drop-shadow(10px 10px 0px rgba(0,0,0,0.2))' 
      }}
      className="cursor-grab active:cursor-grabbing pointer-events-auto"
    >
      {children}
    </motion.div>
  );
};
