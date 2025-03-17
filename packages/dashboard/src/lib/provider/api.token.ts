import { InjectionToken } from '@angular/core';

export const API_CONFIG_DASHBOARD = new InjectionToken('API_CONFIG_DASHBOARD', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'] + '/v1/card',
  }),
});

export const API_CONFIG_CARD = new InjectionToken('API_CONFIG_CARD', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/card',
    };
  },
});
