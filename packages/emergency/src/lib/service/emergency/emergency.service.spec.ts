import { TestBed } from '@angular/core/testing';

import { EmergencyService } from './emergency.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { PermissionDirective } from '@tevet-troc-client/permission';

describe('EmergencyService', () => {
  let service: EmergencyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        EmergencyService,
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: PermissionDirective, useValue: { hasPermission: () => true } },
      ],
    });
    service = TestBed.inject(EmergencyService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
