import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine, Cell } from 'recharts';
import { BudgetMetrics } from '../types';

interface VisualizerProps {
  metrics: BudgetMetrics;
}

export const Visualizer: React.FC<VisualizerProps> = ({ metrics }) => {
  const data = [
    {
      name: 'Gastos',
      amount: metrics.totalExpenses,
    },
    {
      name: 'Ingresos',
      amount: metrics.totalIncome,
    },
  ];

  const formatCurrency = (val: number) => `$${val.toLocaleString('es-CL')}`;

  return (
    <div className="h-64 w-full mt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" vertical={false} />
          <XAxis 
            dataKey="name" 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8' }} 
            axisLine={{ stroke: '#475569' }}
          />
          <YAxis 
            stroke="#94a3b8" 
            tick={{ fill: '#94a3b8', fontSize: 12 }} 
            axisLine={{ stroke: '#475569' }}
            tickFormatter={(val) => `$${(val/1000).toFixed(0)}k`}
          />
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ backgroundColor: '#1e293b', borderColor: '#334155', color: '#f8fafc' }}
            itemStyle={{ color: '#f8fafc' }}
            formatter={(value: number) => [formatCurrency(value), 'Monto']}
          />
          <ReferenceLine y={metrics.totalExpenses} stroke="#ef4444" strokeDasharray="3 3" />
          <Bar dataKey="amount" radius={[4, 4, 0, 0]} barSize={60}>
             {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.name === 'Gastos' ? '#ef4444' : '#38bdf8'} />
              ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};
