import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ScoringProvider, useScoring } from './context/ScoringContext';
import Navbar from './components/Navbar';
import Dashboard from './pages/Dashboard';
import JudgeConsole from './pages/JudgeConsole';
import Login from './pages/Login';

// Componente para proteger rutas privadas
const PrivateRoute = ({ children, allowedRoles }) => {
    const { state } = useScoring();
    
    if (!state.user) {
        return <Navigate to="/login" replace />;
    }

    if (allowedRoles && !allowedRoles.includes(state.user.role)) {
        return <Navigate to="/" replace />; // Redirigir a home si no tiene permisos
    }

    return children;
};

const AppContent = () => {
    return (
        <Router>
             <Navbar />
             <Routes>
                 <Route path="/login" element={<Login />} />
                 
                 {/* Dashboard público - sin login requerido */}
                 <Route path="/" element={<Dashboard />} />

                 {/* La página de carga solo para jueces y admins - requiere login */}
                 <Route path="/carga" element={
                     <PrivateRoute allowedRoles={['jurado', 'admin']}>
                         <JudgeConsole />
                     </PrivateRoute>
                 } />
             </Routes>
        </Router>
    )
}

function App() {
  return (
    <ScoringProvider>
       <AppContent />
    </ScoringProvider>
  );
}

export default App;
