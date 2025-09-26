import { TestBed } from '@angular/core/testing';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';

import { MeService } from './me.service';
import { TEVET_API } from '../providers/api.token';

describe('MeService', () => {
  let service: MeService;
  let httpMock: HttpTestingController;
  const baseUrl = 'http://test-api';

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptorsFromDi()),
        provideHttpClientTesting(),
        { provide: TEVET_API, useValue: { baseUrl } },
      ],
    });

    service = TestBed.inject(MeService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should have default meInfo empty string', () => {
    expect(service.meInfo).toBe('');
  });

  it('should set and get meInfo', () => {
    const value: any = { any: 'thing' };
    service.meInfo = value;
    expect(service.meInfo).toBe(value);
  });

  it('should call /v1/me/profile and update meInfo with response', () => {
    const mockMe: any = { id: '123' };
    let emitted: any;

    service.getMe$.subscribe((resp: any) => {
      emitted = resp;
    });

    const req = httpMock.expectOne(`${baseUrl}/v1/me/profile`);
    expect(req.request.method).toBe('GET');

    req.flush({ message: mockMe });

    expect(service.meInfo).toEqual(mockMe);
    expect(emitted?.message).toEqual(mockMe);
  });
});
