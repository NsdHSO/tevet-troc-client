import { TestBed } from '@angular/core/testing';

import { EmergencyApiService } from './emergency-api.service';

describe('EmergencyApiService', () => {
  let service: EmergencyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EmergencyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
