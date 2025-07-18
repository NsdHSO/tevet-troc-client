import { TestBed } from '@angular/core/testing';

import { AmbulanceApiService } from './ambulance-api.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';

describe('AmbulanceApiService', () => {
  let service: AmbulanceApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClientTesting(), provideHttpClient()],
    });
    service = TestBed.inject(AmbulanceApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
