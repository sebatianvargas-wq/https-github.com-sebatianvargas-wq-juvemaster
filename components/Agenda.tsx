import React from 'react';
import { Users, Trophy, DollarSign, CalendarDays } from 'lucide-react';

const AgendaCard = ({ icon: Icon, title, items }: { icon: any, title: string, items: string[] }) => (
  <div className="bg-slate-800/50 p-6 rounded-xl border border-slate-700 hover:border-juventud-sky transition-all hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 group">
    <div className="bg-slate-900 w-12 h-12 rounded-lg flex items-center justify-center mb-4 group-hover:bg-juventud-blue transition-colors">
      <Icon className="w-6 h-6 text-juventud-sky group-hover:text-white" />
    </div>
    <h3 className="text-xl font-bold text-white mb-4 uppercase tracking-wide">{title}</h3>
    <ul className="space-y-2">
      {items.map((item, idx) => (
        <li key={idx} className="text-slate-300 text-sm flex items-start gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-juventud-sky mt-1.5"></span>
          {item}
        </li>
      ))}
    </ul>
  </div>
);

export const Agenda: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="mb-12 border-b border-slate-800 pb-4">
        <h2 className="text-4xl font-black text-white uppercase italic">Agenda <span className="text-juventud-sky">2026</span></h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <AgendaCard 
          icon={Users}
          title="El Equipo"
          items={["Análisis de Edad", "Definición de Categoría"]}
        />
        <AgendaCard 
          icon={Trophy}
          title="Competencia"
          items={["Ligas Potenciales", "Búsqueda de Entrenador"]}
        />
        <AgendaCard 
          icon={DollarSign}
          title="Finanzas"
          items={["Cuotas 2026", "Presupuesto Interactivo"]}
        />
        <AgendaCard 
          icon={CalendarDays}
          title="Organización"
          items={["Cronograma Anual", "Acuerdos Finales"]}
        />
      </div>
    </section>
  );
};
