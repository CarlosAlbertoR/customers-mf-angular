#!/bin/bash

echo "🚀 Starting Angular Microfrontend Architecture"
echo "=============================================="

# Check if pnpm is installed
if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Please install pnpm first."
    exit 1
fi

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install

# Start API server in background
echo "🔧 Starting API server..."
cd customers-mf
pnpm run api &
API_PID=$!
cd ..

# Wait for API to start
echo "⏳ Waiting for API to start..."
sleep 5

# Start shell application
echo "🌐 Starting Shell application..."
cd shell
pnpm run start &
SHELL_PID=$!
cd ..

# Start customers microfrontend
echo "👥 Starting Customers Microfrontend..."
cd customers-mf
pnpm run start &
MF_PID=$!
cd ..

echo "✅ All services started!"
echo "=========================="
echo "🌐 Shell App: http://localhost:4200"
echo "👥 Customers MF: http://localhost:4201"
echo "🔧 API Server: http://localhost:3002"
echo "=========================="
echo "Press Ctrl+C to stop all services"

# Function to cleanup on exit
cleanup() {
    echo "🛑 Stopping all services..."
    kill $API_PID $SHELL_PID $MF_PID 2>/dev/null
    exit 0
}

# Set trap to cleanup on exit
trap cleanup SIGINT SIGTERM

# Wait for any process to exit
wait

