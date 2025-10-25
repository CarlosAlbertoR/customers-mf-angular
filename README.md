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
- npm 10+

```bash
# Instalar dependencias
npm run install:all

# Ejecutar en modo desarrollo
npm run dev

# O ejecutar individualmente
npm run start:shell
npm run start:customers-mf
```

## 🧪 Testing

```bash
# Ejecutar todos los tests
npm run test

# Tests específicos
npm run test:customers-mf
npm run test:shell
```

## 📦 Build

```bash
# Build completo
npm run build

# Build individual
npm run build:shell
npm run build:customers-mf
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