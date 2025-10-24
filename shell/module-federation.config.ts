import { createModuleFederationConfig } from '@module-federation/rsbuild-plugin';

export default createModuleFederationConfig({
  name: 'shell',
  remotes: {
    'customers-mf': 'customers_mf@http://localhost:3001/mf-manifest.json',
  },
  shareStrategy: 'loaded-first',
  shared: {
    '@angular/core': { singleton: true },
    '@angular/common': { singleton: true },
    '@angular/router': { singleton: true },
    '@angular/compiler': { singleton: true },
    '@angular/platform-browser': { singleton: true },
    '@angular/platform-browser-dynamic': { singleton: true },
    'rxjs': { singleton: true },
  },
});
