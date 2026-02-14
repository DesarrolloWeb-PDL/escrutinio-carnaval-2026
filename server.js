import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/src', express.static(path.join(__dirname, 'src')));

// ==================== API ROUTES ====================

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), message: 'Backend funcionando correctamente' });
});

// Obtener usuarios
app.get('/api/users', async (req, res) => {
  try {
    // Lazy load Prisma para evitar errores en inicialización
    const { default: prisma } = await import('./api/prisma.js');
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error al obtener usuarios', details: error.message });
  }
});

// Crear usuario
app.post('/api/users', async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    const { default: prisma } = await import('./api/prisma.js');
    const user = await prisma.user.create({
      data: { email, name, password, role }
    });
    res.json(user);
  } catch (error) {
     console.error('Error creating user:', error);
     res.status(500).json({ error: 'Error creando usuario', details: error.message });
  }
});

// ==================== SPA ROUTING ====================
// Todas las rutas no-API sirven el index.html (React Router se encarga del routing)
app.get(/.*/,  (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== ERROR HANDLER ====================
app.use((err, req, res, next) => {
  console.error('Error general:', err);
  res.status(500).json({ error: 'Error interno del servidor', details: err.message });
});

// ==================== START SERVER ====================
// Solo iniciar servidor si no estamos en Vercel (serverless)
if (process.env.NODE_ENV !== 'production') {
  app.listen(PORT, () => {
    console.log(`
╔════════════════════════════════════════════════════════╗
║  🎭 Escrutinio Carnaval 2026                          ║
║  🚀 Servidor corriendo en http://localhost:${PORT}     ║
╚════════════════════════════════════════════════════════╝
    `);
  });
}

// Exportar para Vercel
export default app;
