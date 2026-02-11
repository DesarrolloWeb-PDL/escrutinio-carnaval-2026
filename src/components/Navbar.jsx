import React from 'react';
import { useScoring } from '../context/ScoringContext';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import { LogOut, LayoutDashboard, PenTool, ShieldCheck } from 'lucide-react';

const Navbar = () => {
  const { state, logout } = useScoring();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="fixed top-0 w-full z-50 glass-card px-6 py-4 flex justify-between items-center border-b border-white/10 group">
      <div className="flex items-center gap-3">
        <div className="bg-yellow-500/20 p-2 rounded-full">
          <ShieldCheck className="text-yellow-500 w-6 h-6" />
        </div>
        <div className="hidden md:block md:opacity-100 md:group-hover:opacity-100 transition-opacity">
          <h1 className="text-xl font-bold text-white tracking-wide">Escrutinio Carnaval 2026</h1>
          <p className="text-xs text-slate-400">Paso de los Libres • desarrolloweb-pdl</p>
        </div>
      </div>

      <div className="flex items-center gap-6">
        {state.user ? (
          <>
            <div className="hidden md:flex gap-1">
               <NavLink 
                 to="/" 
                 className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'text-slate-400 hover:text-white'}`}
               >
                 <LayoutDashboard size={18} />
                 Resultados
               </NavLink>
               {(state.user.role === 'jurado' || state.user.role === 'admin') && (
                 <NavLink 
                   to="/carga" 
                   className={({isActive}) => `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors ${isActive ? 'bg-yellow-500/10 text-yellow-500' : 'text-slate-400 hover:text-white'}`}
                 >
                   <PenTool size={18} />
                   Carga
                 </NavLink>
               )}
            </div>
            
            <div className="flex items-center gap-4 border-l border-slate-700 pl-6">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-medium text-white">{state.user.name}</p>
                <p className="text-xs text-slate-500 uppercase">{state.user.role}</p>
              </div>
              <button 
                onClick={handleLogout}
                className="bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg text-red-500 transition-colors"
                title="Cerrar Sesión"
              >
                <LogOut size={20} />
              </button>
            </div>
          </>
        ) : (
          location.pathname !== '/login' && (
            <NavLink 
              to="/login" 
              className="flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 transition-colors font-medium"
            >
              <ShieldCheck size={18} />
              Acceso
            </NavLink>
          )
        )}
      </div>
    </nav>
  );
};

export default Navbar;
