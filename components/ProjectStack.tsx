
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PROJECTS, COLORS } from '../constants';

interface ProjectStackProps {
  fatigue: number;
  isTouchDevice: boolean;
}

export const ProjectStack: React.FC<ProjectStackProps> = ({ fatigue, isTouchDevice }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hovered, setHovered] = useState<number | null>(null);
  const lastScrollTime = useRef(0);

  useEffect(() => {
    let touchStartY = 0;

    const handleWheel = (e: WheelEvent) => {
      const now = Date.now();
      if (now - lastScrollTime.current < 400) return;

      if (Math.abs(e.deltaY) > 30) {
        if (e.deltaY > 0) {
          setActiveIndex(prev => (prev + 1) % PROJECTS.length);
        } else {
          setActiveIndex(prev => (prev - 1 + PROJECTS.length) % PROJECTS.length);
        }
        lastScrollTime.current = now;
      }
    };

    const handleTouchStart = (e: TouchEvent) => {
      touchStartY = e.touches[0].clientY;
    };

    const handleTouchEnd = (e: TouchEvent) => {
      const touchEndY = e.changedTouches[0].clientY;
      const deltaY = touchStartY - touchEndY;
      const now = Date.now();

      if (now - lastScrollTime.current < 400) return;

      if (Math.abs(deltaY) > 50) {
        if (deltaY > 0) {
          // Swipe Up -> Next
          setActiveIndex(prev => (prev + 1) % PROJECTS.length);
        } else {
          // Swipe Down -> Prev
          setActiveIndex(prev => (prev - 1 + PROJECTS.length) % PROJECTS.length);
        }
        lastScrollTime.current = now;
      }
    };

    window.addEventListener('wheel', handleWheel);
    window.addEventListener('touchstart', handleTouchStart);
    window.addEventListener('touchend', handleTouchEnd);

    return () => {
      window.removeEventListener('wheel', handleWheel);
      window.removeEventListener('touchstart', handleTouchStart);
      window.removeEventListener('touchend', handleTouchEnd);
    };
  }, []);

  return (
    <div className="relative w-full max-w-5xl flex items-center justify-center px-2 py-4 md:py-10">
      {/* Side Label - Desktop Only */}
      <div className="hidden lg:block absolute -left-16 top-1/2 -translate-y-1/2 -rotate-90 text-[11px] font-black tracking-[0.5em] text-black/20 pointer-events-none uppercase">
        ARCHIVE_RECORD_0X{activeIndex.toString(16)}
      </div>

      <AnimatePresence mode="popLayout">
        {PROJECTS.map((project, i) => {
          const isTop = i === activeIndex;
          if (!isTop) return null;

          return (
            <motion.div
              key={project.id}
              initial={{ x: 30, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              exit={{
                x: -400,
                skewX: -5,
                opacity: 0,
                transition: { duration: 0.3, ease: "anticipate" }
              }}
              // Changed from absolute to relative for the active card to push parent height
              className="relative w-full max-w-4xl bg-white border-[3px] md:border-[6px] border-black shadow-[8px_8px_0px_0px_#000] md:shadow-[30px_30px_0px_0px_#000] p-3 md:p-6 flex flex-col md:flex-row gap-3 md:gap-8 cursor-pointer z-10 touch-manipulation"
              onMouseEnter={() => !isTouchDevice && setHovered(i)}
              onMouseLeave={() => !isTouchDevice && setHovered(null)}
              onClick={() => setActiveIndex((i + 1) % PROJECTS.length)}
            >
              {/* Outer Frame Label */}
              <div className="absolute top-0 right-0 bg-black text-white px-1.5 md:px-3 py-0.5 md:py-1 text-[6px] md:text-[10px] font-black uppercase tracking-widest z-20">
                PROJ_{project.id}
              </div>

              <div className="flex-1 flex flex-col gap-2 md:gap-6">
                <div className="flex justify-between items-start border-b-[3px] md:border-b-[8px] border-black pb-2 md:pb-4">
                  <div className="pr-2 md:pr-4">
                    <h2 className="text-lg md:text-5xl font-black tracking-tighter leading-none mb-1 md:mb-2 uppercase text-black">{project.title}</h2>
                    <div className="flex items-center gap-2 md:gap-4">
                      <div className="text-[6px] md:text-[11px] font-black bg-black text-white px-1 py-0.5 uppercase">ID: {project.id}</div>
                      <div className="text-[6px] md:text-[11px] font-black uppercase text-zinc-400">STATUS: <span className="text-[#FF00FF]">{project.status}</span></div>
                    </div>
                  </div>
                  <div className="text-lg md:text-4xl font-black bg-[#39FF14] text-black px-2 md:px-4 py-0.5 md:py-2 border-[2px] md:border-[4px] border-black shrink-0">
                    {i + 1}
                  </div>
                </div>

                <div className="flex-1 flex flex-col gap-2 md:gap-4">
                  <p className="text-[10px] md:text-2xl font-black uppercase leading-tight md:leading-[1.1] tracking-tighter text-[#FF00FF]">
                    {project.description}
                  </p>

                  <div className="flex flex-col gap-3 md:gap-4 mt-auto">
                    <div className="flex flex-wrap gap-1 md:gap-2">
                      {project.tags.map(tag => (
                        <span key={tag} className="bg-black text-white text-[6px] md:text-[11px] px-1.5 md:px-4 py-0.5 md:py-1 font-black uppercase tracking-tight md:tracking-widest border border-black hover:bg-[#39FF14] hover:text-black transition-colors">
                          {tag}
                        </span>
                      ))}
                      {project.link && (
                        <a
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={(e) => e.stopPropagation()}
                          className="bg-[#39FF14] text-black text-[6px] md:text-[11px] px-1.5 md:px-4 py-0.5 md:py-1 font-black uppercase tracking-tight md:tracking-widest border border-black hover:bg-black hover:text-[#39FF14] transition-colors flex items-center gap-1"
                        >
                          VISIT_SITE <span className="text-[8px] md:text-[12px]">↗</span>
                        </a>
                      )}
                    </div>

                    <div className="grid grid-cols-2 gap-2 md:gap-4 text-[8px] md:text-[12px] font-black uppercase w-full md:w-2/3">
                      <div className="bg-zinc-100 p-1 md:p-2 border-[2px] md:border-[3px] border-black flex flex-col shadow-[2px_2px_0px_0px_#000]">
                        <span className="text-zinc-400 text-[5px] md:text-[9px] mb-0.5">FILE_SIZE</span>
                        <span className="text-[10px] md:text-base text-[#FF00FF]">{project.fileSize}</span>
                      </div>
                      <div className="bg-zinc-100 p-1 md:p-2 border-[2px] md:border-[3px] border-black flex flex-col shadow-[2px_2px_0px_0px_#000]">
                        <span className="text-zinc-400 text-[5px] md:text-[9px] mb-0.5">YEAR</span>
                        <span className="text-[10px] md:text-base text-[#FF00FF]">{project.date}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full md:w-[42%] flex flex-col shrink-0 justify-center">
                <div className={`relative ${project.isVertical ? 'aspect-[9/16] max-w-[160px] md:max-w-[200px] mx-auto' : 'aspect-video'} w-full max-h-[40vh] md:max-h-[50vh] border-[3px] md:border-[6px] border-black overflow-hidden group bg-zinc-100 shadow-[4px_4px_0px_0px_#FF00FF] md:shadow-[12px_12px_0px_0px_#FF00FF]`}>
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover md:grayscale md:group-hover:grayscale-0 md:group-hover:scale-105 transition-all duration-700"
                  />
                  <div className="absolute inset-0 border-[4px] md:border-[12px] border-white/5 pointer-events-none" />
                </div>
              </div>

              {/* Status Tooltip - Hidden on mobile */}
              <AnimatePresence>
                {hovered === i && (
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.8, opacity: 0 }}
                    className="hidden md:block absolute top-12 right-12 bg-[#FF00FF] text-white px-4 py-2 text-[12px] font-black z-50 border-[4px] border-black shadow-[8px_8px_0px_0px_#000]"
                  >
                    CLICK_TO_VIEW_NEXT.EXE
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </AnimatePresence>

      {/* Background decoration layers - kept absolute */}
      <div className="absolute top-2 left-2 md:top-8 md:left-8 w-[95%] md:w-full max-w-4xl h-full border-[2px] md:border-[6px] border-black -z-10 bg-white" />
      <div className="absolute top-4 left-4 md:top-16 md:left-16 w-[95%] md:w-full max-w-4xl h-full border-[2px] md:border-[6px] border-black -z-20 bg-white shadow-[4px_4px_0px_0px_#39FF14] md:shadow-[10px_10px_0px_0px_#39FF14]" />
    </div>
  );
};
