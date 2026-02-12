import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';
import 'dotenv/config';

// Para Prisma 7 necesitamos pasar la accelerateUrl si usamos Prisma Accelerate
const prisma = new PrismaClient({
  log: ['query', 'info', 'warn', 'error'],
  // Usar la URL de Accelerate si está disponible
  ...(process.env.PRISMA_ACCELERATE_URL && {
    accelerateUrl: process.env.PRISMA_ACCELERATE_URL
  })
});

async function main() {
  console.log('🌱 Iniciando seed de la base de datos...');

  // 1. Limpiar datos existentes (solo en desarrollo)
  await prisma.auditLog.deleteMany();
  await prisma.sancion.deleteMany();
  await prisma.score.deleteMany();
  await prisma.rubro.deleteMany();
  await prisma.comparsa.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Base de datos limpiada');

  // 2. Crear Comparsas
  const comparsas = await Promise.all([
    prisma.comparsa.create({
      data: {
        id: 'carumbe',
        name: 'Carumbé',
        color: 'text-red-500',
        bg: 'bg-red-500/10',
      },
    }),
    prisma.comparsa.create({
      data: {
        id: 'zumzum',
        name: 'Zum Zum',
        color: 'text-green-500',
        bg: 'bg-green-500/10',
      },
    }),
    prisma.comparsa.create({
      data: {
        id: 'tradicion',
        name: 'Tradición',
        color: 'text-blue-500',
        bg: 'bg-blue-500/10',
      },
    }),
    prisma.comparsa.create({
      data: {
        id: 'lindaflor',
        name: 'Linda Flor',
        color: 'text-pink-500',
        bg: 'bg-pink-500/10',
      },
    }),
  ]);

  console.log(`✅ ${comparsas.length} comparsas creadas`);

  // 3. Crear Rubros (Manual del Jurado 2026)
  const rubros = await Promise.all([
    prisma.rubro.create({
      data: {
        id: 'alegorias',
        name: 'Alegorías',
        guiaTecnica:
          'NO restar por: merchandising, publicidad comercial en carros alegóricos, fallas de sonido ajenas a la comparsa.',
        orden: 1,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'baianas',
        name: 'Baianas',
        guiaTecnica:
          'NO restar por: problemas de iluminación externa, fallas técnicas del sambódromo.',
        orden: 2,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'bateria',
        name: 'Batería',
        guiaTecnica:
          'NO restar por: fallas de amplificación externa, problemas de micrófono del sambódromo.',
        orden: 3,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'comision_frente',
        name: 'Comisión de Frente',
        guiaTecnica:
          'NO restar por: problemas climáticos, demoras ajenas a la comparsa.',
        orden: 4,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'destaques',
        name: 'Destaques',
        guiaTecnica:
          'NO restar por: merchandising en vestuario, problemas de iluminación del sambódromo.',
        orden: 5,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'enredo',
        name: 'Enredo',
        guiaTecnica:
          'NO restar por: interpretaciones artísticas válidas del tema histórico propuesto.',
        orden: 6,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'armonia',
        name: 'Armonía',
        guiaTecnica:
          'NO restar por: diferencias en coreografía por sectores (si están coordinados internamente).',
        orden: 7,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'mestre_porta_bandera',
        name: 'Mestre y Portabandera',
        guiaTecnica:
          'NO restar por: caída de elementos decorativos si no afecta la performance, problemas de iluminación.',
        orden: 8,
      },
    }),
    prisma.rubro.create({
      data: {
        id: 'samba_enredo',
        name: 'Samba de Enredo',
        guiaTecnica:
          'NO restar por: fallas de sonido ajenas a la comparsa, problemas de amplificación externa. Verificar criterios de ejecución musical.',
        orden: 9,
      },
    }),
  ]);

  console.log(`✅ ${rubros.length} rubros creados`);

  // 4. Crear usuarios de ejemplo
  const hashedPassword = await bcrypt.hash('admin123', 10);

  const admin = await prisma.user.create({
    data: {
      email: 'admin@carnaval.uy',
      name: 'Administrador',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  const jurado1 = await prisma.user.create({
    data: {
      email: 'jurado1@carnaval.uy',
      name: 'Jurado 1',
      password: await bcrypt.hash('jurado123', 10),
      role: 'JURADO',
    },
  });

  const jurado2 = await prisma.user.create({
    data: {
      email: 'jurado2@carnaval.uy',
      name: 'Jurado 2',
      password: await bcrypt.hash('jurado123', 10),
      role: 'JURADO',
    },
  });

  const veedor = await prisma.user.create({
    data: {
      email: 'veedor@carnaval.uy',
      name: 'Veedor Oficial',
      password: await bcrypt.hash('veedor123', 10),
      role: 'VEEDOR',
    },
  });

  console.log('✅ Usuarios creados:');
  console.log('   👤 Admin:', admin.email);
  console.log('   👤 Jurado 1:', jurado1.email);
  console.log('   👤 Jurado 2:', jurado2.email);
  console.log('   👤 Veedor:', veedor.email);

  // 5. Crear un AuditLog inicial
  await prisma.auditLog.create({
    data: {
      userId: admin.id,
      action: 'SEED_DATABASE',
      details: 'Base de datos inicializada con datos del Carnaval 2026',
      ipAddress: '127.0.0.1',
    },
  });

  console.log('✅ Audit log inicial creado');
  console.log('');
  console.log('🎉 Seed completado exitosamente!');
  console.log('');
  console.log('📋 Credenciales por defecto:');
  console.log('   Admin: admin@carnaval.uy / admin123');
  console.log('   Jurado: jurado1@carnaval.uy / jurado123');
  console.log('');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error('❌ Error en seed:', e);
    await prisma.$disconnect();
    process.exit(1);
  });
