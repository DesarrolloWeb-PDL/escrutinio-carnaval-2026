import express from 'express';
import prisma from './prisma.js';

const app = express();

// Middleware para parsear JSON
app.use(express.json());

// Endpoint de prueba de salud
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date(), message: 'Backend funcionando correctamente' });
});

// Endpoint para obtener usuarios (ejemplo)
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

// Endpoint para crear un usuario (ejemplo básico)
app.post('/api/users', async (req, res) => {
  const { email, name, password, role } = req.body;
  try {
    // Nota: Deberías hashear la contraseña aquí antes de guardar
    const user = await prisma.user.create({
      data: { email, name, password, role }
    });
    res.json(user);
  } catch (error) {
     console.error('Error creating user:', error);
     res.status(500).json({ error: 'Error creando usuario' });
  }
});

// Iniciar servidor solo si no estamos en Vercel (para desarrollo local)
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
  });
}

export default app;
