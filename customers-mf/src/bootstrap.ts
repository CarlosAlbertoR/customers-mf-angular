import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { App } from './app/app';

// Force AOT compilation
bootstrapApplication(App, {
  ...appConfig,
  providers: [
    ...appConfig.providers || [],
  ]
})
  .catch((err) => console.error(err));
