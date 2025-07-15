import { TestBed } from '@angular/core/testing';

import { EmergencyApiService } from './emergency-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('EmergencyApiService', () => {
  let service: EmergencyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(EmergencyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
