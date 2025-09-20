import { InjectionToken } from '@angular/core';


export const API_CONFIG_PERSON = new InjectionToken('API_CONFIG_PERSON', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/person',
    };
  },
});

export const API_CONFIG_DEPARTMENT = new InjectionToken('API_CONFIG_DEPARTMENT', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/department',
    };
  },
});

export const API_CONFIG_STAFF = new InjectionToken('API_CONFIG_STAFF', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/staff',
    };
  },
});

export const API_CONFIG_APPOINTMENT = new InjectionToken('API_CONFIG_APPOINTMENT', {
  factory: () => {
    const apiUrl = process.env['TEVET_API'] || '';
    return {
      baseUrl: apiUrl + '/v1/appointment',
    };
  },
});
