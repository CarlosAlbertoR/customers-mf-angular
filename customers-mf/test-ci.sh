#!/bin/bash

echo "🧪 Running CI Tests (Headless)"
echo "==============================="

# Set environment variables for CI
export CI=true
export NODE_ENV=test

# Run tests with timeout
echo "⏳ Starting tests..."
timeout 300 pnpm run test:ci

# Check exit code
if [ $? -eq 0 ]; then
    echo "✅ Tests completed successfully"
    exit 0
elif [ $? -eq 124 ]; then
    echo "⏰ Tests timed out after 5 minutes"
    exit 1
else
    echo "❌ Tests failed"
    exit 1
fi
