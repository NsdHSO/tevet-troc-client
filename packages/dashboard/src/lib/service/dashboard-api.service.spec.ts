import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { DashboardApiService } from './dashboard-api.service';
import { API_CONFIG_CARD } from '../provider/api.token';

describe('DashboardApiService', () => {
  let service: DashboardApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        DashboardApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG_CARD, useValue: { baseUrl: 'http://api.example/v1/card' } },
      ],
    });
    service = TestBed.inject(DashboardApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
