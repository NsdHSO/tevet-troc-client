import { TestBed } from '@angular/core/testing';

import { AppointmentService } from './appointment.service';
import { PermissionDirective } from '@tevet-troc-client/permission';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AppointmentService,
        { provide: PermissionDirective, useValue: { hasPermission: () => true } },
      ],
    });
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
