import React from 'react';
import { useScoring } from '../context/ScoringContext';
import { COMPARSAS } from '../constants/data';
import { motion } from 'framer-motion';
import { Trophy, TrendingUp, AlertCircle, Radio } from 'lucide-react';

const StatCard = ({ title, value, comparsa }) => (
  <div className={`p-4 rounded-xl border border-white/5 ${comparsa.bg} backdrop-blur-sm`}>
    <p className="text-slate-400 text-xs uppercase tracking-wider mb-1">{title}</p>
    <div className="flex justify-between items-end">
        <h3 className={`text-2xl font-bold ${comparsa.color}`}>{value}</h3>
        <TrendingUp size={16} className={`${comparsa.color} opacity-50`} />
    </div>
  </div>
);

const Dashboard = () => {
  const { getTotalScore, state } = useScoring();

  // Calcular ranking
  const ranking = COMPARSAS.map(c => ({
    ...c,
    total: parseFloat(getTotalScore(c.id))
  })).sort((a, b) => b.total - a.total);

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      
      {/* Header */}
      <div className="text-center mb-8 pt-20">
        <h2 className="text-3xl md:text-5xl font-bold bg-gradient-to-r from-yellow-200 to-yellow-500 bg-clip-text text-transparent mb-2">
          Carnaval 2026 - En Vivo
        </h2>
        <p className="hidden md:block text-slate-400 text-lg">Noche 1 • Sambódromo Municipal de Paso de los Libres</p>
      </div>

      {/* Video Grande con Overlay de Puntajes */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card rounded-2xl overflow-hidden border-2 border-red-500/30 shadow-2xl shadow-red-500/10"
      >
        <div className="bg-red-600/20 px-6 py-3 flex items-center justify-between border-b border-red-500/30">
          <div className="flex items-center gap-2">
            <Radio className="text-red-500 animate-pulse" size={20} />
            <h3 className="text-lg font-bold text-white">Transmisión en Directo</h3>
          </div>
          <span className="text-xs bg-red-500 text-white px-3 py-1 rounded-full font-bold uppercase tracking-wide">Live</span>
        </div>
        
        <div className="relative aspect-video bg-black">
          {/* Video de YouTube */}
          <iframe 
            className="w-full h-full"
            src="https://www.youtube.com/embed/M7nTd1DfL24?si=Mo4e_zDUPof95Hjn"
            title="YouTube video player"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
          ></iframe>

          {/* Overlay de Puntajes sobre el Video */}
          <div className="absolute inset-0 pointer-events-none">
            {/* Barra superior con título */}
            <div className="absolute top-0 left-0 right-0 bg-gradient-to-b from-black/80 to-transparent p-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Trophy className="text-yellow-400" size={24} />
                  <h3 className="text-white text-xl font-bold">RESULTADOS EN VIVO</h3>
                </div>
                <div className="flex items-center gap-2 text-green-400">
                  <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                  <span className="text-sm font-bold">EN VIVO</span>
                </div>
              </div>
            </div>

            {/* Grid de Puntajes - Esquina inferior */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/70 to-transparent p-6">
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
                {COMPARSAS.map((comparsa, index) => (
                  <motion.div 
                    key={comparsa.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className={`${comparsa.bg} backdrop-blur-xl border-2 border-white/20 rounded-xl p-4 shadow-2xl`}
                  >
                    <div className="flex items-center gap-2 mb-2">
                      <div className={`w-2 h-2 rounded-full ${comparsa.bg.replace('/10', '')} animate-pulse`}></div>
                      <p className={`text-sm font-bold ${comparsa.color} uppercase tracking-wide`}>{comparsa.name}</p>
                    </div>
                    <div className="flex items-baseline gap-1">
                      <p className={`text-4xl font-black ${comparsa.color}`}>{getTotalScore(comparsa.id)}</p>
                      <p className="text-xs text-slate-400">pts</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.div>

       {/* Tabla de Clasificación */}
       <motion.div 
         initial={{ opacity: 0, y: 20 }}
         animate={{ opacity: 1, y: 0 }}
         className="mt-12 glass-card rounded-2xl overflow-hidden"
       >
         <div className="p-6 border-b border-white/5 flex items-center justify-between">
             <h3 className="text-2xl font-semibold flex items-center gap-2">
                 <Trophy className="text-yellow-500" />
                 Clasificación General
             </h3>
             <span className="text-xs text-slate-500 bg-slate-800 px-3 py-1 rounded">Actualizado en tiempo real</span>
         </div>
         
         <div className="overflow-x-auto">
           <table className="w-full text-left">
             <thead className="bg-slate-900/50 text-slate-400 text-xs uppercase">
               <tr>
                 <th className="px-6 py-4">Posición</th>
                 <th className="px-6 py-4">Institución</th>
                 <th className="px-6 py-4 text-right">Puntaje Total</th>
                 <th className="px-6 py-4 text-right">Penalidades</th>
                 <th className="px-6 py-4 text-right">Puntaje Neto</th>
               </tr>
             </thead>
             <tbody className="divide-y divide-white/5">
               {ranking.map((row, index) => (
                 <tr key={row.id} className="hover:bg-white/5 transition-colors group">
                   <td className="px-6 py-4 font-mono text-slate-500 text-lg">
                     {index + 1 === 1 ? <span className="text-yellow-400 font-bold text-2xl">#1 🏆</span> : `#${index+1}`}
                   </td>
                   <td className="px-6 py-4">
                     <div className="flex items-center gap-3">
                         <div className={`w-4 h-4 rounded-full ${row.bg.replace('/10', '')}`}></div>
                         <span className="font-medium text-xl">{row.name}</span>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-right font-mono text-slate-300 text-lg">{row.total}</td>
                   <td className="px-6 py-4 text-right font-mono text-red-400">-0.0</td>
                   <td className="px-6 py-4 text-right">
                     <span className={`px-4 py-2 rounded-full text-lg font-bold bg-slate-800 text-white`}>
                         {row.total}
                     </span>
                   </td>
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </motion.div>

       {/* Audit Log Mini View */}
       <div className="mt-8 max-w-4xl mx-auto">
            <h4 className="text-sm uppercase text-slate-500 mb-4 px-2 flex items-center gap-2">
              <AlertCircle size={16} />
              Actividad Reciente del Sistema
            </h4>
            <div className="glass-card rounded-xl p-4 max-h-48 overflow-y-auto space-y-2">
                {state.auditLog.length === 0 ? (
                    <p className="text-slate-500 text-sm text-center italic py-4">Esperando datos...</p>
                ) : (
                    state.auditLog.slice().reverse().map(log => (
                        <div key={log.id} className="flex items-center text-xs text-slate-400 gap-2 border-b border-white/5 pb-2 last:border-0 last:pb-0">
                            <span className="text-slate-600 font-mono">{log.timestamp.split('T')[1].split('.')[0]}</span>
                            <span className="text-blue-400 font-semibold">{log.user}</span>
                            <span>{log.details}</span>
                        </div>
                    ))
                )}
            </div>
       </div>

    </div>
  );
};

export default Dashboard;
