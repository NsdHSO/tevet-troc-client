import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { appRoutes } from './app.routes';



export const CONFIG_MAIN = Object.freeze({
  routerDataConfig: [
    {
      path: '',
      icon: 'fa_solid:gauge',
      text: 'Dashboard'
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
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(appRoutes),
    importProvidersFrom(FrameWholeModule.forRoot(CONFIG_MAIN)),
    importProvidersFrom(IconCoreModule),
  ],
};
