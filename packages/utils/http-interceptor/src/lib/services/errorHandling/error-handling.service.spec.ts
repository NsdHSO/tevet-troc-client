import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ErrorHandlingService } from './error-handling.service';
import { TEVET_API, TEVET_API_AUTH, TEVET_API_AUTH_CLIENT } from '../providers/api.token';

describe('ErrorHandlingService', () => {
  let service: ErrorHandlingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ErrorHandlingService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: TEVET_API, useValue: { baseUrl: 'http://api.example' } },
        { provide: TEVET_API_AUTH, useValue: { baseUrl: 'http://auth.example' } },
        { provide: TEVET_API_AUTH_CLIENT, useValue: { baseUrl: 'http://client.example' } },
      ],
    });
    service = TestBed.inject(ErrorHandlingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
