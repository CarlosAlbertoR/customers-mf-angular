# Angular Microfrontend Architecture - Makefile
# =============================================

.PHONY: help install build start test clean dev deploy

# Default target
help:
	@echo "🚀 Angular Microfrontend Architecture"
	@echo "===================================="
	@echo ""
	@echo "📦 Available commands:"
	@echo "  make install     - Install all dependencies"
	@echo "  make build       - Build all applications"
	@echo "  make start       - Start all services (shell + mf + api)"
	@echo "  make dev         - Start development mode"
	@echo "  make test        - Run all tests"
	@echo "  make test:mf     - Run microfrontend tests"
	@echo "  make test:shell  - Run shell tests"
	@echo "  make clean       - Clean build artifacts"
	@echo "  make deploy      - Deploy to Vercel"
	@echo ""

# Install dependencies
install:
	@echo "📦 Installing dependencies..."
	pnpm install

# Build all applications
build:
	@echo "🔨 Building all applications..."
	pnpm run build

# Start all services
start:
	@echo "🚀 Starting all services..."
	@chmod +x start-all-services.sh
	./start-all-services.sh

# Development mode
dev:
	@echo "🛠️  Starting development mode..."
	pnpm run dev

# Run all tests
test:
	@echo "🧪 Running all tests..."
	pnpm run test

# Run microfrontend tests
test:mf:
	@echo "🧪 Running microfrontend tests..."
	pnpm --filter customers-mf run test

# Run shell tests
test:shell:
	@echo "🧪 Running shell tests..."
	pnpm --filter shell run test

# Clean build artifacts
clean:
	@echo "🧹 Cleaning build artifacts..."
	rm -rf shell/dist
	rm -rf customers-mf/dist
	rm -rf coverage
	rm -rf node_modules/.cache

# Deploy to Vercel
deploy:
	@echo "🚀 Deploying to Vercel..."
	vercel --prod

# CI/CD commands
ci:install:
	@echo "📦 CI: Installing dependencies..."
	pnpm install

ci:test:
	@echo "🧪 CI: Running tests..."
	pnpm --filter customers-mf run test:ci

ci:build:
	@echo "🔨 CI: Building applications..."
	pnpm run build

# Development shortcuts
shell:
	@echo "🌐 Starting shell only..."
	pnpm --filter shell run start

mf:
	@echo "👥 Starting microfrontend only..."
	pnpm --filter customers-mf run start

api:
	@echo "🔧 Starting API only..."
	pnpm --filter customers-mf run api
