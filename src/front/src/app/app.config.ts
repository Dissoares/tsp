import {
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom,
  ApplicationConfig,
} from '@angular/core';
import {
  withEnabledBlockingInitialNavigation,
  withRouterConfig,
  provideRouter,
} from '@angular/router';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { authInterceptorFn } from './core/auth/auth-interceptor';
import { MatPaginatorIntl } from '@angular/material/paginator';
import { MatNativeDateModule } from '@angular/material/core';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { PaginacaoCustomizada } from './core/shared';
import { provideToastr } from 'ngx-toastr';
import { routes } from './app.routes';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      routes,
      withEnabledBlockingInitialNavigation(),
      withRouterConfig({ onSameUrlNavigation: 'reload' }),
    ),
    provideHttpClient(withInterceptors([authInterceptorFn])),
    provideAnimations(),
    provideToastr({
      positionClass: 'toast-top-right',
      preventDuplicates: true,
      timeOut: 2000,
      closeButton: true,
      progressBar: true,
    }),
    { provide: MAT_DATE_LOCALE, useValue: 'pt-BR' },
    importProvidersFrom(MatDatepickerModule, MatNativeDateModule),
    { provide: MatPaginatorIntl, useClass: PaginacaoCustomizada },
  ],
};
