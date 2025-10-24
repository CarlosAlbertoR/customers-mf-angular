# Microfrontend System Makefile
# This Makefile manages the entire microfrontend system

.PHONY: help install dev build clean start-api start-angular start-shell start-all stop-all

# Default target
help:
	@echo "🚀 Microfrontend System Commands"
	@echo ""
	@echo "📦 Setup:"
	@echo "  make install     - Install all dependencies"
	@echo "  make clean       - Clean all node_modules and build artifacts"
	@echo ""
	@echo "🔧 Development:"
	@echo "  make dev         - Start all services in development mode"
	@echo "  make start-api   - Start mock API server (port 3000)"
	@echo "  make start-angular - Start Angular microfrontend (port 3001)"
	@echo "  make start-shell - Start shell application (port 3000)"
	@echo "  make clean-shell - Clean shell cache only"
	@echo "  make restart-shell - Restart shell with cache cleanup"
	@echo ""
	@echo "🏗️ Build:"
	@echo "  make build       - Build all applications"
	@echo "  make build-angular - Build Angular microfrontend"
	@echo "  make build-shell - Build shell application"
	@echo ""
	@echo "🛑 Control:"
	@echo "  make stop-all    - Stop all running services"
	@echo ""
	@echo "📱 Access Points:"
	@echo "  Shell:     http://localhost:3000"
	@echo "  Angular:   http://localhost:3001"
	@echo "  API:       http://localhost:3000/api"

# Install all dependencies
install:
	@echo "📦 Installing shell dependencies..."
	cd shell && pnpm install
	@echo "📦 Installing customers-mf dependencies..."
	cd customers-mf && pnpm install
	@echo "✅ All dependencies installed"

# Install shell dependencies only
install-shell:
	@echo "📦 Installing shell dependencies..."
	cd shell && pnpm install
	@echo "✅ Shell dependencies installed"

# Install customers-mf dependencies only
install-angular:
	@echo "📦 Installing customers-mf dependencies..."
	cd customers-mf && pnpm install
	@echo "✅ Angular dependencies installed"

# Clean all build artifacts
clean:
	@echo "🧹 Cleaning shell..."
	cd shell && rm -rf node_modules dist .next
	@echo "🧹 Cleaning customers-mf..."
	cd customers-mf && rm -rf node_modules dist
	@echo "✅ Clean complete"

# Start mock API server
start-api:
	@echo "🌐 Starting mock API server on port 3000..."
	cd customers-mf && pnpm run api

# Start Angular microfrontend
start-angular:
	@echo "🅰️ Starting Angular microfrontend on port 3001..."
	cd customers-mf && pnpm start

# Start shell application
start-shell:
	@echo "🐚 Starting shell application on port 3000..."
	cd shell && pnpm start

# Start shell with fresh install
start-shell-fresh:
	@echo "🐚 Installing shell dependencies and starting..."
	cd shell && pnpm install && pnpm start


# Start all services in development mode
dev: install
	@echo "🚀 Starting all services..."
	@echo "📱 Access points:"
	@echo "  Shell:     http://localhost:3000"
	@echo "  Angular:   http://localhost:3001"
	@echo "  API:       http://localhost:3000/api"
	@echo ""
	@echo "🛑 Press Ctrl+C to stop all services"
	@echo ""
	@trap 'kill 0' EXIT; \
	cd customers-mf && pnpm run api & \
	sleep 3 && \
	cd customers-mf && pnpm start & \
	sleep 5 && \
	cd shell && pnpm start & \
	wait

# Build all applications
build: build-angular build-shell
	@echo "✅ All applications built"

# Build Angular microfrontend
build-angular:
	@echo "🏗️ Building Angular microfrontend..."
	cd customers-mf && pnpm run build
	@echo "✅ Angular microfrontend built"

# Build shell application
build-shell:
	@echo "🏗️ Building shell application..."
	cd shell && pnpm run build
	@echo "✅ Shell application built"

# Stop all running services
stop-all:
	@echo "🛑 Stopping all services..."
	@pkill -f "pnpm run api" || true
	@pkill -f "pnpm start" || true
	@pkill -f "rsbuild dev" || true
	@pkill -f "json-server" || true
	@echo "✅ All services stopped"

# Clean shell cache only
clean-shell:
	@echo "🧹 Cleaning shell cache..."
	@cd shell && rm -rf node_modules/.cache dist .rsbuild-cache 2>/dev/null || true
	@echo "✅ Shell cache cleaned"

# Restart shell only
restart-shell:
	@echo "🔄 Restarting shell only..."
	@pkill -f "rsbuild dev" || true
	@make clean-shell
	@echo "🐚 Starting shell..."
	@cd shell && pnpm start &
	@echo "✅ Shell restarted!"

# Development with hot reload
dev-hot:
	@echo "🔥 Starting development with hot reload..."
	@echo "📱 Access points:"
	@echo "  Shell:     http://localhost:3000"
	@echo "  Angular:   http://localhost:3001"
	@echo "  API:       http://localhost:3000/api"
	@echo ""
	@trap 'make stop-all' EXIT; \
	cd customers-mf && pnpm run api & \
	sleep 3 && \
	cd customers-mf && pnpm start & \
	sleep 5 && \
	cd shell && pnpm start & \
	wait

# Test all applications
test:
	@echo "🧪 Running tests..."
	@echo "Testing Angular microfrontend..."
	cd customers-mf && pnpm test --watch=false
	@echo "Testing shell application..."
	cd shell && pnpm test --watch=false
	@echo "✅ All tests completed"

# Lint all applications
lint:
	@echo "🔍 Linting all applications..."
	@echo "Linting Angular microfrontend..."
	cd customers-mf && pnpm run lint
	@echo "Linting shell application..."
	cd shell && pnpm run lint
	@echo "✅ All linting completed"

# Format all code
format:
	@echo "✨ Formatting all code..."
	@echo "Formatting Angular microfrontend..."
	cd customers-mf && pnpm run format
	@echo "Formatting shell application..."
	cd shell && pnpm run format
	@echo "✅ All code formatted"

# Show system status
status:
	@echo "📊 System Status:"
	@echo ""
	@echo "🔍 Port Status:"
	@lsof -i :3000 && echo "Port 3000: In use" || echo "Port 3000: Available"
	@lsof -i :3001 && echo "Port 3001: In use" || echo "Port 3001: Available"
	@echo ""
	@echo "📁 Project Structure:"
	@ls -la
	@echo ""
	@echo "📦 Dependencies:"
	@echo "Shell dependencies:"
	@cd shell && pnpm list --depth=0 2>/dev/null || echo "Not installed"
	@echo "Angular dependencies:"
	@cd customers-mf && pnpm list --depth=0 2>/dev/null || echo "Not installed"

# Quick start (minimal setup)
quick-start:
	@echo "⚡ Quick start - minimal setup..."
	@echo "Installing dependencies..."
	cd shell && pnpm install --silent
	cd customers-mf && pnpm install --silent
	@echo "Starting services..."
	@trap 'kill 0' EXIT; \
	cd customers-mf && pnpm run api & \
	sleep 2 && \
	cd customers-mf && pnpm start & \
	sleep 3 && \
	cd shell && pnpm start & \
	wait
