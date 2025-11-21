
import React, { useState } from 'react';
import { Trash2, Plus, DollarSign } from 'lucide-react';
import { ExpenseItem } from '../types';

interface ExpenseManagerProps {
  expenses: ExpenseItem[];
  setExpenses: React.Dispatch<React.SetStateAction<ExpenseItem[]>>;
}

const CATEGORIES = ['Cancha', 'Arbitraje', 'Equipamiento', 'Refrigerios', 'Torneos', 'DT', 'Otros'] as const;

export const ExpenseManager: React.FC<ExpenseManagerProps> = ({ expenses, setExpenses }) => {
  const [newItemName, setNewItemName] = useState('');
  const [newItemAmount, setNewItemAmount] = useState('');
  const [newItemCategory, setNewItemCategory] = useState<typeof CATEGORIES[number]>('Cancha');

  const handleAddExpense = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName || !newItemAmount) return;

    const newExpense: ExpenseItem = {
      id: Date.now().toString(),
      name: newItemName,
      amount: parseFloat(newItemAmount),
      category: newItemCategory,
    };

    setExpenses([...expenses, newExpense]);
    setNewItemName('');
    setNewItemAmount('');
  };

  const handleRemoveExpense = (id: string) => {
    setExpenses(expenses.filter((item) => item.id !== id));
  };

  const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);

  return (
    <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-juventud-sky flex items-center gap-2">
          <DollarSign className="w-5 h-5" /> Gastos Mensuales
        </h2>
        <span className="text-2xl font-bold text-white">${totalExpenses.toLocaleString('es-CL')}</span>
      </div>

      {/* List - Compacted Height to prevent overflow */}
      <div className="space-y-2 mb-4 h-40 overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-slate-700 scrollbar-track-slate-900">
        {expenses.length === 0 ? (
          <p className="text-slate-500 text-center py-4 italic">No hay gastos registrados.</p>
        ) : (
          expenses.map((expense) => (
            <div key={expense.id} className="flex justify-between items-center bg-slate-800 p-2 rounded-lg group hover:bg-slate-750 transition-colors border-l-4 border-transparent hover:border-juventud-sky">
              <div>
                <p className="font-medium text-slate-200 text-sm">{expense.name}</p>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{expense.category}</p>
              </div>
              <div className="flex items-center gap-3">
                <span className="font-mono font-bold text-slate-300 text-sm">${expense.amount.toLocaleString('es-CL')}</span>
                <button
                  onClick={() => handleRemoveExpense(expense.id)}
                  className="text-slate-500 hover:text-red-500 transition-colors p-1"
                  aria-label="Eliminar gasto"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add New Form */}
      <form onSubmit={handleAddExpense} className="grid grid-cols-1 md:grid-cols-12 gap-2 bg-slate-950/50 p-3 rounded-lg border border-slate-800/50 mt-auto">
        <div className="md:col-span-5">
          <input
            type="text"
            placeholder="Concepto"
            value={newItemName}
            onChange={(e) => setNewItemName(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-juventud-sky text-white placeholder-slate-500"
          />
        </div>
        <div className="md:col-span-3">
          <select
            value={newItemCategory}
            onChange={(e) => setNewItemCategory(e.target.value as any)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-juventud-sky text-white"
          >
            {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
          </select>
        </div>
        <div className="md:col-span-3">
          <input
            type="number"
            placeholder="$"
            min="0"
            step="100"
            value={newItemAmount}
            onChange={(e) => setNewItemAmount(e.target.value)}
            className="w-full bg-slate-800 border border-slate-700 rounded px-2 py-1.5 text-xs focus:outline-none focus:border-juventud-sky text-white placeholder-slate-500"
          />
        </div>
        <div className="md:col-span-1 flex justify-center">
          <button
            type="submit"
            disabled={!newItemName || !newItemAmount}
            className="bg-juventud-blue hover:bg-blue-600 text-white p-1.5 rounded w-full flex justify-center items-center transition-colors disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-blue-900/20"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </form>
    </div>
  );
};
