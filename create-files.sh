#!/bin/bash

# --- Script v2 (TypeScript-First) para crear la estructura del monorepo ---

PROJECT_NAME="agente-logistica-ia"

echo "Creando el directorio raíz del proyecto: $PROJECT_NAME..."
mkdir -p "$PROJECT_NAME"
cd "$PROJECT_NAME"

# --- 1. Crear directorios de primer nivel ---
echo "Creando directorios principales: docs, infrastructure, packages..."
mkdir -p docs infrastructure/modules packages

# --- 2. Crear archivos de configuración en la raíz ---
echo "Creando archivos de configuración del monorepo para TypeScript..."
touch .gitignore
cat <<EOT >> .gitignore
# Dependencias
node_modules/
.pnp.*
.npm

# Archivos de build y logs
dist/
build/
.next/
out/
logs
*.log
npm-debug.log*
pnpm-debug.log*

# Entorno y Secretos
.env
.env.local
.env.*.local
*.env

# Cache de SO y editores
.DS_Store
Thumbs.db
.vscode/

# TypeScript
*.tsbuildinfo
EOT

touch package.json
cat <<EOT >> package.json
{
  "name": "agente-logistica-ia-monorepo",
  "private": true,
  "scripts": {
    "dev:ui": "pnpm --filter ui-web dev",
    "dev:api": "pnpm --filter orchestrator-api dev",
    "build": "pnpm -r build",
    "type-check": "pnpm -r type-check"
  },
  "devDependencies": {
    "typescript": "^5.0.0"
  }
}
EOT

touch pnpm-workspace.yaml
echo 'packages:' >> pnpm-workspace.yaml
echo '  - "packages/*"' >> pnpm-workspace.yaml

# tsconfig.base.json - Configuración que todos los paquetes heredarán
touch tsconfig.base.json
cat <<EOT >> tsconfig.base.json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "commonjs",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true
  }
}
EOT

# --- 3. Poblar directorios de alto nivel ---
echo "Creando archivos de documentación e infraestructura..."
touch docs/ARCHITECTURE.md
touch infrastructure/main.tf
touch infrastructure/variables.tf
touch infrastructure/modules/gcs.tf
touch infrastructure/modules/cloud_run.tf
touch infrastructure/modules/vertex_ai.tf

# --- 4. Poblar el directorio 'packages' con estructura TypeScript ---
echo "Creando la estructura de los paquetes con configuración TypeScript..."

# Paquete: shared-types
mkdir -p packages/shared-types/src
touch packages/shared-types/src/index.ts
touch packages/shared-types/package.json
touch packages/shared-types/tsconfig.json

# Paquete: orchestrator-api
mkdir -p packages/orchestrator-api/src/api packages/orchestrator-api/src/config packages/orchestrator-api/src/services packages/orchestrator-api/src/tools/definitions packages/orchestrator-api/src/tools/implementations/local
mkdir -p packages/orchestrator-api/tests/unit packages/orchestrator-api/tests/integration
touch packages/orchestrator-api/src/index.ts
touch packages/orchestrator-api/Dockerfile
touch packages/orchestrator-api/package.json
touch packages/orchestrator-api/tsconfig.json

# Paquete: indexer-service
mkdir -p packages/indexer-service/src/steps packages/indexer-service/src/clients
mkdir -p packages/indexer-service/tests
touch packages/indexer-service/src/index.ts
touch packages/indexer-service/package.json
touch packages/indexer-service/tsconfig.json

# Paquete: ui-web (React con TypeScript)
mkdir -p packages/ui-web/src/components packages/ui-web/src/pages packages/ui-web/src/services
touch packages/ui-web/src/App.tsx
touch packages/ui-web/src/main.tsx
touch packages/ui-web/Dockerfile
touch packages/ui-web/package.json
touch packages/ui-web/tsconfig.json
touch packages/ui-web/vite.config.ts

echo ""
echo "¡Estructura de directorios TypeScript-first creada exitosamente en la carpeta '$PROJECT_NAME'!"
echo "Próximos pasos sugeridos:"
echo "1. Navega a la carpeta: cd $PROJECT_NAME"
echo "2. Inicializa Git: git init && git add . && git commit -m 'Initial project structure'"
echo "3. Instala dependencias: pnpm install"