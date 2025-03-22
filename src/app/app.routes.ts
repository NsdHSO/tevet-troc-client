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
      layouts: [
        {
          title: 'Ambulance',
          icon: 'fa_solid:truck-medical',
          class: 'emergency-ambulance',
          ariaLabel: 'Ambulance Vehicle',
          ariaDescription: 'Icon representing an emergency ambulance vehicle.',
        },
        {
          title: 'Ambulatory',
          class: 'emergency-ambulatory',
          icon: 'fa_solid:wheelchair-move',
          ariaLabel: 'Ambulatory Transport',
          ariaDescription:
            'Icon representing non-emergency ambulatory patient transport.',
        },
      ],
    },
    loadComponent: () =>
      import('@tevet-troc-client/emergency').then((c) => c.C),
  },
  {
    path: '**',
    data: {
      view: 'not-found',
    },
    loadComponent: () =>
      import('@tevet-troc-client/not-found').then((c) => c.C),
  },
];
