import { ApplicationConfig } from '@angular/core';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    // We strictly need these two for the API and the UI components
    provideAnimations(),
    provideHttpClient()
  ]
};