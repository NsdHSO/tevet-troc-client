import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { AppointmentService } from './appointment.service';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { MeService } from '@tevet-troc-client/http-interceptor';

describe('AppointmentService', () => {
  let service: AppointmentService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        AppointmentService,
        {
          provide: PermissionDirective,
          useValue: { hasPermission: () => true },
        },
        {
          provide: MeService,
          useValue: {
            meInfo: {
              attributes: {
                hospital_id: 'test-hospital-id',
                name: 'Test User',
              },
            },
          },
        },
      ],
    });
    service = TestBed.inject(AppointmentService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
