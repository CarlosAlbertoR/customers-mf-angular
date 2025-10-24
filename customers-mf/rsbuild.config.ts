import { defineConfig } from '@rsbuild/core';
import { pluginModuleFederation } from '@module-federation/rsbuild-plugin';

export default defineConfig({
  source: {
    entry: {
      index: './src/main.ts',
    },
  },
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
        '@angular/compiler': { singleton: true },
        '@angular/platform-browser': { singleton: true },
        '@angular/platform-browser-dynamic': { singleton: true },
        'rxjs': { singleton: true },
      },
    }),
  ],
  server: {
    port: 3001,
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
        },
      },
    },
    htmlPlugin: false,
  },
});
