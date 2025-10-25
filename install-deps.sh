#!/bin/bash

echo "📦 Installing dependencies for Angular Microfrontend Architecture..."

# Install root dependencies
echo "Installing root dependencies..."
npm install

# Install shell dependencies
echo "Installing shell dependencies..."
cd shell
npm install
cd ..

# Install customers-mf dependencies
echo "Installing customers-mf dependencies..."
cd customers-mf
npm install
cd ..

echo "✅ All dependencies installed successfully!"
