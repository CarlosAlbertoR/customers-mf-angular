#!/bin/bash

echo "🚀 Building Angular Microfrontend Architecture..."

# Build Shell App
echo "📦 Building Shell App..."
cd shell
npm install
npm run build
cd ..

# Build Customers Microfrontend
echo "📦 Building Customers Microfrontend..."
cd customers-mf
npm install
npm run build
cd ..

echo "✅ Build completed successfully!"
echo "📁 Shell app built in: shell/dist"
echo "📁 Customers MF built in: customers-mf/dist"
