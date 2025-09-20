import { InjectionToken } from '@angular/core';

export const TEVET_API_AUTH = new InjectionToken('API_AUTH_CONFIG', {
  factory: () => ({
    baseUrl: process.env['TEVET_API_AUTH'],
  }),
});

export const TEVET_API = new InjectionToken('API_AUTH_CONFIG', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'],
  }),
});

/* Auth Client Api
 */
export const TEVET_API_AUTH_CLIENT = new InjectionToken('TEVET_API_AUTH_CLIENT', {
  factory: () => ({
    baseUrl: process.env['TEVET_API_AUTH_CLIENT'],
  }),
});
