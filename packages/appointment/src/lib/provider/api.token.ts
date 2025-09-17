import { InjectionToken } from '@angular/core';


export const API_CONFIG_PERSON = new InjectionToken('API_CONFIG_PERSON', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/person',
    };
  },
});
