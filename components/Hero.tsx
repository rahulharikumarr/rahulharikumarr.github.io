
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS } from '../constants';

interface HeroProps {
  onEnter: () => void;
  disableHover: boolean;
}

export const Hero: React.FC<HeroProps> = ({ onEnter, disableHover }) => {
  const [isHovered, setIsHovered] = useState(false);

  const originalImg = "/assets/profile-original.jpg";
  const glitchImg = "/assets/profile-glitch.jpg";

  return (
    <motion.div
      initial={{ y: 20, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ x: -1000, skewX: 10, opacity: 0, transition: { duration: 0.6, ease: "circIn" } }}
      className="w-full max-w-6xl flex flex-col md:flex-row items-center justify-center gap-6 md:gap-12 px-4 md:px-8"
    >
      {/* Profile Image - Mobile Scaling Fix */}
      <motion.div
        initial={{ rotate: -5, scale: 0.9 }}
        animate={{ rotate: 0, scale: 1 }}
        onMouseEnter={disableHover ? undefined : () => setIsHovered(true)}
        onMouseLeave={disableHover ? undefined : () => setIsHovered(false)}
        onClick={() => setIsHovered(!isHovered)}
        className="relative shrink-0 cursor-crosshair group mt-2 md:mt-0 touch-manipulation"
      >
        <div className="w-40 h-52 md:w-72 md:h-96 bg-zinc-200 border-[4px] md:border-[6px] border-black shadow-[6px_6px_0px_0px_#39FF14] md:shadow-[16px_16px_0px_0px_#39FF14] relative overflow-hidden flex items-center justify-center">
          <div className="absolute inset-0 bg-black">
            <motion.img
              src={originalImg}
              alt="Rahul Hari Original"
              className="w-full h-full object-cover grayscale"
              animate={{
                opacity: isHovered ? 0 : 1,
                scale: isHovered ? 1.05 : 1
              }}
              transition={{ duration: 0.2 }}
            />

            <motion.img
              src={glitchImg}
              alt="Rahul Hari Glitch"
              className="w-full h-full object-cover absolute top-0 left-0"
              initial={{ opacity: 0 }}
              animate={{
                opacity: isHovered ? 1 : 0,
                scale: isHovered ? 1 : 0.95
              }}
              transition={{ duration: 0.2 }}
            />
          </div>

          <div className="absolute inset-0 pointer-events-none opacity-20 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.25)_50%),linear-gradient(90deg,rgba(255,0,0,0.06),rgba(0,255,0,0.02),rgba(0,0,255,0.06))] bg-[length:100%_4px,3px_100%]" />

          <div className="absolute top-1.5 left-1.5 md:top-3 md:left-3 text-[7px] md:text-[10px] font-black bg-black text-[#39FF14] px-1 md:px-2 py-0.5 z-20 uppercase tracking-tighter border border-[#39FF14]">
            {isHovered ? "CHAOS" : "STABLE"}
          </div>

          <div className="absolute bottom-0 right-0 w-5 h-5 md:w-8 md:h-8 border-t-2 border-l-2 border-[#FF00FF] bg-black/50 backdrop-blur-sm flex items-center justify-center text-[7px] md:text-[10px] font-black text-white">
            {isHovered ? "X" : "01"}
          </div>
        </div>

        <motion.div
          animate={{ y: isHovered ? -3 : 0 }}
          className="absolute -bottom-2 -right-2 md:-bottom-6 md:-right-6 bg-white border-[2px] md:border-[3px] border-black p-1.5 md:p-3 text-[7px] md:text-[11px] text-black font-black shadow-[2px_2px_0px_0px_#FF00FF] md:shadow-[4px_4px_0px_0px_#FF00FF] z-30"
        >
          LOS ANGELES, CA <br />
          VER: 2.5
        </motion.div>
      </motion.div>

      {/* Hero Text - Mobile Optimized Sizes to prevent clipping */}
      <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-2xl w-full">
        <div className="relative mb-2 md:mb-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.05 }}
            className="absolute -top-4 md:-top-16 left-1/2 md:-left-8 -translate-x-1/2 md:translate-x-0 text-[60px] md:text-[140px] font-black text-black select-none pointer-events-none tracking-tighter"
          >
            HARI
          </motion.div>

          <h1 className="text-5xl md:text-9xl font-black tracking-tighter leading-none uppercase relative z-10 flex flex-col items-center md:items-start">
            <span className="text-[#FF00FF]">Rahul</span>
            <span className="bg-black text-[#39FF14] px-2 md:px-4 mt-0.5 md:-ml-4 inline-block transform -rotate-1">Hari</span>
          </h1>
        </div>

        <div className="border-l-[2px] md:border-l-8 border-black pl-3 md:pl-6 py-1 md:py-2 flex flex-col gap-2 md:gap-6 items-center md:items-start">
          <p className="text-lg md:text-3xl font-black uppercase leading-[1.1] tracking-tighter text-black">
            AI DESIGNER <br className="hidden md:block" />
            & CREATIVE ENGINEER..
          </p>

          <p className="text-[11px] md:text-lg font-bold text-zinc-600 uppercase leading-tight max-w-[280px] md:max-w-md">
            SPECIALIZING IN BUILDING SYSTEMS THAT BRIDGE THE GAP BETWEEN MACHINE LEARNING LOGIC AND <span className="text-black bg-[#FF00FF]/20 px-1">AESTHETICS</span>.
          </p>

          <div className="flex gap-2.5 md:gap-4 items-center">
            <div className="flex gap-0.5 md:gap-1">
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-[#00FFFF] border border-black" />
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-[#FF00FF] border border-black" />
              <div className="w-2.5 h-2.5 md:w-4 md:h-4 bg-[#FFFF00] border border-black" />
            </div>
            <span className="text-[6px] md:text-[10px] font-black uppercase tracking-widest text-zinc-400 underline decoration-[#39FF14] decoration-2">Verified_Developer_2025</span>
          </div>

          <motion.button
            onClick={(e) => {
              e.stopPropagation();
              onEnter();
            }}
            whileHover={{ x: 5, backgroundColor: COLORS.HIVIS_GREEN, color: COLORS.BLACK }}
            className="relative z-[60] cursor-pointer mt-1 md:mt-4 bg-black text-white px-4 md:px-10 py-2 md:py-5 text-xs md:text-2xl font-black uppercase border-[2px] md:border-4 border-black transition-all shadow-[4px_4px_0px_0px_#000] md:shadow-[10px_10px_0px_0px_#000] flex items-center justify-center gap-2 md:gap-4 group w-full md:w-auto"
          >
            Explore Projects
            <motion.svg
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1 }}
              width="14" height="14" md:width="24" md:height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="4"
            >
              <path d="M5 12h14M12 5l7 7-7 7" />
            </motion.svg>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};
