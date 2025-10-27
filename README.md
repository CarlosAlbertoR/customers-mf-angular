# Angular 20 Microfrontend Architecture

Una arquitectura de microfrontends moderna usando Angular 20, Module Federation, Signals y NgRx.

## 🏗️ Arquitectura

```
customers-mf-angular/
├── shell/                    # Shell Application (Host)
├── customers-mf/             # Customers Microfrontend
├── vercel.json              # Vercel Configuration
├── package.json             # Root package.json
└── README.md
```

## 🚀 Despliegue en Vercel

### 🌐 **Demo en Vivo:**
**URL**: [https://customers-mf-angular.vercel.app/](https://customers-mf-angular.vercel.app/)

### Opción 1: Despliegue Automático
1. Conecta tu repositorio a Vercel
2. Vercel detectará automáticamente la configuración
3. Se desplegarán ambos proyectos

### Opción 2: Despliegue Manual
```bash
# Instalar Vercel CLI
npm i -g vercel

# Desplegar
vercel --prod
```

## 🛠️ Desarrollo Local

**Requisitos:**
- Node.js 22+
- pnpm 8+

### 🚀 **Comandos Rápidos (Makefile)**

```bash
# Ver todos los comandos disponibles
make help

# Instalar dependencias
make install

# Iniciar todos los servicios (shell + mf + api)
make start

# Modo desarrollo
make dev

# Ejecutar tests
make test

# Build completo
make build
```

### 📦 **Comandos Individuales**

```bash
# Instalar dependencias
pnpm install

# Ejecutar en modo desarrollo
pnpm run dev

# O ejecutar individualmente
pnpm run start:shell
pnpm run start:customers-mf
pnpm run start:api
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
pnpm run test

# Tests específicos
pnpm run test:customers-mf
pnpm run test:shell
```

## 📦 Build

```bash
# Build completo
pnpm run build

# Build individual
pnpm run build:shell
pnpm run build:customers-mf
```

## 🌐 URLs de Despliegue

- **Shell App**: `https://tu-proyecto.vercel.app/`
- **Customers MF**: `https://tu-proyecto.vercel.app/customers/`

## 🔧 Tecnologías

- **Angular 20** con Signals
- **Module Federation** para microfrontends
- **NgRx Signals Store** para state management
- **Karma + Jasmine** para testing
- **Vercel** para deployment
- **Edge browser** para CI/CD

## 📊 Cobertura de Tests

- **57 specs** ejecutándose
- **54 tests pasando** (94.7% de éxito)
- **Cobertura completa** de servicios, componentes y stores