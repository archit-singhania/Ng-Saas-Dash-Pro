import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withFetch } from '@angular/common/http';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { provideClientHydration, withEventReplay } from '@angular/platform-browser';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeuix/themes/aura';
import { definePreset } from '@primeuix/themes';

import { routes } from './app.routes';

const OpsPreset = definePreset(Aura, {
  semantic: {
    primary: {
      50:  '{violet.50}',
      100: '{violet.100}',
      200: '{violet.200}',
      300: '{violet.300}',
      400: '{violet.400}',
      500: '{violet.500}',
      600: '{violet.600}',
      700: '{violet.700}',
      800: '{violet.800}',
      900: '{violet.900}',
      950: '{violet.950}'
    },
    colorScheme: {
      light: {
        surface: {
          0:   '#ffffff',
          50:  '{slate.50}',
          100: '{slate.100}',
          200: '{slate.200}',
          300: '{slate.300}',
          400: '{slate.400}',
          500: '{slate.500}',
          600: '{slate.600}',
          700: '{slate.700}',
          800: '{slate.800}',
          900: '{slate.900}',
          950: '{slate.950}'
        }
      },
      dark: {
        surface: {
          0:   '#ffffff',
          50:  '{zinc.50}',
          100: '{zinc.100}',
          200: '{zinc.800}',
          300: '{zinc.700}',
          400: '{zinc.600}',
          500: '{zinc.500}',
          600: '{zinc.400}',
          700: '{zinc.300}',
          800: '{zinc.200}',
          900: '{zinc.100}',
          950: '{zinc.50}'
        }
      }
    }
  }
});

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideClientHydration(withEventReplay()),
    provideHttpClient(withFetch()),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: OpsPreset,
        options: {
          darkModeSelector: '[data-theme="dark"]'
        }
      },
      ripple: true
    })
  ]
};
