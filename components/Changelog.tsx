
import React from 'react';
import { motion } from 'framer-motion';
import { EXPERIENCE, COLORS } from '../constants';

export const Changelog: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -100 }}
      className="w-full max-w-4xl p-4 md:p-8 pb-32 md:pb-48 flex flex-col gap-12 relative"
    >
      <div className="absolute left-[20px] md:left-[40px] top-0 bottom-0 w-[4px] md:w-[8px] bg-black -z-10" />

      <h2 className="text-4xl md:text-7xl font-black uppercase tracking-tighter mb-4 ml-12 md:ml-24">
        The <span className="text-[#FF00FF]">Changelog</span>
      </h2>

      <div className="flex flex-col gap-16 md:gap-24">
        {EXPERIENCE.map((item, i) => (
          <div key={i} className="flex gap-4 md:gap-12 relative group">
            {/* Timeline Marker */}
            <div className="shrink-0 flex items-start justify-center pt-2">
              {item.status === 'CURRENT BUILD' ? (
                <motion.div
                  animate={{ scale: [1, 1.3, 1], opacity: [1, 0.5, 1] }}
                  transition={{ repeat: Infinity, duration: 1 }}
                  className="w-10 h-10 md:w-20 md:h-20 bg-[#39FF14] border-4 md:border-8 border-black shadow-[4px_4px_0px_0px_#000]"
                />
              ) : (
                <div className="w-10 h-10 md:w-20 md:h-20 bg-white border-4 md:border-8 border-black flex items-center justify-center shadow-[4px_4px_0px_0px_#000]">
                  <span className="text-xl md:text-4xl font-black text-black">X</span>
                </div>
              )}
            </div>

            {/* Content */}
            <div className="flex-1 bg-white border-[3px] md:border-[6px] border-black p-4 md:p-8 shadow-[6px_6px_0px_0px_#FF00FF] md:shadow-[12px_12px_0px_0px_#FF00FF]">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 border-b-[3px] md:border-b-4 border-black pb-2 md:pb-4 mb-4 md:mb-6">
                <div>
                  <div className="text-[10px] md:text-sm font-black text-white bg-black px-2 py-0.5 inline-block mb-1">
                    {item.version} ({item.status})
                  </div>
                  <h3 className="text-xl md:text-4xl font-black uppercase leading-none text-black">
                    {item.role}
                  </h3>
                </div>
                <div className="text-sm md:text-2xl font-black text-[#FF00FF] uppercase">
                  @ {item.company}
                </div>
              </div>

              <ul className="flex flex-col gap-2 md:gap-4">
                {item.bullets.map((bullet, j) => (
                  <li key={j} className="flex gap-2 md:gap-3 items-start">
                    <span className="text-[#39FF14] font-black mt-1">{">>"}</span>
                    <span className="text-[10px] md:text-lg font-bold text-zinc-700 uppercase leading-tight">
                      {bullet}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 text-center md:text-left ml-0 md:ml-24">
        <div className="inline-block bg-black text-[#39FF14] px-4 py-2 font-black text-xs uppercase">
          End of history reached. Current build optimized.
        </div>
      </div>
    </motion.div>
  );
};
