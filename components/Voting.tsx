import React, { useState } from 'react';
import { CheckCircle2, ThumbsUp } from 'lucide-react';

export const Voting: React.FC = () => {
  const [votedCategory, setVotedCategory] = useState<string | null>(null);
  const [votedCoach, setVotedCoach] = useState(false);

  return (
    <section className="py-20 px-4 max-w-4xl mx-auto text-center">
       <div className="mb-12">
        <h2 className="text-5xl font-black text-white uppercase mb-4">¿Preguntas?</h2>
        <p className="text-xl text-slate-400">Definamos juntos el camino de Juventud Master para el 2026.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <button 
          onClick={() => setVotedCategory('senior')}
          className={`p-8 rounded-2xl border transition-all ${votedCategory === 'senior' ? 'bg-juventud-blue border-juventud-sky shadow-lg shadow-blue-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">¿SENIOR?</h3>
          <p className="text-sm text-slate-400 mb-4">Votación a mano alzada</p>
          {votedCategory === 'senior' && <CheckCircle2 className="mx-auto text-white animate-bounce" />}
        </button>

        <button 
          onClick={() => setVotedCategory('competidor')}
          className={`p-8 rounded-2xl border transition-all ${votedCategory === 'competidor' ? 'bg-juventud-blue border-juventud-sky shadow-lg shadow-blue-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">¿TODO COMPETIDOR?</h3>
          <p className="text-sm text-slate-400 mb-4">Votación a mano alzada</p>
          {votedCategory === 'competidor' && <CheckCircle2 className="mx-auto text-white animate-bounce" />}
        </button>

        <button 
          onClick={() => setVotedCoach(!votedCoach)}
          className={`p-8 rounded-2xl border transition-all ${votedCoach ? 'bg-sky-600 border-white shadow-lg shadow-sky-500/30' : 'bg-slate-900 border-slate-700 hover:border-slate-500'}`}
        >
          <h3 className="text-2xl font-bold text-white mb-2">¿ENTRENADOR?</h3>
          <p className="text-sm text-slate-400 mb-4">Definir comisión de búsqueda</p>
          {votedCoach ? <ThumbsUp className="mx-auto text-white animate-pulse" /> : null}
        </button>
      </div>
    </section>
  );
};
