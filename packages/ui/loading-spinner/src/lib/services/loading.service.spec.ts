import { TestBed } from '@angular/core/testing';
import { LoadingService } from './loading.service';

describe('LoadingService', () => {
  let service: LoadingService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LoadingService],
    });
    service = TestBed.inject(LoadingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should initialize with loading count of 0', () => {
    expect(service.isLoading()).toBe(0);
    expect(service.isLoadingActive()).toBe(false);
  });

  describe('show', () => {
    it('should increment loading count', () => {
      service.show();
      expect(service.isLoading()).toBe(1);
      expect(service.isLoadingActive()).toBe(true);
    });

    it('should handle multiple concurrent loading states', () => {
      service.show();
      service.show();
      service.show();
      expect(service.isLoading()).toBe(3);
      expect(service.isLoadingActive()).toBe(true);
    });
  });

  describe('hide', () => {
    it('should decrement loading count', () => {
      service.show();
      service.show();
      expect(service.isLoading()).toBe(2);

      service.hide();
      expect(service.isLoading()).toBe(1);
      expect(service.isLoadingActive()).toBe(true);
    });

    it('should not go below 0', () => {
      service.hide();
      service.hide();
      expect(service.isLoading()).toBe(0);
      expect(service.isLoadingActive()).toBe(false);
    });

    it('should set isLoadingActive to false when count reaches 0', () => {
      service.show();
      expect(service.isLoadingActive()).toBe(true);

      service.hide();
      expect(service.isLoadingActive()).toBe(false);
    });
  });

  describe('concurrent requests scenario', () => {
    it('should handle multiple concurrent requests correctly', () => {
      // Simulate 3 concurrent HTTP requests starting
      service.show(); // Request 1 starts
      service.show(); // Request 2 starts
      service.show(); // Request 3 starts
      expect(service.isLoading()).toBe(3);
      expect(service.isLoadingActive()).toBe(true);

      // First request finishes
      service.hide();
      expect(service.isLoading()).toBe(2);
      expect(service.isLoadingActive()).toBe(true);

      // Second request finishes
      service.hide();
      expect(service.isLoading()).toBe(1);
      expect(service.isLoadingActive()).toBe(true);

      // Third request finishes
      service.hide();
      expect(service.isLoading()).toBe(0);
      expect(service.isLoadingActive()).toBe(false);
    });
  });
});
