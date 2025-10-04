import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoadingSpinnerComponent } from './loading-spinner.component';
import { LoadingService } from '../services/loading.service';
import { ComponentRef } from '@angular/core';

describe('LoadingSpinnerComponent', () => {
  let component: LoadingSpinnerComponent;
  let fixture: ComponentFixture<LoadingSpinnerComponent>;
  let loadingService: LoadingService;
  let componentRef: ComponentRef<LoadingSpinnerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LoadingSpinnerComponent],
      providers: [LoadingService],
    }).compileComponents();

    fixture = TestBed.createComponent(LoadingSpinnerComponent);
    component = fixture.componentInstance;
    componentRef = fixture.componentRef;
    loadingService = TestBed.inject(LoadingService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('showOverlay computed', () => {
    it('should use global loading state when no manual input provided', () => {
      expect(component.showOverlay()).toBe(false);

      loadingService.show();
      fixture.detectChanges();

      expect(component.showOverlay()).toBe(true);

      loadingService.hide();
      fixture.detectChanges();

      expect(component.showOverlay()).toBe(false);
    });

    it('should use manual input when provided (true)', () => {
      componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      expect(component.showOverlay()).toBe(true);

      // Global state should not affect manual control
      loadingService.show();
      fixture.detectChanges();
      expect(component.showOverlay()).toBe(true);

      loadingService.hide();
      fixture.detectChanges();
      expect(component.showOverlay()).toBe(true);
    });

    it('should use manual input when provided (false)', () => {
      componentRef.setInput('isLoading', false);
      fixture.detectChanges();

      expect(component.showOverlay()).toBe(false);

      // Global state should not affect manual control
      loadingService.show();
      fixture.detectChanges();
      expect(component.showOverlay()).toBe(false);
    });

    it('should prioritize manual input over global state', () => {
      loadingService.show();
      fixture.detectChanges();

      // Even though global state is active, manual false should override
      componentRef.setInput('isLoading', false);
      fixture.detectChanges();

      expect(component.showOverlay()).toBe(false);
    });
  });

  describe('template rendering', () => {
    it('should not render overlay when showOverlay is false', () => {
      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0');

      expect(overlay).toBeNull();
    });

    it('should render overlay when showOverlay is true', () => {
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0');

      expect(overlay).toBeTruthy();
    });

    it('should render spinner SVG when overlay is shown', () => {
      componentRef.setInput('isLoading', true);
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const spinner = compiled.querySelector('svg.animate-spin');

      expect(spinner).toBeTruthy();
    });

    it('should have correct z-index for overlay', () => {
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0') as HTMLElement;

      expect(overlay?.classList.contains('z-[9999]')).toBe(true);
    });

    it('should have backdrop blur classes', () => {
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0') as HTMLElement;

      expect(overlay?.classList.contains('backdrop-blur-sm')).toBe(true);
      expect(overlay?.classList.contains('bg-black/30')).toBe(true);
    });
  });

  describe('position input', () => {
    it('should use absolute positioning by default', () => {
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0') as HTMLElement;

      expect(overlay?.classList.contains('absolute')).toBe(true);
      expect(overlay?.classList.contains('fixed')).toBe(false);
    });

    it('should use fixed positioning when position="fixed"', () => {
      componentRef.setInput('position', 'fixed');
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0') as HTMLElement;

      expect(overlay?.classList.contains('fixed')).toBe(true);
      expect(overlay?.classList.contains('absolute')).toBe(false);
    });

    it('should use absolute positioning when position="absolute"', () => {
      componentRef.setInput('position', 'absolute');
      loadingService.show();
      fixture.detectChanges();

      const compiled = fixture.nativeElement as HTMLElement;
      const overlay = compiled.querySelector('.inset-0') as HTMLElement;

      expect(overlay?.classList.contains('absolute')).toBe(true);
      expect(overlay?.classList.contains('fixed')).toBe(false);
    });
  });

  describe('multiple instances scenario', () => {
    it('should allow multiple independent instances with manual control', () => {
      // Create second instance
      const fixture2 = TestBed.createComponent(LoadingSpinnerComponent);
      const component2 = fixture2.componentInstance;
      const componentRef2 = fixture2.componentRef;

      // First instance uses global state
      loadingService.show();
      fixture.detectChanges();
      fixture2.detectChanges();

      expect(component.showOverlay()).toBe(true);
      expect(component2.showOverlay()).toBe(true);

      // Second instance uses manual control
      componentRef2.setInput('isLoading', false);
      fixture2.detectChanges();

      expect(component.showOverlay()).toBe(true); // Still using global
      expect(component2.showOverlay()).toBe(false); // Using manual false
    });
  });
});
