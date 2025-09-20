import { InjectionToken } from '@angular/core';

export const API_CONFIG_AMBULANCE = new InjectionToken('API_CONFIG_AMBULANCE', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'] + '/v1/ambulance',
  }),
});

export const API_CONFIG_EMERGENCY = new InjectionToken('API_CONFIG_EMERGENCY', {
  factory: () => ({
    baseUrl: process.env['TEVET_API'] + '/v1/emergency',
  }),
});
