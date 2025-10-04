import { TestBed } from '@angular/core/testing';
import { HttpTestingController, provideHttpClientTesting } from '@angular/common/http/testing';
import { HttpClient, provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from './loading.interceptor';
import { LoadingService } from '../services/loading.service';

describe('loadingInterceptor', () => {
  let httpClient: HttpClient;
  let httpMock: HttpTestingController;
  let loadingService: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([loadingInterceptor])),
        provideHttpClientTesting(),
        LoadingService,
      ],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    loadingService = TestBed.inject(LoadingService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should show loading when HTTP request starts', () => {
    expect(loadingService.isLoading()).toBe(0);

    httpClient.get('/api/test').subscribe();

    expect(loadingService.isLoading()).toBe(1);
    expect(loadingService.isLoadingActive()).toBe(true);

    const req = httpMock.expectOne('/api/test');
    req.flush({});
  });

  it('should hide loading when HTTP request completes successfully', () => {
    httpClient.get('/api/test').subscribe();

    expect(loadingService.isLoading()).toBe(1);

    const req = httpMock.expectOne('/api/test');
    req.flush({ data: 'test' });

    expect(loadingService.isLoading()).toBe(0);
    expect(loadingService.isLoadingActive()).toBe(false);
  });

  it('should hide loading when HTTP request fails', () => {
    httpClient.get('/api/test').subscribe({
      error: () => {
        // Expected error
      },
    });

    expect(loadingService.isLoading()).toBe(1);

    const req = httpMock.expectOne('/api/test');
    req.error(new ProgressEvent('error'), { status: 500, statusText: 'Server Error' });

    expect(loadingService.isLoading()).toBe(0);
    expect(loadingService.isLoadingActive()).toBe(false);
  });

  it('should handle multiple concurrent HTTP requests', () => {
    // Start 3 concurrent requests
    httpClient.get('/api/test1').subscribe();
    httpClient.get('/api/test2').subscribe();
    httpClient.get('/api/test3').subscribe();

    expect(loadingService.isLoading()).toBe(3);
    expect(loadingService.isLoadingActive()).toBe(true);

    // Complete first request
    const req1 = httpMock.expectOne('/api/test1');
    req1.flush({});
    expect(loadingService.isLoading()).toBe(2);
    expect(loadingService.isLoadingActive()).toBe(true);

    // Complete second request
    const req2 = httpMock.expectOne('/api/test2');
    req2.flush({});
    expect(loadingService.isLoading()).toBe(1);
    expect(loadingService.isLoadingActive()).toBe(true);

    // Complete third request
    const req3 = httpMock.expectOne('/api/test3');
    req3.flush({});
    expect(loadingService.isLoading()).toBe(0);
    expect(loadingService.isLoadingActive()).toBe(false);
  });

  it('should handle mixed success and error responses', () => {
    httpClient.get('/api/success').subscribe();
    httpClient.get('/api/error').subscribe({
      error: () => {
        // Expected error
      },
    });

    expect(loadingService.isLoading()).toBe(2);

    // First request succeeds
    const req1 = httpMock.expectOne('/api/success');
    req1.flush({});
    expect(loadingService.isLoading()).toBe(1);

    // Second request fails
    const req2 = httpMock.expectOne('/api/error');
    req2.error(new ProgressEvent('error'), { status: 404, statusText: 'Not Found' });
    expect(loadingService.isLoading()).toBe(0);
    expect(loadingService.isLoadingActive()).toBe(false);
  });
});
