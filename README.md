# Microfrontend System with Angular & React

A complete microfrontend system demonstrating Module Federation with Angular 20+ and React, featuring a customer management system.

## 🏗️ System Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                    Shell Application                       │
│                    (React + Module Federation)             │
│  ┌─────────────────┐  ┌─────────────────────────────────┐  │
│  │ React MF        │  │ Angular MF (Customer Mgmt)     │  │
│  │ (External)      │  │ (Local Development)             │  │
│  └─────────────────┘  └─────────────────────────────────┘  │
└─────────────────────────────────────────────────────────────┘
                              │
                    ┌─────────────────┐
                    │   Mock API      │
                    │  (json-server)  │
                    └─────────────────┘
```

## 🚀 Quick Start

### Prerequisites
- Node.js 20+ (LTS recommended)
- pnpm (recommended) or npm
- Make (for development commands)

### Installation & Setup

```bash
# Install all dependencies
make install

# Start all services
make dev
```

### Access Points
- **Shell Application**: http://localhost:3000
- **Angular Microfrontend**: http://localhost:3001
- **Mock API**: http://localhost:3000/api

## 📁 Project Structure

```
customers-mf-angular/
├── shell/                    # React shell application
│   ├── src/
│   │   ├── App.tsx          # Main shell component
│   │   └── components/
│   │       └── CustomersMF.tsx  # Angular MF integration
│   ├── module-federation.config.ts
│   └── package.json
├── customers-mf/             # Angular microfrontend
│   ├── src/app/
│   │   ├── components/      # Customer management components
│   │   ├── services/        # Customer service with Signals
│   │   └── models/         # Customer interfaces
│   ├── db.json             # Mock data
│   └── package.json
├── Makefile                 # Development commands
└── README.md               # This file
```

## 🛠️ Development Commands

### Setup & Installation
```bash
make install     # Install all dependencies
make clean       # Clean all build artifacts
```

### Development
```bash
make dev         # Start all services
make start-api   # Start mock API only
make start-angular # Start Angular MF only
make start-shell # Start shell only
```

### Build & Production
```bash
make build       # Build all applications
make build-angular # Build Angular MF only
make build-shell # Build shell only
```

### Utilities
```bash
make test        # Run all tests
make lint        # Lint all code
make format      # Format all code
make status      # Show system status
make stop-all    # Stop all services
```

## 🎯 Features

### Shell Application (React)
- **Module Federation Host**: Consumes multiple microfrontends
- **Multi-framework Support**: React + Angular integration
- **Responsive Design**: Mobile-first approach
- **Error Handling**: Graceful fallbacks for failed loads

### Customer Management (Angular)
- **Angular 20+**: Latest features with standalone components
- **Signals**: Reactive state management
- **Material Design**: Modern UI components
- **Reactive Forms**: Comprehensive validation
- **CRUD Operations**: Complete customer management
- **Responsive Tables**: Mobile-friendly data display

### Mock API (json-server)
- **RESTful Endpoints**: Full CRUD operations
- **Sample Data**: Pre-populated customer records
- **CORS Support**: Cross-origin requests
- **Hot Reload**: Automatic data persistence

## 🔧 Configuration

### Module Federation Setup

#### Shell Configuration
```typescript
// shell/module-federation.config.ts
export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    'provider': 'rslib_provider@https://unpkg.com/...',
    'customers-mf': 'customers_mf@http://localhost:3001/mf-manifest.json',
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

#### Angular Microfrontend Configuration
```typescript
// customers-mf/rsbuild.config.ts
export default defineConfig({
  plugins: [
    pluginModuleFederation({
      name: 'customers_mf',
      exposes: {
        './Component': './src/app/app.ts',
      },
      shared: {
        '@angular/core': { singleton: true },
        '@angular/common': { singleton: true },
        '@angular/router': { singleton: true },
        'rxjs': { singleton: true },
      },
    }),
  ],
});
```

## 🎨 UI/UX Features

### Modern Design
- **Material Design**: Consistent design system
- **Responsive Layout**: Adaptive to all screen sizes
- **Loading States**: User feedback during operations
- **Error Handling**: Graceful error states
- **Confirmation Dialogs**: Safe operations

### Angular Features
- **Signals**: Modern reactive state management
- **Control Flow**: @if, @for, @defer syntax
- **Standalone Components**: No NgModules required
- **Zoneless**: No zone.js required
- **Reactive Forms**: Real-time validation

## 📚 API Documentation

### Customer Endpoints
- `GET /customers` - List all customers
- `POST /customers` - Create new customer
- `PUT /customers/:id` - Update customer
- `DELETE /customers/:id` - Delete customer

### Request/Response Examples

#### Create Customer
```json
POST /customers
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890"
}
```

#### Response
```json
{
  "id": "1",
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "createdAt": "2024-01-15T10:30:00.000Z",
  "updatedAt": "2024-01-15T10:30:00.000Z"
}
```

## 🧪 Testing

### Running Tests
```bash
make test        # Run all tests
```

### Test Coverage
- **Unit Tests**: Service and component testing
- **Integration Tests**: End-to-end workflows
- **Error Scenarios**: Network failures and validation

## 🚀 Deployment

### Build for Production
```bash
make build       # Build all applications
```

### Deployment Options
- **Static Hosting**: Vercel, Netlify, GitHub Pages
- **Container Deployment**: Docker with nginx
- **CDN Distribution**: Global content delivery

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test with `make test`
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues:
- Create an issue in the repository
- Check the documentation in each microfrontend
- Review the Makefile commands

---

**Built with ❤️ using React, Angular 20+, and Module Federation**
