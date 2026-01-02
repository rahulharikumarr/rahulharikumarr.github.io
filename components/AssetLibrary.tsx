
import React from 'react';
import { motion } from 'framer-motion';
import { ASSETS, COLORS } from '../constants';

export const AssetLibrary: React.FC = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      className="w-full max-w-6xl p-4 md:p-8 mx-auto pb-32 md:pb-48"
    >
      <div className="flex flex-col md:flex-row justify-between items-end mb-8 md:mb-12 border-b-[8px] border-black pb-4">
        <h2 className="text-4xl md:text-8xl font-black uppercase tracking-tighter text-black">
          Asset <span className="text-[#00FFFF]">Library</span>
        </h2>
        <div className="text-[10px] md:text-sm font-black uppercase text-zinc-400">
          Source: /Users/Rahul/Playground/
        </div>
      </div>

      <div className="columns-1 sm:columns-2 lg:columns-3 gap-6 md:gap-10 space-y-6 md:space-y-10">
        {ASSETS.map((asset, i) => (
          <motion.div
            key={i}
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: i * 0.1 }}
            className="break-inside-avoid"
          >
            <div className="bg-white border-[3px] md:border-[6px] border-black p-2 md:p-3 shadow-[4px_4px_0px_0px_#000] group cursor-crosshair">
              <div className="relative overflow-hidden aspect-auto border-2 border-black">
                <img
                  src={asset.url}
                  alt={asset.name}
                  className="w-full h-auto grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-500"
                />

                {/* CMYK Overlay Effect on Hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity duration-300">
                  <div className="absolute inset-0 mix-blend-screen bg-[#FF00FF]/10" />
                  <div className="absolute inset-0 mix-blend-screen bg-[#00FFFF]/10 translate-x-1" />
                </div>
              </div>

              <div className="mt-2 md:mt-3 flex justify-between items-center bg-zinc-100 p-1 md:p-2 border-t-2 border-black">
                <span className="text-[7px] md:text-[10px] font-black uppercase truncate text-black pr-2">
                  {asset.name}
                </span>
                <div className="w-2 h-2 md:w-3 md:h-3 border border-black group-hover:bg-[#39FF14] transition-colors" />
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      <div className="mt-16 flex justify-center w-full">
        <div className="border-[3px] border-black px-6 py-3 font-black uppercase text-xs md:text-sm bg-white shadow-[4px_4px_0px_0px_#39FF14] flex items-center gap-4">
          <span>FILES_TOTAL: {ASSETS.length}</span>
          <div className="w-1 h-6 bg-black" />
          <span>ENCODING: UTF-8</span>
        </div>
      </div>
    </motion.div>
  );
};
