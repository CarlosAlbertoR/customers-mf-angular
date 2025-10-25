#!/bin/bash

echo "🚀 Deploying Angular Microfrontend to Vercel..."

# Build both applications
echo "📦 Building applications..."
npm run build

# Deploy to Vercel
echo "🌐 Deploying to Vercel..."
npx vercel --prod

echo "✅ Deployment completed!"
echo "🌐 Your app is now live on Vercel!"
