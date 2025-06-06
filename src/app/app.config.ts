import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideZoneChangeDetection,
} from '@angular/core';
import { FrameWholeModule, RouterConfig } from 'ngx-liburg-frame-side';
import { IconCoreModule } from 'ngx-liburg-icon';
import { provideAnimations } from '@angular/platform-browser/animations';
import {
  provideRouter,
  ViewTransitionInfo,
  withComponentInputBinding,
  withViewTransitions,
} from '@angular/router';
import { appRoutes } from './app.routes';
import { TransitionViewService } from '@tevet-troc-client/transition';

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
  ],
  iconApp: 'fa_solid:logo',
  appConfig: appRoutes,
}) as RouterConfig;
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(
      appRoutes,
      withViewTransitions({ onViewTransitionCreated }),
      withComponentInputBinding()
    ),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
    TransitionViewService,
  ],
};

function onViewTransitionCreated(info: ViewTransitionInfo): void {
  const viewTransitionService = inject(TransitionViewService);
  viewTransitionService.currentTransition.set(info);

  info.transition.finished.finally(() => {
    viewTransitionService.currentTransition.set(null);
  });
}
