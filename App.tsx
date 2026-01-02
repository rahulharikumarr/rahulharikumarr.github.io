
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { COLORS, PROJECTS } from './constants';
import { BackgroundGrid } from './components/BackgroundGrid';
import { CustomCursor } from './components/CustomCursor';
import { ProjectStack } from './components/ProjectStack';
import { Terminal } from './components/Terminal';
import { DraggableItem } from './components/DraggableItem';
import { Hero } from './components/Hero';
import { Changelog } from './components/Changelog';
import { AssetLibrary } from './components/AssetLibrary';

type ViewState = 'hero' | 'projects' | 'experience' | 'playground';

const App: React.FC = () => {
  const [fatigue, setFatigue] = useState(0);
  const [isChaos, setIsChaos] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [view, setView] = useState<ViewState>('hero');
  const [windowWidth, setWindowWidth] = useState(typeof window !== 'undefined' ? window.innerWidth : 1200);
  const [isTouchDevice, setIsTouchDevice] = useState(false);
  const lastInteractionTime = useRef(Date.now());

  useEffect(() => {
    const handleResize = () => setWindowWidth(window.innerWidth);
    const checkTouch = () => setIsTouchDevice('ontouchstart' in window || navigator.maxTouchPoints > 0);

    window.addEventListener('resize', handleResize);
    checkTouch();

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const now = Date.now();
      if (now - lastInteractionTime.current > 10) {
        setFatigue(prev => Math.min(prev + 0.1, 100));
        lastInteractionTime.current = now;
      }
    };

    const handleWheel = (e: WheelEvent) => {
      setFatigue(prev => Math.min(prev + 1, 100));
      lastInteractionTime.current = Date.now();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('wheel', handleWheel);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('wheel', handleWheel);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      if (now - lastInteractionTime.current > 200) {
        setFatigue(prev => Math.max(prev - 2, 0));
      }
    }, 30);
    return () => clearInterval(interval);
  }, []);

  const NavButton = ({ target, label, color = 'black' }: { target: ViewState, label: string, color?: string }) => (
    <button
      onClick={() => setView(target)}
      className={`bg-black text-white px-2.5 md:px-4 py-1 md:py-2 border-[2px] md:border-[3px] border-black hover:bg-[#39FF14] hover:text-black transition-all font-black text-[8px] md:text-[11px] uppercase shadow-[2px_2px_0px_0px_#000] ${view === target ? 'bg-[#39FF14] text-black' : ''}`}
    >
      {label}
    </button>
  );

  return (
    <div
      className={`relative w-full h-screen overflow-hidden selection:bg-[${COLORS.HIVIS_GREEN}] ${isChaos ? 'invert' : ''} ${isTouchDevice ? '' : 'cursor-none'}`}
      style={{ backgroundColor: COLORS.PAPER }}
    >
      <div className="grain" />
      <BackgroundGrid fatigue={fatigue} isResting={fatigue === 0} />

      <div className="relative z-10 w-full h-full flex flex-col pointer-events-none overflow-hidden">

        {/* Nav Dock Header */}
        <header className="flex justify-between items-start pointer-events-auto shrink-0 p-3 md:p-6 z-50">
          <div className="flex flex-col gap-2">
            <div className="flex flex-wrap gap-1 md:gap-2">
              <NavButton target="hero" label="Home" />
              <NavButton target="projects" label="Works" />
              <NavButton target="experience" label="Exp" />
              <NavButton target="playground" label="Play" />
            </div>
            <div className="text-[7px] md:text-[10px] font-bold bg-white border border-black px-1.5 text-[#FF00FF] self-start">v2.1.0_PRO_CORE</div>
          </div>

          <div className="flex justify-end">
            <DraggableItem initialPos={{ x: windowWidth < 768 ? 0 : -20, y: 0 }} disabled={windowWidth < 768}>
              <div className="bg-black text-white p-2 md:p-3 border-2 border-black flex flex-col gap-0.5 w-32 md:w-64 shadow-[3px_3px_0px_0px_#39FF14]">
                <div className="flex justify-between items-center border-b border-zinc-700 pb-0.5 mb-0.5">
                  <span className="text-[7px] md:text-[10px] uppercase font-bold tracking-widest text-[#FF00FF]">SYSTEM_INFO</span>
                  <div className={`w-1 h-1 md:w-2 md:h-2 rounded-full bg-[#39FF14]`} />
                </div>
                <p className="text-[8px] md:text-[11px] font-bold truncate">USER: RAHUL_HARI</p>
                <p className="text-[6px] md:text-[9px] font-mono leading-tight uppercase text-zinc-400">Status: Terminal_Active</p>
              </div>
            </DraggableItem>
          </div>
        </header>

        {/* Scrollable Content Area */}
        <main className="flex-1 relative pointer-events-auto overflow-y-auto overflow-x-hidden w-full">
          <div className="min-h-full w-full flex flex-col items-center justify-start md:justify-center px-4 pb-4 pt-20 md:p-12">
            <AnimatePresence mode="wait">
              {view === 'hero' && <Hero key="hero" onEnter={() => setView('projects')} />}
              {view === 'projects' && <ProjectStack key="projects" fatigue={fatigue} />}
              {view === 'experience' && <Changelog key="experience" />}
              {view === 'playground' && <AssetLibrary key="playground" />}
            </AnimatePresence>
          </div>
        </main>

        {/* Compact Footer */}
        <footer className="absolute bottom-0 w-full p-2 md:p-6 flex flex-col md:flex-row justify-between items-center md:items-end pointer-events-auto z-50 bg-white/40 md:bg-transparent backdrop-blur-md md:backdrop-blur-none border-t border-black/10 md:border-t-0">
          <div className="flex flex-row md:flex-row gap-2 md:gap-3 items-center md:items-end w-full md:w-auto">
            <Terminal />
            <div className="flex flex-col gap-1 shrink-0">
              <label className="flex items-center gap-1.5 group cursor-pointer bg-white/80 p-1 md:bg-transparent md:p-0 border border-black/5 md:border-0">
                <div className="relative w-4 h-4 md:w-8 md:h-8 border-[2px] md:border-[3px] border-black bg-white flex items-center justify-center">
                  <input
                    type="checkbox"
                    checked={isChaos}
                    onChange={(e) => setIsChaos(e.target.checked)}
                    className="sr-only"
                  />
                  {isChaos && <div className="w-2 h-2 md:w-5 md:h-5 bg-[#FF00FF]" />}
                </div>
                <span className="text-[8px] md:text-[12px] font-black uppercase tracking-tight md:tracking-widest text-[#FF00FF]">Chaos</span>
              </label>
            </div>
          </div>

          <div className="text-right font-mono hidden md:block">
            <div className="text-[12px] font-black uppercase text-[#FF00FF]">Rahul Hari // 2025</div>
            <div className="text-[10px] text-zinc-500 uppercase tracking-widest">Brutalist_Systems_Architect</div>
          </div>
        </footer>
      </div>

      {!isTouchDevice && <CustomCursor mousePos={mousePos} fatigue={fatigue} />}
    </div>
  );
};

export default App;
