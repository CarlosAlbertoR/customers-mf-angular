# Customer Management Microfrontend

A modern Angular 20+ microfrontend for customer management using Module Federation with rsbuild, featuring reactive programming with RxJS and Angular Signals.

## 🚀 Features

- **Angular 20+** with standalone components and zoneless change detection
- **Module Federation** with rsbuild for microfrontend architecture
- **Angular Material** for modern UI components
- **RxJS** for reactive programming
- **Angular Signals** for reactive state management
- **Reactive Forms** with comprehensive validations
- **Responsive Design** with mobile-first approach
- **Clean Architecture** following SOLID principles
- **Mock API** with json-server

## 📋 Prerequisites

- Node.js 20+ (recommended: LTS version)
- pnpm (recommended) or npm

## 🛠️ Installation

1. **Install dependencies:**
   ```bash
   pnpm install
   ```

2. **Start the mock API server (in a separate terminal):**
   ```bash
   pnpm run api
   ```
   This will start json-server on `http://localhost:3000`

3. **Start the development server:**
   ```bash
   pnpm start
   ```
   This will start the microfrontend on `http://localhost:3001`

## 🏗️ Architecture

### Project Structure
```
src/
├── app/
│   ├── components/
│   │   ├── customer-list/          # Customer list with Material table
│   │   ├── customer-form/          # Create/edit form with validations
│   │   └── customer-delete-dialog/  # Delete confirmation dialog
│   ├── models/
│   │   └── customer.model.ts       # Customer interfaces
│   ├── services/
│   │   └── customer.service.ts     # Service with RxJS and Signals
│   ├── app.ts                     # Main app component
│   ├── app.routes.ts              # Route configuration
│   └── app.config.ts              # App configuration
├── main.ts                        # Application bootstrap
└── index.html                     # HTML template
```

### Key Components

#### Customer Model
```typescript
interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  createdAt: Date;
  updatedAt: Date;
}
```

#### Customer Service
- **Signals**: Reactive state management with `signal()` and `computed()`
- **RxJS**: Observable streams for async operations
- **HTTP Client**: RESTful API communication
- **Error Handling**: Comprehensive error management

#### Components
- **CustomerListComponent**: Displays customers in a Material table
- **CustomerFormComponent**: Reactive form for create/edit operations
- **CustomerDeleteDialogComponent**: Confirmation dialog for deletions

## 🎯 Features Implementation

### Angular Signals
```typescript
// Reactive state with signals
private customersSignal = signal<Customer[]>([]);
private loadingSignal = signal<boolean>(false);

// Computed signals
customers = computed(() => this.customersSignal());
loading = computed(() => this.loadingSignal());
```

### Reactive Forms with Validations
```typescript
this.customerForm = this.fb.group({
  name: ['', [Validators.required, Validators.minLength(2)]],
  email: ['', [Validators.required, Validators.email]],
  phone: ['', [Validators.required, Validators.pattern(/^[\+]?[1-9][\d]{0,15}$/)]]
});
```

### Modern Angular Features
- **@if, @for, @defer**: Control flow syntax
- **Standalone Components**: No NgModules required
- **Lazy Loading**: Route-based code splitting
- **Signals**: Reactive state management
- **Zoneless**: No zone.js required

## 🎨 UI/UX Features

### Material Design
- **Responsive Tables**: Mobile-friendly data display
- **Form Validation**: Real-time validation feedback
- **Loading States**: Spinner indicators during async operations
- **Error Handling**: User-friendly error messages
- **Confirmation Dialogs**: Safe deletion with confirmation

### Responsive Design
- **Mobile-First**: Optimized for all screen sizes
- **Flexible Layout**: Adaptive table and form layouts
- **Touch-Friendly**: Large touch targets for mobile devices

## 🔧 Configuration

### Module Federation
```typescript
// rsbuild.config.ts
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

### Build Configuration
- **Rsbuild**: Modern build tool with Angular support
- **TypeScript**: Strict type checking
- **Module Federation**: Microfrontend architecture

## 🚀 Deployment

### Build for Production
```bash
pnpm run build
```

### Serve Production Build
```bash
pnpm run serve
```

## 📚 API Documentation

### Endpoints
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

## 🔍 Development Guidelines

### Code Style
- **Clean Code**: Readable and maintainable code
- **SOLID Principles**: Single responsibility, open/closed, etc.
- **TypeScript**: Strict typing for better development experience

### Best Practices
- **Reactive Programming**: Use RxJS for async operations
- **Signals**: Modern state management approach
- **Component Composition**: Reusable and composable components
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels and keyboard navigation

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests for new functionality
5. Ensure all tests pass
6. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🆘 Support

For questions or issues, please create an issue in the repository or contact the development team.

---

**Built with ❤️ using Angular 20+ and Module Federation**