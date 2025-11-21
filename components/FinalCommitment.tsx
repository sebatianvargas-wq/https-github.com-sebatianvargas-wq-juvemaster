
import React, { useState } from 'react';
import { 
  CheckCircle2, 
  XCircle, 
  HelpCircle, 
  ChevronDown, 
  ChevronUp,
  UserCheck,
  DollarSign,
  Users,
  Trophy,
  ThumbsUp,
  ThumbsDown,
  Briefcase,
  Scale,
  Landmark
} from 'lucide-react';

type DecisionStatus = 'yes' | 'no' | 'pending';

interface DecisionState {
  status: DecisionStatus;
}

export const FinalCommitment: React.FC = () => {
  const [decisions, setDecisions] = useState<{ [key: string]: DecisionState }>({
    dt: { status: 'pending' },
    fee: { status: 'pending' },
    category: { status: 'pending' },
    tournament: { status: 'pending' },
    legal: { status: 'pending' },
  });

  const [expanded, setExpanded] = useState<string | null>(null);
  
  // Form States
  const [feeValue, setFeeValue] = useState(30000);
  const [selectedCategory, setSelectedCategory] = useState<'tc' | 'senior' | 'both' | null>(null);
  const [selectedTournament, setSelectedTournament] = useState('Ligas locales 2026');

  const toggleExpand = (id: string) => {
    setExpanded(expanded === id ? null : id);
  };

  const setStatus = (id: string, status: DecisionStatus) => {
    setDecisions(prev => ({ ...prev, [id]: { ...prev[id], status } }));
  };

  const getStatusColor = (status: DecisionStatus) => {
    switch(status) {
      case 'yes': return 'bg-green-500 text-white shadow-[0_0_15px_rgba(34,197,94,0.5)]';
      case 'no': return 'bg-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]';
      case 'pending': return 'bg-amber-500 text-white shadow-[0_0_15px_rgba(245,158,11,0.5)]';
      default: return 'text-slate-500 hover:bg-slate-800';
    }
  };

  const renderStatusToggle = (id: string) => (
    <div className="flex bg-slate-950/80 rounded-lg p-1 border border-slate-700/50 backdrop-blur-sm" onClick={(e) => e.stopPropagation()}>
      {(['yes', 'no', 'pending'] as DecisionStatus[]).map((s) => (
         <button
           key={s}
           onClick={(e) => {
             e.stopPropagation();
             setStatus(id, s);
           }}
           className={`p-2 rounded-md transition-all duration-300 ${decisions[id].status === s ? getStatusColor(s) : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'}`}
           title={s === 'yes' ? 'Sí' : s === 'no' ? 'No' : 'Pendiente'}
         >
           {s === 'yes' && <CheckCircle2 className="w-4 h-4" />}
           {s === 'no' && <XCircle className="w-4 h-4" />}
           {s === 'pending' && <HelpCircle className="w-4 h-4" />}
         </button>
      ))}
    </div>
  );

  const renderHeader = (id: string, title: string, Icon: any, subtitle?: string) => (
    <div 
      onClick={() => toggleExpand(id)}
      className={`
        flex items-center justify-between p-5 cursor-pointer transition-all duration-300 relative overflow-hidden select-none
        ${expanded === id 
          ? 'bg-slate-800/90 border-l-4 border-juventud-sky shadow-xl' 
          : 'bg-slate-900/50 border-l-4 border-transparent hover:bg-slate-800/50 hover:border-slate-600'}
      `}
    >
      <div className="flex items-center gap-4 z-10 max-w-[70%]">
        <div className={`p-3 rounded-xl transition-colors duration-300 shrink-0 ${expanded === id ? 'bg-juventud-blue text-white shadow-lg' : 'bg-slate-800 text-slate-400'}`}>
          <Icon className="w-6 h-6" />
        </div>
        <div>
          <h3 className={`text-lg md:text-xl font-bold transition-colors leading-tight ${expanded === id ? 'text-white' : 'text-slate-300'}`}>{title}</h3>
          {subtitle && <p className="text-xs text-slate-500 uppercase tracking-wider mt-1">{subtitle}</p>}
        </div>
      </div>
      
      <div className="flex items-center gap-4 z-10">
        <div className="hidden md:block">
           {renderStatusToggle(id)}
        </div>
        {expanded === id ? <ChevronUp className="text-juventud-sky w-5 h-5" /> : <ChevronDown className="text-slate-500 w-5 h-5" />}
      </div>

      {/* Mobile Toggle Overlay (only visible when expanded on small screens if desired, or kept in header) 
          Current design keeps it in header but hidden on small screens to save space, let's show it below content on mobile if needed,
          but for now sticking to desktop layout or simply unhiding it. Let's unhide it for better UX on mobile.
      */}
      <div className="md:hidden absolute right-14 top-1/2 -translate-y-1/2">
        {renderStatusToggle(id)}
      </div>

      {/* Progress bar background for visual flair if approved */}
      {decisions[id].status === 'yes' && (
        <div className="absolute bottom-0 left-0 h-0.5 bg-green-500 w-full animate-fadeIn"></div>
      )}
    </div>
  );

  return (
    <section className="min-h-screen py-20 px-4 max-w-5xl mx-auto">
      <div className="text-center mb-12 animate-fadeIn">
        <h2 className="text-4xl md:text-6xl font-black text-white uppercase italic mb-4">
          Decisiones Finales <span className="text-juventud-sky">2026</span>
        </h2>
        <div className="h-1 w-24 bg-juventud-sky mx-auto rounded-full mb-4"></div>
        <p className="text-xl text-slate-400">Definamos juntos el camino de Juventud Máster.</p>
      </div>

      <div className="space-y-4">
        
        {/* 1. Director Técnico */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
          {renderHeader('dt', '¿Buscamos Director Técnico (DT)?', UserCheck, 'Estructura Deportiva')}
          
          {expanded === 'dt' && (
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="space-y-4">
                  <div className="bg-green-900/10 p-4 rounded-xl border border-green-900/30">
                    <h4 className="flex items-center gap-2 text-green-400 font-bold mb-3 text-sm uppercase tracking-wider"><ThumbsUp className="w-4 h-4"/> Pros</h4>
                    <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Estructura táctica y orden</li>
                      <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Entrenamientos formales</li>
                      <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Mayor rendimiento competitivo</li>
                      <li className="flex gap-2"><span className="text-green-500 font-bold">✓</span> Preparación seria para torneos</li>
                    </ul>
                  </div>
                  <div className="bg-red-900/10 p-4 rounded-xl border border-red-900/30">
                    <h4 className="flex items-center gap-2 text-red-400 font-bold mb-3 text-sm uppercase tracking-wider"><ThumbsDown className="w-4 h-4"/> Contras</h4>
                     <ul className="space-y-2 text-sm text-slate-300">
                      <li className="flex gap-2"><span className="text-red-500 font-bold">✕</span> Costo mensual adicional</li>
                      <li className="flex gap-2"><span className="text-red-500 font-bold">✕</span> Disponibilidad de horarios</li>
                      <li className="flex gap-2"><span className="text-red-500 font-bold">✕</span> Requiere compromiso real</li>
                    </ul>
                  </div>
                </div>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800">
                  <h4 className="text-white font-bold mb-3 flex items-center gap-2"><Briefcase className="w-4 h-4 text-juventud-sky"/> Perfil del DT Ideal</h4>
                  <p className="text-xs text-slate-500 mb-2">Define qué buscamos en el entrenador:</p>
                  <textarea 
                    className="w-full h-32 bg-slate-900 border border-slate-700 rounded-lg p-3 text-sm text-slate-200 focus:border-juventud-sky focus:outline-none resize-none placeholder-slate-600"
                    placeholder="Ej: Experiencia en ligas senior, manejo de grupo, enfoque defensivo, liderazgo..."
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 2. Cuota Mensual */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
          {renderHeader('fee', '¿Establecemos Cuota Mensual?', DollarSign, 'Sostenibilidad')}
          
          {expanded === 'fee' && (
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 animate-fadeIn">
              <div className="flex flex-col md:flex-row gap-8 items-center">
                <div className="flex-1 w-full">
                   <h4 className="text-white font-bold mb-4 flex items-center gap-2">
                     <CheckCircle2 className="w-5 h-5 text-juventud-sky"/> Ventajas del Fondo Común
                   </h4>
                   <div className="grid grid-cols-1 gap-3">
                     {['Financiamiento de torneos e inscripciones', 'Pago de honorarios DT y arbitraje', 'Renovación de indumentaria', 'Estabilidad financiera anual'].map((item, i) => (
                       <div key={i} className="flex items-center gap-3 text-slate-300 bg-slate-950/50 p-3 rounded-lg border border-slate-800 hover:border-juventud-sky/50 transition-colors">
                         <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_5px_rgba(34,197,94,0.8)]"></div>
                         {item}
                       </div>
                     ))}
                   </div>
                </div>
                <div className="flex-1 w-full bg-gradient-to-b from-slate-900 to-slate-950 p-6 rounded-xl border border-slate-800 text-center relative overflow-hidden">
                  <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-green-500 to-emerald-400"></div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-4">Propuesta de Cuota</p>
                  <div className="text-5xl font-black text-white mb-2 tracking-tighter">
                    ${feeValue.toLocaleString('es-CL')}
                  </div>
                  <p className="text-sm text-emerald-400 mb-6 font-medium">por jugador / mes</p>
                  
                  <input 
                    type="range" 
                    min="10000" 
                    max="50000" 
                    step="5000" 
                    value={feeValue} 
                    onChange={(e) => setFeeValue(parseInt(e.target.value))}
                    className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-500 mb-4"
                  />
                  <div className="flex justify-between text-[10px] text-slate-500 font-mono uppercase">
                    <span>Mínimo $10k</span>
                    <span>Máximo $50k</span>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* 3. Categoría */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
          {renderHeader('category', '¿Qué Categoría Jugaremos?', Users, 'Definición del Plantel')}
          
          {expanded === 'category' && (
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 animate-fadeIn">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {[
                  { id: 'tc', label: 'Todo Competidor', subtitle: 'Nivel Libre', desc: 'Alta intensidad física. Ideal para desarrollo de jugadores Sub-30.', color: 'border-indigo-500/50' },
                  { id: 'senior', label: 'Senior (+35)', subtitle: 'Veteranos', desc: 'Ritmo controlado, maña y experiencia. Requisito estricto de edad.', color: 'border-amber-500/50' },
                  { id: 'both', label: 'Ambas Categorías', subtitle: 'Doble Desafío', desc: 'Requiere plantel largo (20+ jugadores) y mayor presupuesto.', color: 'border-juventud-sky/50' }
                ].map((opt) => (
                  <button
                    key={opt.id}
                    onClick={() => setSelectedCategory(opt.id as any)}
                    className={`p-4 rounded-xl border-2 text-left transition-all relative overflow-hidden group ${selectedCategory === opt.id ? `bg-slate-800 ${opt.color} shadow-lg` : 'bg-slate-950 border-slate-800 hover:border-slate-600'}`}
                  >
                    {selectedCategory === opt.id && <div className="absolute top-0 right-0 p-2"><CheckCircle2 className="w-5 h-5 text-white" /></div>}
                    <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">{opt.subtitle}</h5>
                    <h3 className={`font-bold text-lg mb-2 ${selectedCategory === opt.id ? 'text-white' : 'text-slate-300 group-hover:text-white'}`}>{opt.label}</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">{opt.desc}</p>
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 4. Torneos */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
          {renderHeader('tournament', '¿Nos inscribiremos en torneos?', Trophy, 'Competencia 2026')}
          
          {expanded === 'tournament' && (
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 animate-fadeIn">
               <div className="flex flex-col md:flex-row items-start gap-6">
                 <div className="w-full md:w-1/2 space-y-4">
                   <div>
                     <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">Seleccionar Competición Principal</label>
                     <div className="relative">
                       <select 
                         value={selectedTournament}
                         onChange={(e) => setSelectedTournament(e.target.value)}
                         className="w-full bg-slate-950 border border-slate-700 text-white text-sm rounded-lg focus:ring-juventud-sky focus:border-juventud-sky block p-3 appearance-none cursor-pointer hover:bg-slate-900 transition-colors"
                       >
                         <option>Ligas Locales 2026 (Anual)</option>
                         <option>Torneos Regionales (Osorno, Valdivia)</option>
                         <option>Campeonatos de Verano/Invierno</option>
                         <option>Solo Amistosos</option>
                       </select>
                       <ChevronDown className="absolute right-3 top-3.5 text-slate-500 w-4 h-4 pointer-events-none" />
                     </div>
                   </div>
                   
                   <div className="bg-blue-900/20 p-3 rounded-lg border border-blue-900/30 flex items-start gap-3">
                      <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                      <div>
                        <p className="text-sm text-blue-200 font-bold">Compromiso Requerido</p>
                        <p className="text-xs text-blue-300/80 mt-1">Inscribirse implica asistencia obligatoria a partidos (fines de semana).</p>
                      </div>
                   </div>
                 </div>
                 
                 <div className="w-full md:w-1/2">
                    <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3">Cronograma Estimado</p>
                    <div className="space-y-3 relative">
                      <div className="absolute left-[7px] top-2 bottom-2 w-0.5 bg-slate-800"></div>
                      {[
                        { month: 'Ene - Feb', event: 'Pretemporada / Copa Verano' },
                        { month: 'Marzo', event: 'Inicio Ligas Locales' },
                        { month: 'Julio', event: 'Torneo Invierno' },
                        { month: 'Dic', event: 'Playoffs / Cierre' }
                      ].map((t, i) => (
                        <div key={i} className="flex items-center gap-3 relative z-10">
                          <div className="w-4 h-4 rounded-full bg-slate-900 border-2 border-juventud-sky"></div>
                          <div className="flex-1 bg-slate-950 p-2 px-3 rounded border border-slate-800 flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-400">{t.month}</span>
                            <span className="text-xs text-slate-200">{t.event}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
               </div>
            </div>
          )}
        </div>

        {/* 5. Formalización Legal */}
        <div className="rounded-2xl border border-slate-800 overflow-hidden shadow-lg transition-all hover:border-slate-700">
          {renderHeader('legal', '¿Formalizaremos legalmente el equipo?', Scale, 'Personalidad Jurídica')}
          
          {expanded === 'legal' && (
            <div className="bg-slate-900/80 p-6 border-t border-slate-800 animate-fadeIn">
              <div className="grid md:grid-cols-2 gap-6 items-center">
                <div>
                  <h4 className="text-lg font-bold text-white mb-4">Beneficios de la Personalidad Jurídica</h4>
                  <ul className="space-y-3">
                    {[
                      'Acceso a fondos municipales, FNDR e IND',
                      'Apertura de cuenta bancaria a nombre del club',
                      'Emisión de facturas y documentos oficiales',
                      'Directiva Oficial (Presidente, Tesorero, Secretario)',
                      'Validación para torneos federados'
                    ].map((benefit, idx) => (
                      <li key={idx} className="flex items-start gap-3 group">
                         <div className="bg-slate-800 p-1 rounded text-juventud-sky group-hover:bg-juventud-sky group-hover:text-slate-900 transition-colors">
                           <CheckCircle2 className="w-3 h-3" />
                         </div>
                         <span className="text-slate-300 text-sm group-hover:text-white transition-colors">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="bg-slate-950 p-6 rounded-xl border border-slate-800 flex flex-col items-center text-center">
                   <div className="w-16 h-16 bg-slate-900 rounded-full flex items-center justify-center mb-4 border-2 border-slate-700 shadow-lg">
                     <Landmark className="w-8 h-8 text-slate-400" />
                   </div>
                   <h5 className="font-bold text-white mb-2">Club Deportivo Juventud Máster</h5>
                   <p className="text-xs text-slate-500 mb-4 max-w-xs">
                     Al obtener personalidad jurídica, pasamos de ser un grupo de amigos a una institución reconocida por el estado.
                   </p>
                   <button className="bg-slate-800 hover:bg-slate-700 text-white text-xs font-bold py-2 px-4 rounded-full border border-slate-600 transition-all">
                     Descargar Estatutos Tipo
                   </button>
                </div>
              </div>
            </div>
          )}
        </div>

      </div>
    </section>
  );
};