import { Route } from '@angular/router';

export const appRoutes: Route[] = [
  {
    path: '',
    loadComponent: () => import('@tevet-troc-client/landing').then((c) => c.C),
    data: {
      view: 'landing',
    },
  },

  {
    path: 'dashboard',
    data: {
      view: 'dashboard',
    },
    loadComponent: () =>
      import('@tevet-troc-client/dashboard').then((c) => c.C),
  },
  {
    path: 'emergency',
    data: {
      view: 'emergency',
    },
    loadComponent: () =>
      import('@tevet-troc-client/emergency').then((c) => c.C),
  },
  {
    path: '**',
    data:{
      view:'not-found'
    },
    loadComponent: () =>
      import('@tevet-troc-client/not-found').then((c) => c.C),
  },
];
