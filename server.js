import express from 'express';
import path from 'path';
import { fileURLToPath } from 'url';
import prisma from './api/prisma.js';

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
    const users = await prisma.user.findMany({
      select: { id: true, name: true, email: true, role: true }
    });
    res.json(users);
  } catch (error) {
    console.error('Error fetching users:', error);
    res.status(500).json({ error: 'Error al obtener usuarios' });
  }
});

// Crear usuario
app.post('/api/users', async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    const user = await prisma.user.create({
      data: { email, name, password, role }
    });
    res.json(user);
  } catch (error) {
     console.error('Error creating user:', error);
     res.status(500).json({ error: 'Error creando usuario' });
  }
});

// ==================== SPA ROUTING ====================
// Todas las rutas no-API sirven el index.html (React Router se encarga del routing)
app.get(/.*/,  (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// ==================== START SERVER ====================
app.listen(PORT, () => {
  console.log(`
╔════════════════════════════════════════════════════════╗
║  🎭 Escrutinio Carnaval 2026                          ║
║  🚀 Servidor corriendo en http://localhost:${PORT}     ║
╚════════════════════════════════════════════════════════╝
  `);
});
