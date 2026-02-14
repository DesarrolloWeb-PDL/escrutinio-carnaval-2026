# Script para crear repositorio independiente

## Pasos a seguir:

### 1. Crear nuevo repositorio en GitHub
- Ve a: https://github.com/organizations/DesarrolloWeb-PDL/repositories/new
- Nombre: `escrutinio-carnaval-2026-nuevo` (o el mismo nombre si primero borras el actual)
- Descripción: "Sistema de Escrutinio Carnaval 2026 - Paso de los Libres"
- **NO** inicializar con README, .gitignore, ni license
- Click en "Create repository"

### 2. Cambiar el remote en tu repositorio local

```powershell
# Verificar remote actual
git remote -v

# Guardar una copia del remote actual por si acaso
git remote rename origin origin-old

# Agregar el nuevo remote apuntando al repo nuevo
git remote add origin https://github.com/DesarrolloWeb-PDL/escrutinio-carnaval-2026.git

# Hacer push de todo al nuevo repo
git push -u origin main

# Verificar que funcionó
git remote -v
```

### 3. Una vez que verifiques que funcionó:

```powershell
# Eliminar el remote viejo
git remote remove origin-old
```

### 4. Actualizar Vercel
- Ve a tu proyecto en Vercel
- Settings → Git
- Disconnect del repo viejo
- Importa el nuevo repositorio: DesarrolloWeb-PDL/escrutinio-carnaval-2026

### 5. (Opcional) Borrar el repo viejo
Si quieres borrar el repo viejo de GitHub:
- Ve al repo viejo en GitHub
- Settings → Danger Zone → Delete this repository

---

## O si prefieres mantener el mismo nombre:

1. Borra primero el repo actual en GitHub
2. Crea uno nuevo con el mismo nombre
3. Sigue los pasos del punto 2 en adelante
