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
      path: 'table',
      icon: 'fa_solid:gauge',
      text: 'Dashboard',
    },
    {
      path: 'calendar',
      icon: 'fa_solid:gauge',
      text: 'test',
    },
  ],
  iconApp: '',
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
