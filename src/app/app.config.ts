import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideAppInitializer,
  provideZonelessChangeDetection
} from '@angular/core';
import { FrameWholeModule, RouterConfig } from 'ngx-liburg-frame-side';
import { IconCoreModule } from 'ngx-liburg-icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import { provideRouter, ViewTransitionInfo, withComponentInputBinding, withViewTransitions } from '@angular/router';
import { appRoutes } from './app.routes';
import { TransitionViewService } from '@tevet-troc-client/transition';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { providePrimeNG } from 'primeng/config';
import Aura from '@primeng/themes/aura';
import {
  initAppPromise,
  interceptorAuthProviders,
  interceptorErrorProviders
} from '@tevet-troc-client/http-interceptor';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const CONFIG_MAIN = Object.freeze({
  routerDataConfig: [
    {
      path: 'dashboard',
      icon: 'fa_solid:laptop-medical',
      text: 'Dashboard',
    },
    {
      path: 'emergency',
      icon: 'fa_solid:truck-medical',
      text: 'Emergency',
    },
    {
      path: 'appointments',
      icon: 'fa_solid:calendar-check',
      text: 'Appointments',
    },
  ],
  iconApp: 'fa_solid:logo',
  appConfig: appRoutes,
}) as RouterConfig;
export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(),
    provideAppInitializer(() => initAppPromise()),
    provideAnimations(),
    provideZonelessChangeDetection(),
    provideRouter(
      appRoutes,
      withViewTransitions({ onViewTransitionCreated }),
      withComponentInputBinding()
    ),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
    TransitionViewService,
    provideHttpClient(),
    provideHttpClient(withInterceptorsFromDi()),
    interceptorAuthProviders,
    interceptorErrorProviders,
    provideAnimationsAsync(),
    providePrimeNG({
      theme: {
        preset: Aura,
      },
    }),
  ],
};

function onViewTransitionCreated(info: ViewTransitionInfo): void {
  const viewTransitionService = inject(TransitionViewService);
  viewTransitionService.currentTransition.set(info);

  info.transition.finished.finally(() => {
    viewTransitionService.currentTransition.set(null);
  });
}
