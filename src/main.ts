import { bootstrapApplication } from '@angular/platform-browser';
import { isDevMode } from '@angular/core';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

/**
 * REF: Code from https://github.com/mswjs/examples/tree/main/examples/with-angular
 */
async function prepareApp() {
  if (isDevMode()) {
    const { worker } = await import('./mocks/mocks');
    return worker.start();
  }

  return Promise.resolve()
}

prepareApp().then(() => {
  bootstrapApplication(AppComponent, appConfig)
  .catch((err) => console.error(err));
});
