// API base URL - como el frontend y backend están en el mismo servidor, siempre usamos /api
const API_URL = '/api';

/**
 * Función helper para hacer peticiones a la API
 * Maneja automáticamente JSON y errores comunes
 */
export async function api(endpoint, { method = 'GET', body, headers = {} } = {}) {
  const config = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers,
    },
  };

  if (body) {
    config.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(`${API_URL}${endpoint}`, config);
    
    // Si la respuesta no es OK, lanza error
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Error ${response.status}: ${response.statusText}`);
    }

    // Intenta parsear JSON, si falla devuelve null (ej: 204 No Content)
    return await response.json().catch(() => null);
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
}

// Ejemplos de uso:
// const users = await api('/users');
// await api('/users', { method: 'POST', body: { name: 'Juan' } });
