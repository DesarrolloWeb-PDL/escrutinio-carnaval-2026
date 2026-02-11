# 🎭 Sistema de Escrutinio - Prisma Setup

## 📋 Índice
- [Configuración Inicial](#configuración-inicial)
- [Comandos Principales](#comandos-principales)
- [Modelos de Datos](#modelos-de-datos)
- [Seed de la Base de Datos](#seed-de-la-base-de-datos)
- [Migraciones](#migraciones)

---

## ⚙️ Configuración Inicial

### 1. Variables de Entorno

El archivo `.env` ya está configurado con una base de datos local de Prisma Postgres.

**Opciones de base de datos:**

#### Opción A: Base de datos local (Desarrollo)
```bash
# Iniciar servidor local de Postgres
npx prisma dev
```
Esto iniciará un servidor PostgreSQL local en tu terminal.

#### Opción B: Prisma Postgres Cloud (Recomendado)
```bash
# Crear base de datos en la nube
npx create-db
```
Sigue las instrucciones y actualiza `DATABASE_URL` en `.env` con la conexión generada.

#### Opción C: PostgreSQL existente
Actualiza `DATABASE_URL` en `.env`:
```env
DATABASE_URL="postgresql://usuario:password@localhost:5432/escrutinio_carnaval?schema=public"
```

---

## 🛠️ Comandos Principales

### Generar el Cliente Prisma
```bash
npx prisma generate
```
Genera el cliente de Prisma para usar en tu código.

### Crear y Aplicar Migraciones
```bash
npx prisma migrate dev --name init
```
Crea la estructura de tablas en la base de datos.

### Poblar Base de Datos (Seed)
```bash
npx prisma db seed
```
Inserta datos iniciales:
- 4 comparsas (Carumbé, Zum Zum, Tradición, Linda Flor)
- 9 rubros de evaluación
- Usuarios de prueba (admin, jurados, veedor)

### Ver Datos en Prisma Studio
```bash
npx prisma studio
```
Abre una interfaz visual para ver y editar datos.

### Ver Estado de Migraciones
```bash
npx prisma migrate status
```

### Reset Completo (⚠️ Solo desarrollo)
```bash
npx prisma migrate reset
```
Elimina y recrea la base de datos con el seed.

---

## 📊 Modelos de Datos

### 👤 User (Usuarios)
Jurados, administradores y veedores del sistema.
```prisma
- id: String (cuid)
- email: String (único)
- name: String
- password: String (bcrypt hash)
- role: ADMIN | JURADO | VEEDOR
- active: Boolean
```

### 🎉 Comparsa
Las 4 comparsas participantes.
```prisma
- id: String ('carumbe', 'zumzum', 'tradicion', 'lindaflor')
- name: String
- color: String (Tailwind class)
- bg: String (Tailwind background)
```

### 📝 Rubro
Los 9 rubros de evaluación según Manual 2026.
```prisma
- id: String ('alegorias', 'baianas', 'bateria', etc.)
- name: String
- guiaTecnica: String (Guía del Manual 2026)
- orden: Int
```

### ⭐ Score (Notas)
Calificaciones cargadas por los jurados.
```prisma
- id: String (cuid)
- noche: String ('noche1' o 'noche2')
- comparsaId: String
- rubroId: String
- judgeId: String
- score: Float (5.0 a 10.0)
- justification: String (obligatorio si < 10.0)
- hash: String (validación)
- ipAddress: String

Constraint único: [noche, comparsaId, rubroId, judgeId]
```

### 🚫 Sancion
Sanciones administrativas (Manual 2026).
```prisma
- id: String (cuid)
- comparsaId: String
- adminId: String
- puntos: Float (descuento)
- motivo: String
- noche: String
```

### 📋 AuditLog
Registro de auditoría para trazabilidad.
```prisma
- id: String (cuid)
- userId: String
- action: String (SUBMIT_SCORE, ADD_SANCION, etc.)
- details: String
- ipAddress: String
- userAgent: String
- timestamp: DateTime
```

---

## 🌱 Seed de la Base de Datos

El archivo `seed.js` crea:

### Comparsas
1. **Carumbé** (rojo)
2. **Zum Zum** (verde)
3. **Tradición** (azul)
4. **Linda Flor** (rosa)

### Rubros (Manual 2026)
1. Alegorías
2. Baianas
3. Batería
4. Comisión de Frente
5. Destaques
6. Enredo
7. Armonía
8. Mestre y Portabandera
9. Samba de Enredo

### Usuarios por Defecto
| Email | Password | Role |
|-------|----------|------|
| admin@carnaval.uy | admin123 | ADMIN |
| jurado1@carnaval.uy | jurado123 | JURADO |
| jurado2@carnaval.uy | jurado123 | JURADO |
| veedor@carnaval.uy | veedor123 | VEEDOR |

---

## 🔄 Migraciones

### Crear Nueva Migración
Después de modificar `schema.prisma`:
```bash
npx prisma migrate dev --name nombre_descriptivo
```

### Aplicar Migraciones en Producción
```bash
npx prisma migrate deploy
```

---

## 🔐 Seguridad

- Las contraseñas se almacenan hasheadas con **bcrypt** (10 rounds)
- Cada `Score` tiene un campo `hash` para validación de integridad
- El `AuditLog` registra todas las acciones críticas con IP y timestamp
- Constraint único evita votos duplicados: un jurado no puede votar dos veces la misma comparsa/rubro en una noche

---

## 📚 Recursos

- [Documentación Prisma](https://www.prisma.io/docs)
- [Manual del Jurado 2026](../manual-jurado.html)
- [Prisma Studio](https://www.prisma.io/studio)

---

## 🆘 Troubleshooting

### Error: "Can't reach database server"
1. Verifica que el servidor de base de datos esté corriendo
2. Revisa la `DATABASE_URL` en `.env`
3. Intenta con `npx prisma dev` para servidor local

### Error en Migraciones
```bash
npx prisma migrate reset  # ⚠️ Solo en desarrollo
```

### Regenerar Cliente
```bash
npx prisma generate --force
```

---

## ✅ Checklist de Setup

- [ ] Instalar dependencias: `npm install`
- [ ] Configurar `DATABASE_URL` en `.env`
- [ ] Generar cliente: `npx prisma generate`
- [ ] Crear migraciones: `npx prisma migrate dev --name init`
- [ ] Poblar datos: `npx prisma db seed`
- [ ] Verificar en Prisma Studio: `npx prisma studio`
- [ ] Actualizar código para usar el cliente generado

---

**🎉 ¡Ahora tu base de datos está lista para el Carnaval 2026!**
