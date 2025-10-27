# Angular 20 Microfrontend Architecture

A modern microfrontend architecture demonstrating Angular 20, Module Federation, and professional development practices.

## 🌐 Live Demo

**Production URL**: [https://customers-mf-angular.vercel.app/](https://customers-mf-angular.vercel.app/)

## 📁 Project Structure

```
customers-mf-angular/
├── shell/                    # Host Application (React)
├── customers-mf/             # Customer Management Microfrontend (Angular 20)
├── api/                      # REST API (Vercel Functions)
├── package.json              # Root package configuration
└── vercel.json              # Deployment configuration
```

## 🚀 Installation & Setup

### Prerequisites
- Node.js 22+
- pnpm 10+

### Install Dependencies
```bash
pnpm install
```

### Start Development
```bash
# Start all services (shell + microfrontend + api)
pnpm run dev

# Or start individually
pnpm run start:shell      # Shell app (port 3000)
pnpm run start:customers-mf  # Microfrontend (port 3001)
pnpm run start:api        # API server (port 3002)
```

## 🏗️ Build

```bash
# Build all applications
pnpm run build

# Build individual applications
pnpm run build:shell
pnpm run build:customers-mf
```

## 🧪 Testing

```bash
# Run all tests
pnpm run test

# Run tests with coverage
pnpm run test:coverage

# Run tests in CI mode
pnpm run test:ci
```

## 🛠️ Technology Stack

### Frontend
- **Angular 20**: Latest Angular with standalone components, signals, and control flow
- **Angular Material**: UI component library
- **TypeScript**: Type-safe development
- **RxJS**: Reactive programming

### Architecture
- **Module Federation**: Microfrontend orchestration
- **Standalone Components**: Modern Angular architecture without NgModules
- **Dependency Injection**: Modern `inject()` function

### State Management
- **Angular Signals**: Native reactive primitives with `signal()` and `computed()`
- **NgRx Signal Store**: Advanced state management combining Signals with NgRx patterns

### Development & Deployment
- **pnpm**: Fast package manager
- **rsbuild**: Modern build tool
- **Vercel**: Serverless deployment platform
- **GitHub Actions**: CI/CD automation

## 🔧 Technical Implementation

### Module Federation
The project implements Module Federation to enable microfrontend architecture:

- **Shell Application**: React-based host that dynamically loads the Angular microfrontend
- **Customer Microfrontend**: Angular 20 application exposed as a remote module
- **Shared Dependencies**: Angular core libraries are shared between host and remote
- **Dynamic Loading**: Microfrontend is loaded at runtime based on user navigation

**Configuration**:
```typescript
// shell/module-federation.config.ts
remotes: {
  customersMF: `customersMF@${customersMFUrl}`
}

// customers-mf/rsbuild.config.ts
exposes: {
  './Component': './src/mf-entry.ts',
  './bootstrap': './src/mf-bootstrap.ts'
}
```

### Angular Signals & NgRx Signal Store
Modern state management using Angular's new reactive primitives:

- **Angular Signals**: Used for simple reactive state with `signal()` and `computed()`
- **NgRx Signal Store**: Advanced state management for complex operations
- **Reactive Forms**: Form state management with signal integration
- **Computed Values**: Derived state calculations using `computed()`

**Implementation Example**:
```typescript
// Using Angular Signals
const customers = signal<Customer[]>([]);
const loading = computed(() => customers().length === 0);

// Using NgRx Signal Store
const customerStore = signalStore(
  { providedIn: 'root' },
  withState({ customers: [], loading: false }),
  withMethods((store) => ({
    loadCustomers: () => {
      // Implementation
    }
  }))
);
```

### CI/CD Pipeline
Automated deployment pipeline using GitHub Actions and Vercel:

- **GitHub Actions**: Automated testing and deployment workflow
- **Vercel Integration**: Automatic deployment on push to main branch
- **Monorepo Support**: Both applications deploy together
- **Environment Management**: Automatic environment detection and configuration

**Pipeline Steps**:
1. **Test**: Run comprehensive test suite
2. **Build**: Build both shell and microfrontend applications
3. **Deploy**: Automatic deployment to Vercel
4. **Verify**: Health checks and deployment verification

## 📊 Features

- **Customer Management**: Full CRUD operations with reactive forms
- **Modern UI**: Angular Material with custom styling
- **Responsive Design**: Mobile-first approach
- **Comprehensive Testing**: Unit and integration tests
- **Production Ready**: CI/CD pipeline and deployment

## 🌐 Deployment

The application is automatically deployed to Vercel:

- **Automatic Builds**: Triggered by GitHub pushes
- **Environment Detection**: Automatic development vs production configuration
- **API Integration**: Vercel Functions for backend services
- **CDN Distribution**: Global content delivery

## 🧪 Test Coverage

- **57 test specs** covering components, services, and stores
- **Unit Tests**: Component and service testing with Angular Testing Utilities
- **Integration Tests**: End-to-end workflow testing
- **Signal Testing**: Custom utilities for testing reactive state
- **CI Integration**: Automated test execution in deployment pipeline

---

**Built with Angular 20, Module Federation, and modern web technologies.**