import React from 'react';
import { Users, DollarSign } from 'lucide-react';
import { ScenarioState, BudgetMetrics } from '../types';

interface ScenarioControlsProps {
  scenario: ScenarioState;
  setScenario: React.Dispatch<React.SetStateAction<ScenarioState>>;
  metrics: BudgetMetrics;
}

export const ScenarioControls: React.FC<ScenarioControlsProps> = ({
  scenario,
  setScenario,
  metrics,
}) => {
  const handlePlayerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScenario((prev) => ({ ...prev, playerCount: parseInt(e.target.value, 10) }));
  };

  const handleFeeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setScenario((prev) => ({ ...prev, monthlyFee: parseFloat(e.target.value) }));
  };

  return (
    <div className="space-y-8 bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
      <h2 className="text-xl font-bold text-white mb-4 border-b border-slate-800 pb-2">
        Simulador de Escenarios
      </h2>

      {/* Player Count Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-slate-300 font-medium">
            <Users className="w-5 h-5 text-juventud-sky" />
            Jugadores Activos
          </label>
          <span className="text-2xl font-bold text-juventud-sky">{scenario.playerCount}</span>
        </div>
        <input
          type="range"
          min="1"
          max="30"
          step="1"
          value={scenario.playerCount}
          onChange={handlePlayerChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-sky-400"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>1</span>
          <span>15</span>
          <span>30</span>
        </div>
        {metrics.requiredPlayersForBreakEven > 0 && (
           <p className="text-xs text-slate-400 mt-1">
             Necesarios para cubrir gastos: <span className="text-white font-bold">{Math.ceil(metrics.requiredPlayersForBreakEven)}</span>
           </p>
        )}
      </div>

      {/* Monthly Fee Slider */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <label className="flex items-center gap-2 text-slate-300 font-medium">
            <DollarSign className="w-5 h-5 text-green-400" />
            Cuota por Jugador
          </label>
          <span className="text-2xl font-bold text-green-400">${scenario.monthlyFee.toLocaleString('es-CL')}</span>
        </div>
        <input
          type="range"
          min="0"
          max="60000"
          step="1000"
          value={scenario.monthlyFee}
          onChange={handleFeeChange}
          className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-green-500"
        />
        <div className="flex justify-between text-xs text-slate-500">
          <span>$0</span>
          <span>$30.000</span>
          <span>$60.000</span>
        </div>
         <p className="text-xs text-slate-400 mt-1">
             Cuota de equilibrio para {scenario.playerCount} jugadores: <span className="text-white font-bold">${metrics.perPlayerCost.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</span>
           </p>
      </div>
    </div>
  );
};
