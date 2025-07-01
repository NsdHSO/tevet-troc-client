import { TestBed } from '@angular/core/testing';

import { AmbulanceApiService } from './ambulance-api.service';

describe('AmbulanceApiService', () => {
  let service: AmbulanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AmbulanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
