# 🚀 Microfrontend System Setup Guide

This guide will help you set up and run the complete microfrontend system.

## 📋 Prerequisites

- Node.js 20+ (LTS recommended)
- pnpm (recommended) or npm
- Make (for development commands)

## 🛠️ Quick Setup

### 1. Install Dependencies
```bash
make install
```

### 2. Start the System
```bash
# Option A: Start everything at once
make dev

# Option B: Start services individually
make start-api      # Terminal 1: Mock API
make start-angular  # Terminal 2: Angular MF
make start-shell    # Terminal 3: Shell
```

## 🎯 Step-by-Step Setup

### Step 1: Shell Application (React)
The shell is the main application that hosts other microfrontends.

```bash
# Start shell (works independently)
make start-shell
# Access: http://localhost:3000
```

**Features:**
- ✅ React microfrontend (external)
- ⏳ Angular microfrontend (disabled by default)

### Step 2: Angular Microfrontend
The customer management system built with Angular 20+.

```bash
# Start Angular MF
make start-angular
# Access: http://localhost:3001
```

**Features:**
- ✅ Customer CRUD operations
- ✅ Angular Signals & RxJS
- ✅ Material Design
- ✅ Reactive forms

### Step 3: Mock API
The backend API for the Angular microfrontend.

```bash
# Start mock API
make start-api
# Access: http://localhost:3000/api
```

**Features:**
- ✅ RESTful endpoints
- ✅ Sample customer data
- ✅ CORS support

### Step 4: Enable Angular Integration
Once the Angular MF is running, enable it in the shell:

```bash
# Enable Angular microfrontend in shell
make enable-angular

# Restart shell to load Angular MF
make start-shell
```

## 🔧 Configuration Management

### Enable/Disable Angular Microfrontend

```bash
# Enable Angular MF in shell
make enable-angular

# Disable Angular MF in shell  
make disable-angular
```

### Manual Configuration

If you prefer manual configuration:

1. **Enable Angular in module-federation.config.ts:**
   ```typescript
   remotes: {
     'customers-mf': 'customers_mf@http://localhost:3001/remoteEntry.js',
   }
   ```

2. **Enable Angular in App.tsx:**
   ```typescript
   import CustomersMF from './components/CustomersMF';
   // Use <CustomersMF /> in JSX
   ```

## 🚨 Troubleshooting

### Common Issues

#### 1. Shell won't start
```bash
# Clean and reinstall
make clean
make install
make start-shell
```

#### 2. Angular MF not loading in shell
- Ensure Angular MF is running: `make start-angular`
- Check port 3001 is available
- Enable Angular in shell: `make enable-angular`
- Restart shell

#### 3. Module Federation errors
- Check that all services are running
- Verify port configurations
- Clear browser cache

#### 4. API connection issues
- Ensure mock API is running: `make start-api`
- Check API URL in Angular service
- Verify CORS settings

### Port Conflicts

If you get port conflicts:

```bash
# Check what's using the ports
lsof -i :3000
lsof -i :3001

# Kill processes if needed
make stop-all
```

## 📱 Access Points

| Service | URL | Description |
|---------|-----|-------------|
| Shell | http://localhost:3000 | Main application |
| Angular MF | http://localhost:3001 | Customer management |
| Mock API | http://localhost:3000/api | Backend API |

## 🎯 Development Workflow

### 1. Development Mode
```bash
# Start all services
make dev
```

### 2. Individual Development
```bash
# Work on shell only
make start-shell

# Work on Angular MF only  
make start-angular

# Work on API only
make start-api
```

### 3. Testing
```bash
# Run all tests
make test

# Lint code
make lint

# Format code
make format
```

## 🏗️ Build & Production

### Build All Applications
```bash
make build
```

### Build Individual Applications
```bash
make build-shell    # Build shell
make build-angular  # Build Angular MF
```

## 🔍 System Status

Check system status:
```bash
make status
```

This will show:
- Port availability
- Project structure
- Dependencies status

## 🆘 Getting Help

### Commands Reference
```bash
make help  # Show all available commands
```

### Logs and Debugging
- Check terminal output for errors
- Use browser dev tools for frontend issues
- Check network tab for API calls

### Reset Everything
```bash
make clean
make install
make dev
```

---

**Happy coding! 🚀**
