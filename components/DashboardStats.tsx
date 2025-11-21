import React from 'react';
import { TrendingUp, TrendingDown, AlertCircle, CheckCircle2 } from 'lucide-react';
import { BudgetMetrics } from '../types';

interface DashboardStatsProps {
  metrics: BudgetMetrics;
}

export const DashboardStats: React.FC<DashboardStatsProps> = ({ metrics }) => {
  const isDeficit = metrics.balance < 0;
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
      {/* Balance Card */}
      <div className={`p-6 rounded-xl border ${isDeficit ? 'bg-red-950/30 border-red-900/50' : 'bg-green-950/30 border-green-900/50'} flex flex-col justify-between shadow-lg`}>
        <div className="flex justify-between items-start">
          <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Balance Neto</p>
            <h3 className={`text-3xl font-black mt-2 ${isDeficit ? 'text-red-500' : 'text-green-500'}`}>
              {metrics.balance < 0 ? '-' : '+'}${Math.abs(metrics.balance).toLocaleString('es-CL')}
            </h3>
          </div>
          <div className={`p-2 rounded-full ${isDeficit ? 'bg-red-900/50 text-red-400' : 'bg-green-900/50 text-green-400'}`}>
             {isDeficit ? <TrendingDown className="w-6 h-6" /> : <TrendingUp className="w-6 h-6" />}
          </div>
        </div>
        <div className="mt-4 flex items-center gap-2 text-sm">
           {isDeficit ? (
             <span className="text-red-400 flex items-center gap-1"><AlertCircle className="w-4 h-4"/> Déficit de Presupuesto</span>
           ) : (
             <span className="text-green-400 flex items-center gap-1"><CheckCircle2 className="w-4 h-4"/> Superávit de Presupuesto</span>
           )}
        </div>
      </div>

      {/* Income Card */}
      <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Ingresos Totales</p>
        <h3 className="text-3xl font-black text-white mt-2">${metrics.totalIncome.toLocaleString('es-CL')}</h3>
        <p className="text-slate-500 text-sm mt-4">
          Proyectado (Cuotas x Jugadores)
        </p>
      </div>

       {/* Expenses Card */}
       <div className="bg-slate-900 p-6 rounded-xl border border-slate-800 shadow-lg">
        <p className="text-slate-400 text-sm font-medium uppercase tracking-wider">Gastos Totales</p>
        <h3 className="text-3xl font-black text-white mt-2">${metrics.totalExpenses.toLocaleString('es-CL')}</h3>
        <p className="text-slate-500 text-sm mt-4">
          Recurrentes estimados
        </p>
      </div>
    </div>
  );
};
