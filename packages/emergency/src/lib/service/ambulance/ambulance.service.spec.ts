import { TestBed } from '@angular/core/testing';

import { AmbulanceService } from './ambulance.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AmbulanceService', () => {
  let service: AmbulanceService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        AmbulanceService,
        provideHttpClientTesting(),
        provideHttpClient(),
      ],
    });
    service = TestBed.inject(AmbulanceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
