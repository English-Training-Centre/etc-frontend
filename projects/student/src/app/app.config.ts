import { ApplicationConfig, inject, provideAppInitializer, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';

// configuration for primeNG
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura'; //aura, lara, nora, material

import { ThemeRepository } from '../../../core/src/lib/repositories/theme-repository';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          prefix: 'p',
          darkModeSelector: 'system',
          cssLayer: false
        }
      },
      ripple: true,
      zIndex: {
        modal: 1100,    // dialog, sidebar
        overlay: 1000,  // dropdown, overlaypanel
        menu: 1000,     // overlay menus
        tooltip: 1100   // tooltip
      }
    }),
    provideAppInitializer(() => {
      inject(ThemeRepository);
    })
  ]
};
