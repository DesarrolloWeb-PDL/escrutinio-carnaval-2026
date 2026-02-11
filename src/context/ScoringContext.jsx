import { createContext, useContext, useReducer, useEffect } from 'react';

const ScoringContext = createContext();

const initialState = {
  scores: [], // { id, comparsaId, rubroId, score, justification, timestamp, judgeId }
  user: JSON.parse(localStorage.getItem('user')) || null, // { id, name, role }
  auditLog: [], // { id, action, user, timestamp, details }
  isLocked: false // Final lock by admin
};

// Mock encryption function
const encryptScore = (scoreData) => {
  // Simulación de encriptación
  return btoa(JSON.stringify(scoreData));
};

const scoringReducer = (state, action) => {
  switch (action.type) {
    case 'LOGIN':
      return { ...state, user: action.payload };
    case 'LOGOUT':
      return { ...state, user: null };
    case 'ADD_SCORE_BATCH': // Para cargar datos mockeados
       return { ...state, scores: action.payload };
    case 'ADD_SCORE':
       // Verificar si ya existe voto para esa comparsa/rubro por ese jurado no es necesario aquí si se valida en el form,
       // pero para robustez:
       const newScore = {
         ...action.payload,
         timestamp: new Date().toISOString(),
         hash: encryptScore(action.payload)
       };
       
       const newAuditEntry = {
         id: Date.now(),
         action: 'SUBMIT_SCORE',
         user: state.user?.name || 'Unknown',
         timestamp: new Date().toISOString(),
         details: `Nota cargada para ${action.payload.comparsaId} en ${action.payload.rubroId}`
       };

       return {
         ...state,
         scores: [...state.scores, newScore],
         auditLog: [...state.auditLog, newAuditEntry]
       };
    default:
      return state;
  }
};

export const ScoringProvider = ({ children }) => {
  const [state, dispatch] = useReducer(scoringReducer, initialState);

  const login = (userData) => {
    // Simular Token JWT
    localStorage.setItem('token', 'mock-jwt-token-xyz');
    localStorage.setItem('user', JSON.stringify(userData));
    dispatch({ type: 'LOGIN', payload: userData });
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    dispatch({ type: 'LOGOUT' });
  };

  const addScore = (scoreData) => {
    dispatch({ type: 'ADD_SCORE', payload: scoreData });
  };

  const getScoresByComparsa = (comparsaId) => {
    return state.scores.filter(s => s.comparsaId === comparsaId);
  };
  
  const getTotalScore = (comparsaId) => {
    const scores = getScoresByComparsa(comparsaId);
    return scores.reduce((acc, curr) => acc + parseFloat(curr.score), 0).toFixed(1);
  };

  return (
    <ScoringContext.Provider value={{ state, login, logout, addScore, getScoresByComparsa, getTotalScore }}>
      {children}
    </ScoringContext.Provider>
  );
};

export const useScoring = () => useContext(ScoringContext);
