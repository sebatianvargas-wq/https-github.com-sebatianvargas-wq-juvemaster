
import React, { useState } from 'react';
import { User, Shirt, AlertCircle, Users } from 'lucide-react';
import { Player } from '../types';

const ProgressBar = ({ label, percent, colorClass }: { label: string, percent: number, colorClass: string }) => (
  <div className="mb-6">
    <div className="flex justify-between mb-1">
      <span className="text-sm font-medium text-white">{label}</span>
      <span className="text-sm font-medium text-slate-400">{percent}%</span>
    </div>
    <div className="w-full bg-slate-800 rounded-full h-6 overflow-hidden border border-slate-700">
      <div 
        className={`${colorClass} h-6 rounded-full flex items-center justify-end pr-2 transition-all duration-1000 ease-out`} 
        style={{ width: `${percent}%` }}
      >
        <span className="text-xs font-bold text-white drop-shadow-md">{percent}%</span>
      </div>
    </div>
  </div>
);

const PlayerCard = ({ player }: { player: Player }) => {
  const [imgError, setImgError] = useState(false);
  const isSenior = player.age >= 35;
  const isSub30 = player.age < 30;
  
  let categoryLabel = "30-35 Años";
  let badgeColor = "bg-sky-500/20 text-sky-300 border-sky-900";
  
  if (isSenior) {
    categoryLabel = "Senior (+35)";
    badgeColor = "bg-juventud-blue/20 text-blue-300 border-blue-900";
  } else if (isSub30) {
    categoryLabel = "Sub-30";
    badgeColor = "bg-indigo-500/20 text-indigo-300 border-indigo-900";
  }

  // Fallback avatar using UI Avatars API if image fails
  const fallbackUrl = `https://ui-avatars.com/api/?name=${encodeURIComponent(player.name)}&background=0f172a&color=38bdf8&size=200&font-size=0.35`;

  return (
    <div className="bg-slate-800/50 rounded-xl overflow-hidden border border-slate-700 hover:border-juventud-sky transition-all group hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-900/20 flex flex-col">
      <div className="aspect-[4/3] bg-slate-700 relative overflow-hidden group">
        {player.photoUrl && !imgError ? (
          <img 
            src={player.photoUrl} 
            alt={player.name} 
            onError={() => setImgError(true)}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-slate-900 relative">
            {/* Show Fallback Avatar if image failed or missing */}
            <img src={fallbackUrl} alt="Avatar" className="w-full h-full object-cover opacity-80" />
            {imgError && (
               <div className="absolute bottom-2 right-2 bg-red-500/80 p-1 rounded-full text-white" title="Error cargando imagen">
                 <AlertCircle size={12} />
               </div>
            )}
          </div>
        )}
        
        {/* Age Badge */}
        <div className="absolute top-2 right-2 bg-slate-950/90 backdrop-blur text-white text-xs font-bold px-2 py-1 rounded border border-slate-600 shadow-lg z-20">
          {player.age} Años
        </div>
      </div>
      
      <div className="p-3 flex-grow flex flex-col justify-between">
        <div>
          <h3 className="text-base font-bold text-white truncate leading-tight">{player.name}</h3>
          <p className="text-[10px] text-slate-500 mt-1">{player.position || "Posición por definir"}</p>
        </div>
        
        <div className="mt-2 pt-2 border-t border-slate-700/50 flex justify-between items-center">
          <span className={`text-[9px] uppercase tracking-wider px-1.5 py-0.5 rounded font-bold border ${badgeColor}`}>
            {categoryLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

// NOTE: Using reliable public Unsplash images to ensure they load.
// If using Google Drive, ensure the file is "Anyone with link" -> "Viewer".
const MOCK_PLAYERS: Player[] = [
  { 
    id: 1, 
    name: "Coquex", 
    age: 34, 
    position: "Perímetro",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763691713/Fabian_-_34_fnlc3w.png" 
  },
  { 
    id: 2, 
    name: "Golozo", 
    age: 37, 
    position: "Interno",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763691713/Gonzalo_-_37_oxwtki.png"
  },
  { 
    id: 3, 
    name: "Janito", 
    age: 28, 
    position: "Base",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763691713/Jano_-_28_hdqytw.png"
  },
  { 
    id: 4, 
    name: "Seba", 
    age: 36, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763691713/Sebastian_-_36_cv6c7a.png" 
  },
  { 
    id: 5, 
    name: "Gustavo", 
    age: 30, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692681/Gustavo_picetj.png" 
  },
  { 
    id: 6, 
    name: "Carlitos", 
    age: 89, 
    position: "Base Indomable",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692680/Captura_de_pantalla_2025-11-20_232750_mhhhvi.png" 
  },
  { 
    id: 7, 
    name: "Jorge", 
    age: 36, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692966/Jorge_rbwea1.png" 
  },
  { 
    id: 8, 
    name: "Trombon", 
    age: 36, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692681/Taro_zmyst7.png" 
  },
  { 
    id: 9, 
    name: "Wemby", 
    age: 40, 
    position: "Pivot",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692681/Richard_-_40_jfhhj1.png" 
  },
  { 
    id: 10, 
    name: "Felipe", 
    age: 40, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692681/Felipe_-_40_y8o6ji.png" 
  },
  { 
    id: 11, 
    name: "Joshe", 
    age: 40, 
    position: "Alero",
    photoUrl: "https://res.cloudinary.com/ddzupqzrl/image/upload/v1763692681/Joshe_r174d3.png" 
  },
];

export const TeamProfile: React.FC = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto bg-slate-900/30 rounded-3xl my-10 border border-slate-800 relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-juventud-blue/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="mb-8 border-b border-slate-800 pb-4 relative z-10">
        <h2 className="text-3xl md:text-4xl font-black text-white uppercase italic">
          Perfil del Equipo & <span className="text-juventud-sky">Categoría</span>
        </h2>
      </div>

      {/* --- SECCIÓN DE FOTO GRUPAL (NUEVO) --- */}
      <div className="relative z-10 mb-12 rounded-2xl overflow-hidden border-4 border-slate-800 shadow-2xl group">
        <div className="absolute top-4 left-4 bg-juventud-blue text-white px-4 py-2 rounded-lg font-bold uppercase tracking-wider shadow-lg z-10">
          Temporada 2025
        </div>
        <div className="aspect-video md:aspect-[21/9] bg-slate-800">
             {/* Reemplaza esta URL con la foto oficial de tu equipo */}
             <img 
               src="https://res.cloudinary.com/ddzupqzrl/image/upload/v1763694219/equipo_capnoh.jpg" 
               alt="Foto Oficial Juventud Master" 
               className="w-full h-full object-cover opacity-90 group-hover:scale-105 transition-transform duration-1000 ease-out"
             />
        </div>
        <div className="absolute bottom-0 left-0 w-full bg-gradient-to-t from-slate-950 to-transparent p-8 pt-20">
            <h3 className="text-2xl text-white font-black italic uppercase">Espíritu de Equipo</h3>
            <p className="text-slate-300">Unidos por la pasión al baloncesto.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16 relative z-10">
        {/* Stats Column */}
        <div className="lg:col-span-4 space-y-8">
           <h3 className="text-xl font-bold text-white mb-4 flex items-center gap-2">
            <UsersIcon /> Distribución por Edad
           </h3>
          <div className="bg-slate-950 p-8 rounded-2xl shadow-inner border border-slate-800">
            <ProgressBar label="Sub-30" percent={25} colorClass="bg-indigo-500" />
            <ProgressBar label="30 - 35 Años" percent={25} colorClass="bg-sky-500" />
            <ProgressBar label="Mayores de 35 (Senior)" percent={50} colorClass="bg-juventud-blue" />
          </div>

          <div className="bg-blue-900/20 border-l-4 border-juventud-sky p-6 rounded-r-xl">
            <h3 className="text-xl font-bold text-juventud-sky mb-4">LA GRAN DECISIÓN 2026:</h3>
            <p className="text-slate-300 mb-4 italic">Análisis del plantel actual:</p>
            <ul className="space-y-3">
              <li className="flex gap-3 items-start">
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm font-bold">A</span>
                <p className="text-slate-200 text-sm">Tenemos un mix interesante de juventud y experiencia (Senior + Sub-30).</p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="bg-slate-800 text-white px-2 py-0.5 rounded text-sm font-bold">B</span>
                <p className="text-slate-200 text-sm">¿Priorizamos el desarrollo de los Sub-30 en Todo Competidor o buscamos resultados en Senior?</p>
              </li>
            </ul>
          </div>
        </div>

        {/* Roster Grid Column */}
        <div className="lg:col-span-8">
          <div className="flex justify-between items-end mb-6">
            <h3 className="text-xl font-bold text-white flex items-center gap-2">
              <Shirt className="w-5 h-5 text-juventud-sky" /> Plantel 2026 ({MOCK_PLAYERS.length} Jugadores)
            </h3>
          </div>
          
          {/* Adjusted grid: 2 cols on mobile, 3 on tablet, 4 on large screens */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
             {MOCK_PLAYERS.map(player => (
               <PlayerCard key={player.id} player={player} />
             ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const UsersIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-juventud-sky"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
);
