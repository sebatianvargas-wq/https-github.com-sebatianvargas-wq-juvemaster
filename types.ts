
export interface ExpenseItem {
  id: string;
  name: string;
  amount: number;
  category: 'Cancha' | 'Arbitraje' | 'Equipamiento' | 'Refrigerios' | 'Torneos' | 'DT' | 'Otros';
}

export interface BudgetMetrics {
  totalExpenses: number;
  totalIncome: number;
  balance: number;
  perPlayerCost: number;
  requiredPlayersForBreakEven: number;
}

export interface ScenarioState {
  playerCount: number;
  monthlyFee: number;
}

export interface VoteState {
  category: 'senior' | 'todo_competidor' | null;
  coach: boolean;
}

export interface Player {
  id: number;
  name: string;
  age: number;
  photoUrl?: string;
  position?: string;
}
