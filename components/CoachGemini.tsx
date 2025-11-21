import React, { useState } from 'react';
import { BrainCircuit, Sparkles, Loader2 } from 'lucide-react';
import { ExpenseItem, ScenarioState } from '../types';
import { getBudgetAdvice } from '../services/geminiService';

interface CoachGeminiProps {
  expenses: ExpenseItem[];
  scenario: ScenarioState;
}

export const CoachGemini: React.FC<CoachGeminiProps> = ({ expenses, scenario }) => {
  const [advice, setAdvice] = useState<string>('');
  const [loading, setLoading] = useState(false);

  const handleAskCoach = async () => {
    setLoading(true);
    try {
      const result = await getBudgetAdvice(expenses, scenario);
      setAdvice(result);
    } catch (e) {
      setAdvice("El Coach está en tiempo fuera. Intenta de nuevo más tarde.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-gradient-to-br from-juventud-blue/30 to-slate-900 p-6 rounded-xl border border-juventud-blue/50 shadow-lg mt-6 relative overflow-hidden">
      <div className="absolute top-0 right-0 p-4 opacity-10">
        <BrainCircuit size={120} />
      </div>
      
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="bg-juventud-blue p-2 rounded-lg text-white shadow-md shadow-blue-900/50">
            <Sparkles className="w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-white">Consultar al Coach IA</h2>
        </div>
        
        <p className="text-slate-300 mb-6 max-w-xl">
          Usa nuestro asistente IA para analizar el presupuesto del equipo. Obtén consejos sobre cómo equilibrar las cuentas, reducir costos o invertir el superávit.
        </p>

        {!advice && (
          <button
            onClick={handleAskCoach}
            disabled={loading}
            className="bg-white text-juventud-blue hover:bg-slate-100 font-bold py-3 px-6 rounded-full flex items-center gap-2 transition-all transform hover:scale-105 disabled:opacity-70 disabled:hover:scale-100 shadow-lg"
          >
            {loading ? <Loader2 className="animate-spin w-5 h-5" /> : <Sparkles className="w-5 h-5" />}
            {loading ? "Analizando Estrategia..." : "Analizar Presupuesto"}
          </button>
        )}

        {advice && (
          <div className="bg-slate-950/60 p-6 rounded-lg border border-juventud-sky/30 animate-fadeIn">
            <div className="prose prose-invert max-w-none">
              <div className="text-slate-200 whitespace-pre-line leading-relaxed">
                {advice}
              </div>
            </div>
            <button
              onClick={() => setAdvice('')}
              className="mt-4 text-sm text-juventud-sky hover:text-sky-300 underline"
            >
              Limpiar Consejo
            </button>
          </div>
        )}
      </div>
    </div>
  );
};