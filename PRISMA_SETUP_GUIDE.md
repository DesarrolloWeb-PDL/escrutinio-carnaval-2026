# 🔧 Guía de Configuración de Prisma

## ⚠️ Problema Actual

Prisma 7 requiere configuración específica del cliente. El servidor `prisma dev` está corriendo pero el seed necesita configuración adicional.

## ✅ Soluciones Disponibles

### Opción 1: Prisma Postgres Cloud (Recomendado para este proyecto)

La opción más simple y sin instalación local de PostgreSQL.

#### Pasos:

1. **Crear base de datos en la nube:**
   ```bash
   npx create-db
   ```
   - Sigue las instrucciones en pantalla
   - Copia la `DATABASE_URL` generada

2. **Actualizar archivo `.env`:**
   ```env
   DATABASE_URL="prisma+postgres://accelerate.prisma-data.net/?api_key=TU_API_KEY_AQUI"
   ```

3. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate deploy
   ```

4. **Ejecutar seed:**
   ```bash
   npx prisma db seed
   ```

---

### Opción 2: PostgreSQL Local

Si tienes PostgreSQL instalado localmente (ej: con XAMPP, Docker, o instalación nativa).

#### Pasos:

1. **Asegúrate de que PostgreSQL esté corriendo** (puerto 5432 por defecto)

2. **Crear base de datos:**
   ```sql
   CREATE DATABASE escrutinio_carnaval;
   ```

3. **Actualizar archivo `.env`:**
   ```env
   DATABASE_URL="postgresql://postgres:tu_password@localhost:5432/escrutinio_carnaval"
   ```

4. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Ejecutar seed:**
   ```bash
   npx prisma db seed
   ```

---

### Opción 3: Docker (PostgreSQL en contenedor)

Si tienes Docker instalado.

#### Pasos:

1. **Crear archivo `docker-compose.yml` en la raíz del proyecto:**
   ```yaml
   version: '3.8'
   services:
     postgres:
       image: postgres:15-alpine
       environment:
         POSTGRES_USER: postgres
         POSTGRES_PASSWORD: postgres
         POSTGRES_DB: escrutinio_carnaval
       ports:
         - "5432:5432"
       volumes:
         - postgres_data:/var/lib/postgresql/data

   volumes:
     postgres_data:
   ```

2. **Iniciar contenedor:**
   ```bash
   docker-compose up -d
   ```

3. **Actualizar archivo `.env`:**
   ```env
   DATABASE_URL="postgresql://postgres:postgres@localhost:5432/escrutinio_carnaval"
   ```

4. **Ejecutar migraciones:**
   ```bash
   npx prisma migrate dev --name init
   ```

5. **Ejecutar seed:**
   ```bash
   npx prisma db seed
   ```

---

## 📊 Estado Actual del Proyecto

### ✅ Completado:

1. ✅ Prisma instalado (`@prisma/client` y `prisma`)
2. ✅ Schema configurado con 6 modelos:
   - User (usuarios del sistema)
   - Comparsa (4 comparsas)
   - Rubro (9 rubros de evaluación)
   - Score (notas de jurados)
   - Sancion (sanciones administrativas)
   - AuditLog (trazabilidad)
3. ✅ Migración inicial creada (`20260211174847_init`)
4. ✅ Archivo seed preparado con:
   - 4 comparsas (Carumbé, Zum Zum, Tradición, Linda Flor)
   - 9 rubros según Manual 2026
   - Usuarios de ejemplo (admin, jurados, veedor)
5. ✅ Cliente Prisma generado

### ⏳ Pendiente:

- Configurar DATABASE_URL definitiva (elegir una de las 3 opciones arriba)
- Ejecutar seed para poblar la base de datos

---

## 🎯 Próximos Pasos Recomendados

1. **Elegir una de las 3 opciones** según tus preferencias/instalaciones
2. **Configurar DATABASE_URL** en el archivo `.env`
3. **Ejecutar migraciones** si es necesario
4. **Ejecutar seed**: `npx prisma db seed`
5. **Verificar datos**: `npx prisma studio`

---

## 🛠️ Comandos Útiles

```bash
# Ver datos en interfaz visual
npx prisma studio

# Estado de migraciones
npx prisma migrate status

# Regenerar cliente si cambias el schema
npx prisma generate

# Reset completo (⚠️ Solo desarrollo)
npx prisma migrate reset

# Ver logs del servidor prisma dev
# (si está corriendo en background)
```

---

## 💡 Recomendación

**Para este proyecto de escrutinio del Carnaval**, recomiendo:

- **Desarrollo/Testing:** Opción 1 (Prisma Postgres Cloud) - Más simple, sin instalaciones
- **Producción:** Opción 1 también, o un servidor PostgreSQL dedicado con backup

---

## 📞 ¿Necesitas Ayuda?

Si tienes dudas sobre cuál opción elegir o cómo proceder:
1. Dime qué tienes instalado (PostgreSQL, Docker, etc.)
2. Dime si prefieres cloud o local
3. Te ayudo con la configuración específica

---

**Estado actual:** Base de datos creada y migrada, solo falta configurar la URL final y ejecutar el seed.
