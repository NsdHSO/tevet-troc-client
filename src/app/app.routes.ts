import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@tevet-troc-client/landing').then((c) => c.C),
  },

  {
    path: 'dashboard',
    loadComponent: () =>
      import('@tevet-troc-client/dashboard').then((c) => c.C),
  },
  {
    path: 'emergency',
    loadComponent: () =>
      import('@tevet-troc-client/emergency').then((c) => c.C),
  },
  {
    path: '**',
    loadComponent: () =>
      import('@tevet-troc-client/not-found').then((c) => c.C),
  },
];
