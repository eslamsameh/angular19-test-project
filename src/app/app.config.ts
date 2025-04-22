import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import { provideStore } from '@ngrx/store';
import { provideEffects } from '@ngrx/effects';
import { loginReducer, LoginEffects } from '@/store';
import { routes } from '@/app.routes';
import { MessageService } from 'primeng/api';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { authInterceptor, baseUrlInterceptor } from '@/core/interceptors';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
        options: {
          darkModeSelector: '.my-app-dark',
        },
      },
      ripple: true,
    }),

    // NgRx Store
    provideStore({ login: loginReducer }),

    // NgRx Effects
    provideEffects(LoginEffects),
    MessageService,
    provideHttpClient(withInterceptors([baseUrlInterceptor, authInterceptor])),
  ],
};
