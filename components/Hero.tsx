import React from 'react';
import { ChevronDown } from 'lucide-react';

export const Hero: React.FC = () => {
  return (
    <div className="relative h-screen w-full bg-gradient-to-br from-slate-900 via-juventud-blue to-slate-900 flex flex-col justify-center items-center text-center px-4 overflow-hidden">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden opacity-20 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-juventud-sky rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-blue-600 rounded-full blur-3xl"></div>
      </div>

      <div className="z-10 animate-fadeIn space-y-6">
        <h1 className="text-6xl md:text-8xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
          Juventud <span className="text-juventud-sky">Master</span>
        </h1>
        <div className="h-1 w-32 bg-juventud-sky mx-auto rounded-full"></div>
        <h2 className="text-2xl md:text-3xl font-light text-slate-200 tracking-[0.2em] uppercase">
          Planificación 2026
        </h2>
      </div>

      <div className="absolute bottom-10 animate-bounce">
        <ChevronDown className="w-10 h-10 text-juventud-sky opacity-80" />
      </div>
    </div>
  );
};
