import React from 'react';

const TimelineItem = ({ month, title, isLast = false }: { month: string, title: string, isLast?: boolean }) => (
  <div className="relative flex-1 flex flex-col items-center text-center group">
    <div className={`w-full h-1 bg-slate-700 absolute top-5 left-1/2 ${isLast ? 'hidden' : ''}`}></div>
    <div className="w-10 h-10 rounded-full bg-slate-900 border-4 border-juventud-sky z-10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform shadow-lg shadow-blue-500/20">
      <div className="w-3 h-3 bg-white rounded-full"></div>
    </div>
    <h4 className="text-juventud-sky font-bold text-lg uppercase tracking-widest mb-2">{month}</h4>
    <p className="text-slate-300 text-sm max-w-[120px]">{title}</p>
  </div>
);

export const Timeline: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-16 text-center">
        <h2 className="text-4xl font-black text-white uppercase italic inline-block border-b-4 border-juventud-blue pb-2">
          Cronograma <span className="text-slate-500">2026</span>
        </h2>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-start gap-8 md:gap-0 px-4">
        <TimelineItem month="Enero" title="Pretemporada Física" />
        <TimelineItem month="Marzo" title="Inicio Ligas & Contrato DT" />
        <TimelineItem month="Julio" title="Evaluación Mitad de Año" />
        <TimelineItem month="Diciembre" title="Cierre Temporada 2026" isLast={true} />
      </div>
    </section>
  );
};
