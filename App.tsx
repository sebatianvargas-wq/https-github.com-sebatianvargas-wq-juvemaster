
import React, { useState, useMemo } from 'react';
import { ExpenseItem, ScenarioState, BudgetMetrics } from './types';
import { ExpenseManager } from './components/ExpenseManager';
import { ScenarioControls } from './components/ScenarioControls';
import { DashboardStats } from './components/DashboardStats';
import { Visualizer } from './components/Visualizer';
import { CoachGemini } from './components/CoachGemini';
import { GraduationCap, Award, DollarSign, Briefcase, User } from 'lucide-react';

// Presentation Components
import { Hero } from './components/Hero';
import { Agenda } from './components/Agenda';
import { TeamProfile } from './components/TeamProfile';
import { Timeline } from './components/Timeline';
import { FinalCommitment } from './components/FinalCommitment';

// Default Expenses matching the PDF "Cuotas 2026" slide context (in CLP approx)
// Mensualidad 2026: $30.000 (Income, so implied expense is covering costs)
// Inscripción Liga: $70.000 (Assuming this is total monthly share or per team share divided)
// Fondo Camisetas: $15.000
// Let's interpret "Monto Est." as costs to cover.
const INITIAL_EXPENSES: ExpenseItem[] = [
  { id: '1', name: 'Costo Cancha + Luz', amount: 120000, category: 'Cancha' }, // Estimate
  { id: '2', name: 'Inscripción Liga (Cuota Mes)', amount: 70000, category: 'Torneos' },
  { id: '3', name: 'Fondo Camisetas (Reserva)', amount: 15000, category: 'Equipamiento' },
  { id: '4', name: 'Honorarios DT (Propuesto)', amount: 100000, category: 'DT' },
];

// --- CONFIGURACIÓN DE RIVALES AMISTOSOS ---
// Instrucciones: Reemplaza las URLs dentro de 'logo' con tus enlaces de Google Drive o imágenes.
const FRIENDLY_TEAMS = [
  { id: 1, name: 'William Bulls', logo: 'https://res.cloudinary.com/ddzupqzrl/image/upload/v1763693213/Imagen_de_WhatsApp_2025-11-20_a_las_23.39.40_0b2bb32c_uwruau.jpg' },
  { id: 2, name: 'Deportivo', logo: 'https://res.cloudinary.com/ddzupqzrl/image/upload/v1763693214/Imagen_de_WhatsApp_2025-11-20_a_las_23.43.44_af07026e_a5dfnp.jpg' },
  { id: 3, name: 'Los Tapados', logo: 'https://res.cloudinary.com/ddzupqzrl/image/upload/v1763693213/Imagen_de_WhatsApp_2025-11-20_a_las_23.39.54_9d09f066_qnkxxq.jpg' },
  { id: 4, name: 'Llanquihue', logo: 'https://ui-avatars.com/api/?name=Vikingos&background=10b981&color=fff&size=128&length=2' },
  { id: 5, name: 'Fenix', logo: 'https://ui-avatars.com/api/?name=Cerveceros&background=f97316&color=fff&size=128&length=2' },
];

// --- OPCIONES DE ENTRENADOR (EDITAR AQUI) ---
const COACH_OPTIONS = [
  {
    id: 1,
    name: "Opción A: Jorge Roa'",
    initials: "JR",
    cost: 15000,
    experience: "5 años dirigiendo",
    certs: "Nivel 2 FebaChile",
    focus: "Sistemas Defensivos y Orden"
  },
  {
    id: 2,
    name: "Canicura",
    initials: "AC",
    cost: 15000,
    experience: "3 años, Ex-profesional",
    certs: "Nivel 1 FebaChile",
    focus: "Desarrollo Individual y Físico"
  }
];

const App: React.FC = () => {
  const [expenses, setExpenses] = useState<ExpenseItem[]>(INITIAL_EXPENSES);
  
  // Default scenario: 15 players (from bar chart analysis approx) paying 30k
  const [scenario, setScenario] = useState<ScenarioState>({
    playerCount: 15,
    monthlyFee: 30000,
  });

  // Derived calculations
  const metrics: BudgetMetrics = useMemo(() => {
    const totalExpenses = expenses.reduce((sum, item) => sum + item.amount, 0);
    const totalIncome = scenario.playerCount * scenario.monthlyFee;
    const balance = totalIncome - totalExpenses;
    
    const perPlayerCost = scenario.playerCount > 0 
      ? totalExpenses / scenario.playerCount 
      : 0;
      
    const requiredPlayersForBreakEven = scenario.monthlyFee > 0 
      ? totalExpenses / scenario.monthlyFee 
      : 0;

    return {
      totalExpenses,
      totalIncome,
      balance,
      perPlayerCost,
      requiredPlayersForBreakEven,
    };
  }, [expenses, scenario]);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-juventud-sky selection:text-slate-900">
      
      {/* Slide 1 */}
      <Hero />

      {/* Slide 2 */}
      <Agenda />

      {/* Slide 3 */}
      <TeamProfile />

      {/* Slide 4 - Challenges */}
      <section className="py-20 px-4 max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 items-start">
        
        {/* Columna Izquierda: Ligas y Amistosos */}
        <div>
          <h2 className="text-4xl font-black text-white uppercase mb-6 italic">
            Desafíos <span className="text-juventud-sky">2026</span>
          </h2>
          <div className="space-y-6 text-lg text-slate-300">
            
            {/* Card Ligas & Amistosos */}
            <div className="bg-slate-900/50 p-6 rounded-lg border-l-4 border-juventud-sky">
              <h3 className="text-white font-bold mb-2">Participación en Ligas</h3>
              <ul className="list-disc list-inside space-y-2 mb-6 text-base">
                <li><strong className="text-sky-400">Liga Oficial (Anual):</strong> Compromiso alto.</li>
                <li><strong className="text-sky-400">Copa de Verano:</strong> Torneo corto.</li>
                <li><strong className="text-sky-400">Amistosos:</strong> Recreativo y preparación.</li>
              </ul>

              {/* Sección de Rivales */}
              <div className="mt-4 pt-4 border-t border-slate-700/50">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Posibles Rivales Confirmados</p>
                <div className="flex flex-wrap gap-4">
                  {FRIENDLY_TEAMS.map((team) => (
                    <div key={team.id} className="group relative flex flex-col items-center">
                      <div className="w-20 h-20 rounded-full bg-slate-800 border-2 border-slate-600 group-hover:border-juventud-sky overflow-hidden transition-all cursor-pointer p-0.5 shadow-lg">
                        <img 
                          src={team.logo} 
                          alt={team.name} 
                          className="w-full h-full object-cover rounded-full opacity-90 group-hover:opacity-100" 
                        />
                      </div>
                      <span className="absolute -bottom-8 opacity-0 group-hover:opacity-100 text-[10px] bg-black/80 text-white px-2 py-1 rounded transition-opacity whitespace-nowrap z-10 pointer-events-none">
                        {team.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Columna Derecha: Candidatos a DT (Nueva Sección) */}
        <div className="bg-slate-900/30 p-6 rounded-2xl border border-slate-800/50 relative">
          <div className="absolute -top-4 -right-4 bg-slate-800 p-3 rounded-full border border-slate-600 shadow-xl hidden md:block">
            <Briefcase className="w-6 h-6 text-juventud-sky" />
          </div>
          
          <h3 className="text-2xl font-bold text-white mb-6 flex items-center gap-2">
            <User className="w-6 h-6 text-juventud-sky" /> 
            Candidatos a DT
          </h3>

          <div className="space-y-4">
            {COACH_OPTIONS.map((coach) => (
              <div key={coach.id} className="bg-slate-800/80 rounded-xl p-5 border border-slate-700 hover:border-juventud-sky transition-all group hover:shadow-lg hover:shadow-blue-900/10">
                <div className="flex items-start gap-4">
                  {/* Avatar con iniciales */}
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-slate-700 to-slate-900 flex items-center justify-center text-xl font-bold text-juventud-sky border border-slate-600 shadow-inner shrink-0">
                    {coach.initials}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex justify-between items-start">
                      <h4 className="text-lg font-bold text-white group-hover:text-juventud-sky transition-colors">{coach.name}</h4>
                      <div className="flex items-center gap-1 text-green-400 bg-green-900/20 px-2 py-1 rounded text-xs font-bold border border-green-900/30">
                        <DollarSign className="w-3 h-3" />
                        {coach.cost.toLocaleString('es-CL')}
                      </div>
                    </div>
                    
                    <div className="mt-3 grid grid-cols-1 gap-2 text-sm">
                      <div className="flex items-center gap-2 text-slate-300">
                        <Briefcase className="w-3.5 h-3.5 text-sky-500" />
                        <span className="truncate">{coach.experience}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300">
                        <GraduationCap className="w-3.5 h-3.5 text-sky-500" />
                        <span>{coach.certs}</span>
                      </div>
                      <div className="flex items-center gap-2 text-slate-300 italic">
                        <Award className="w-3.5 h-3.5 text-amber-500" />
                        <span className="text-xs text-slate-400">Enfoque: {coach.focus}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
            
            <div className="mt-4 p-3 bg-juventud-blue/10 rounded-lg border border-juventud-blue/20 text-center">
               <p className="text-sm text-juventud-sky">
                 ¿El presupuesto nos alcanza? Verifica en la calculadora abajo.
               </p>
            </div>
          </div>
        </div>
      </section>

      {/* Slide 6 - Timeline (Moved before calculator for flow) */}
      <Timeline />

      {/* Slide 5 - Financial Calculator */}
      <section id="finanzas" className="py-20 px-4 max-w-7xl mx-auto bg-slate-900/20 border-y border-slate-800/50 backdrop-blur-sm">
        <div className="mb-12 text-center">
          <h2 className="text-4xl font-black text-white uppercase italic mb-4">
            Finanzas <span className="text-green-400">2026</span>
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto">
            Ajusta los valores a continuación para encontrar el equilibrio perfecto entre cuotas accesibles y un equipo competitivo con DT.
          </p>
        </div>

        <DashboardStats metrics={metrics} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-5 space-y-6">
            <ScenarioControls 
              scenario={scenario} 
              setScenario={setScenario} 
              metrics={metrics}
            />
            <ExpenseManager expenses={expenses} setExpenses={setExpenses} />
          </div>

          <div className="lg:col-span-7 space-y-6">
            <div className="bg-slate-900 p-6 rounded-xl shadow-lg border border-slate-800">
               <h2 className="text-lg font-bold text-white mb-2">Ingresos vs Gastos</h2>
               <Visualizer metrics={metrics} />
               <div className="mt-6 grid grid-cols-2 gap-4 text-center">
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                    <p className="text-xs text-slate-500 uppercase">Cuota Actual</p>
                    <p className="text-xl font-bold text-white">${scenario.monthlyFee.toLocaleString('es-CL')}</p>
                  </div>
                  <div className="p-3 bg-slate-950 rounded border border-slate-800">
                     <p className="text-xs text-slate-500 uppercase">Costo Real / Jugador</p>
                     <p className="text-xl font-bold text-juventud-sky">${metrics.perPlayerCost.toLocaleString('es-CL', { maximumFractionDigits: 0 })}</p>
                  </div>
               </div>
            </div>
            <CoachGemini expenses={expenses} scenario={scenario} />
          </div>
        </div>
      </section>

      {/* Slide 8 - Final Commitment */}
      <FinalCommitment />

      <footer className="py-10 text-center text-slate-600 text-sm">
        <p>© 2025 Juventud Master - Aplicación Interna</p>
      </footer>
    </div>
  );
};

export default App;
