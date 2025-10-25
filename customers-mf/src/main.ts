import 'zone.js';
import { enableProdMode } from '@angular/core';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

try {
  await import('./bootstrap');
} catch (err) {
  console.error(err);
}
