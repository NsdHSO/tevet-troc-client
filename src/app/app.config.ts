import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';
import { FrameWholeModule, RouterConfig } from 'ngx-liburg-frame-side';
import { IconCoreModule } from 'ngx-liburg-icon';
import { provideAnimations } from '@angular/platform-browser/animations';

export const CONFIG_MAIN = Object.freeze({
  routerDataConfig: [
    {
      path: 'dashboard',
      icon: 'fa_solid:laptop-medical',
      text: 'Dashboard',
    },
    {
      path: 'emergency',
      icon: 'fa_solid:2',
      text: 'Emergency',
    },
  ],
  iconApp: 'fa_solid:logo',
}) as RouterConfig;
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
  ],
};
