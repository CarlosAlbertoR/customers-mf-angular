import { defineConfig } from '@rsbuild/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  source: {
    entry: {
      index: './src/main.ts',
    },
    define: {
      'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
    },
  },
  dev: {
    lazyCompilation: false, // Disable lazy compilation to avoid module resolution issues
    hmr: false, // Disable HMR to avoid JIT issues
  },
  build: {
    target: 'es2015', // Ensure modern target for AOT
    ssr: false, // Disable SSR for Module Federation
  },
  plugins: [
    pluginModuleFederation({
      name: 'customersMF',
      filename: 'customers/customersMF.js',
      dts: false, // Disable automatic type generation to avoid build issues
      exposes: {
        './Component': './src/mf-entry.ts',
        './bootstrap': './src/mf-bootstrap.ts',
      },
      shared: {
        '@angular/core': {
          singleton: true,
          requiredVersion: false,
        },
        '@angular/common': {
          singleton: true,
          requiredVersion: false,
        },
        '@angular/router': {
          singleton: true,
          requiredVersion: false,
        },
        '@angular/platform-browser': {
          singleton: true,
          requiredVersion: false,
        },
        '@angular/platform-browser-dynamic': {
          singleton: true,
          requiredVersion: false,
        },
        '@angular/compiler': {
          singleton: true,
          requiredVersion: false,
        },
        rxjs: {
          singleton: true,
          requiredVersion: false,
        },
        '@ngrx/signals': {
          singleton: true,
          requiredVersion: false,
        },
      },
    }),
  ],
  server: {
    port: 3001,
    cors: {
      origin: [
        'http://localhost:3000',
        'https://customers-mf-angular.vercel.app',
      ],
      credentials: true,
    },
  },
  tools: {
    rspack: {
      resolve: {
        extensions: ['.ts', '.js', '.json'],
      },
    },
    swc: {
      jsc: {
        parser: {
          syntax: 'typescript',
          tsx: false,
          decorators: true,
          dynamicImport: true,
        },
        transform: {
          legacyDecorator: true,
          decoratorMetadata: true,
          useDefineForClassFields: false,
        },
        experimental: {
          plugins: [],
        },
      },
    },
    htmlPlugin: false,
  },
});
