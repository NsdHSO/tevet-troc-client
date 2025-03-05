import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () =>
      import('./../../packages/landing/src').then((c) => c.C),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('./../../packages/dashboard/src').then((c) => c.C),
  },
  {
    path: 'emergency',
    loadComponent: () =>
      import('./../../packages/emergency/src').then((c) => c.C),
  },
];
