
import React, { useState, useEffect, useRef } from 'react';
import { COLORS } from '../constants';

export const Terminal: React.FC = () => {
  const [lines, setLines] = useState<string[]>(['BOOTING...', 'SYSTEM_READY', '']);
  const [inputText, setInputText] = useState('');
  const terminalEndRef = useRef<HTMLDivElement>(null);

  const bioContent = `IDENTITY: CREATIVE_ENGINEER
MISSION: BREAKING_THE_GRID
CORE_SKILLS: REACT, AI, LLMS, BRUTALISM
STATUS: ONLINE`;

  useEffect(() => {
    let charIndex = 0;
    const interval = setInterval(() => {
      if (charIndex < bioContent.length) {
        setLines(prev => {
          const newPrev = [...prev];
          const currentChar = bioContent[charIndex];

          if (currentChar === '\n') {
            newPrev.push('');
          } else {
            const lastIdx = newPrev.length - 1;
            // Ensure we never add undefined
            newPrev[lastIdx] = (newPrev[lastIdx] || '') + currentChar;
          }
          return newPrev;
        });
        charIndex++;
      } else {
        clearInterval(interval);
      }
    }, 20);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    terminalEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [lines]);

  const handleCommand = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;
    const cmd = inputText.toLowerCase();

    let response = `ERR: "${cmd.toUpperCase()}" NOT_FOUND`;
    if (cmd === 'help') response = 'CMDS: HELP, STATUS, CLEAR';
    if (cmd === 'status') response = 'SYSTEM_OPTIMAL_100%';

    setLines(prev => [...prev, `> ${inputText}`, response, '']);
    setInputText('');
  };

  return (
    <div className="w-full max-w-[240px] md:max-w-[320px] h-28 md:h-44 bg-black p-2 md:p-3 border-2 border-black shadow-[3px_3px_0px_0px_#FF00FF] flex flex-col overflow-hidden pointer-events-auto">
      <div className="flex justify-between items-center text-[6px] md:text-[8px] text-zinc-600 mb-0.5 md:mb-1 border-b border-zinc-900 pb-0.5 md:pb-1">
        <span className="font-mono uppercase">sys.terminal_v1</span>
        <span className="text-[#39FF14]">● ONLINE</span>
      </div>
      <div className="flex-1 overflow-y-auto font-mono text-[7px] md:text-[9px] text-zinc-300 leading-tight">
        {lines.map((line, i) => (
          <div key={i} className="mb-0.5">
            {line.split(' ').map((word, j) => {
              const isHighlight = word.includes('CORE') || word.includes('MISSION') || word.includes('ERR') || word.includes('IDENTITY');
              return (
                <span
                  key={j}
                  style={{
                    color: isHighlight ? COLORS.MAGENTA : 'inherit',
                  }}
                >
                  {word}{' '}
                </span>
              );
            })}
          </div>
        ))}
        <div ref={terminalEndRef} />
      </div>
      <form onSubmit={handleCommand} className="mt-0.5 md:mt-1 flex border-t border-zinc-900 pt-0.5 md:pt-1">
        <span className="text-[#39FF14] text-[7px] md:text-[9px] mr-1 font-black">{">"}</span>
        <input
          className="bg-transparent border-none outline-none text-[7px] md:text-[9px] text-white flex-1 font-mono"
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="..."
        />
      </form>
    </div>
  );
};
