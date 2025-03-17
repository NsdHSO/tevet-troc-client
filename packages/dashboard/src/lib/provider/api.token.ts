import { InjectionToken } from '@angular/core';

export const API_CONFIG_DASHBOARD = new InjectionToken('API_CONFIG_DASHBOARD', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'] + '/v1/dashboard',
  }),
});

export const API_CONFIG_CARD = new InjectionToken('API_CONFIG_CARD', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'] + '/v1/card',
  }),
});
