# Scripts de Migración y Base de Datos

Este proyecto incluye scripts personalizados para facilitar el manejo de migraciones y seeders con Sequelize.

## 📋 Scripts Disponibles

### 🚀 Servidor
```bash
# Ejecutar en modo desarrollo con nodemon
npm run dev

# Ejecutar en producción
npm start
```

### 🗄️ Base de Datos
```bash
# Crear base de datos
npm run db:create

# Eliminar base de datos
npm run db:drop
```

### 📝 Migraciones

#### Crear una nueva migración
```bash
# Usando el script personalizado (recomendado)
npm run migration:create <nombre-de-la-migracion>

# Ejemplos:
npm run migration:create create-users-table
npm run migration:create add-email-to-users
npm run migration:create create-products-table
```

#### Ejecutar migraciones
```bash
# Ejecutar todas las migraciones pendientes
npm run migration:run

# Revertir la última migración
npm run migration:undo

# Revertir todas las migraciones
npm run migration:undo:all
```

### 🌱 Seeders

#### Crear un nuevo seeder
```bash
# Usando el script personalizado (recomendado)
npm run seed:create <nombre-del-seeder>

# Ejemplos:
npm run seed:create demo-users
npm run seed:create admin-user
npm run seed:create sample-products
```

#### Ejecutar seeders
```bash
# Ejecutar todos los seeders
npm run seed:run

# Revertir el último seeder
npm run seed:undo

# Revertir todos los seeders
npm run seed:undo:all
```

## 📁 Estructura de Archivos

```
├── config/
│   └── config.js          # Configuración de la base de datos
├── migrations/            # Archivos de migración
├── models/               # Modelos de Sequelize
├── seeders/              # Archivos de seeder
├── scripts/
│   ├── create-migration.js  # Script para crear migraciones
│   └── create-seeder.js     # Script para crear seeders
├── .sequelizerc          # Configuración de Sequelize CLI
└── package.json          # Scripts de npm
```

## 🔧 Configuración

Asegúrate de tener las siguientes variables de entorno configuradas en tu archivo `.env`:

```env
DB_USER=tu_usuario
DB_PASS=tu_contraseña
DB_NAME=nombre_de_la_base_de_datos
DB_HOST=localhost
```

## 💡 Consejos de Uso

1. **Nombres descriptivos**: Usa nombres que describan claramente qué hace la migración
   - ✅ `create-users-table`
   - ✅ `add-email-to-users`
   - ❌ `migration-1`

2. **Orden de ejecución**: Siempre ejecuta las migraciones antes que los seeders
   ```bash
   npm run migration:run
   npm run seed:run
   ```

3. **Desarrollo**: Durante el desarrollo, puedes revertir y re-ejecutar migraciones según sea necesario

4. **Producción**: En producción, ten cuidado con `migration:undo:all` ya que elimina todos los datos

## 🚨 Notas Importantes

- Las migraciones se ejecutan en orden cronológico basado en el timestamp del archivo
- Los seeders se ejecutan en orden alfabético
- Siempre revisa el contenido de las migraciones y seeders generados antes de ejecutarlos
- Haz backup de tu base de datos antes de ejecutar migraciones en producción 