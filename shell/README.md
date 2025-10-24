# Microfrontend Shell Application

A React-based shell application that demonstrates Module Federation by consuming microfrontends from different frameworks.

## 🏗️ Architecture

This shell application serves as the host for multiple microfrontends:

- **React Microfrontend**: Provider component (external)
- **Angular Microfrontend**: Customer Management system (local)

## 🚀 Getting Started

### Prerequisites

- Node.js 16.18.1 or higher
- pnpm (recommended) or npm

### Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the development server:**
   ```bash
   pnpm start
   ```

The shell will be available at `http://localhost:3000`

## 🔧 Configuration

### Module Federation Setup

The shell is configured to consume the following microfrontends:

```typescript
// module-federation.config.ts
export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    'provider': 'rslib_provider@https://unpkg.com/module-federation-rslib-provider@latest/dist/mf/mf-manifest.json',
    'customers-mf': 'customers_mf@http://localhost:3001/remoteEntry.js',
  },
  shared: {
    react: { singleton: true },
    'react-dom': { singleton: true },
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true },
    '@angular/router': { singleton: true },
    'rxjs': { singleton: true },
  },
});
```

### Microfrontend Integration

#### React Microfrontend
- **Source**: External npm package
- **Framework**: React
- **Component**: Provider

#### Angular Microfrontend
- **Source**: Local development server (port 3001)
- **Framework**: Angular 20+
- **Component**: Customer Management System
- **Manifest**: http://localhost:3001/mf-manifest.json

## 🎯 Features

### Shell Application
- **Multi-framework support**: React + Angular
- **Module Federation**: Dynamic microfrontend loading
- **Responsive design**: Mobile-first approach
- **Error handling**: Graceful fallbacks for failed loads

### Customer Management Integration
- **CRUD Operations**: Create, read, update, delete customers
- **Reactive Forms**: Angular Material form validation
- **State Management**: Angular Signals + RxJS
- **Responsive UI**: Material Design components

## 🚀 Running the Complete System

To run the complete microfrontend system:

1. **Start the Angular microfrontend:**
   ```bash
   cd customers-mf
   pnpm run api    # Start mock API (terminal 1)
   pnpm start      # Start Angular MF (terminal 2)
   ```

2. **Start the shell application:**
   ```bash
   cd shell
   pnpm start      # Start shell (terminal 3)
   ```

3. **Access the applications:**
   - Shell: `http://localhost:3000`
   - Angular MF: `http://localhost:3001`
   - Mock API: `http://localhost:3000`

## 🔍 Development

### Adding New Microfrontends

1. **Update module-federation.config.ts:**
   ```typescript
   remotes: {
     'new-mf': 'new_mf@http://localhost:3002/remoteEntry.js',
   }
   ```

2. **Add shared dependencies:**
   ```typescript
   shared: {
     'new-framework': { singleton: true },
   }
   ```

3. **Create integration component:**
   ```typescript
   const NewMF = React.lazy(() => import('new-mf/Component'));
   ```

### Error Handling

The shell includes error boundaries and fallback UI for:
- Network failures
- Module loading errors
- Runtime errors in microfrontends

## 📚 API Integration

The shell coordinates with the Angular microfrontend's API:

- **Base URL**: `http://localhost:3000`
- **Endpoints**: `/customers` (CRUD operations)
- **Mock Data**: json-server with sample customer data

## 🎨 Styling

The shell uses a clean, modern design with:
- **CSS Grid**: Responsive layout
- **Material Design**: Consistent with Angular components
- **Gradient backgrounds**: Visual hierarchy
- **Box shadows**: Depth and separation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with multiple microfrontends
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

---

**Built with ❤️ using React, Angular, and Module Federation**