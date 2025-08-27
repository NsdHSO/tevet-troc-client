import { TestBed } from '@angular/core/testing';
import { AccessibilityDirective } from './accessibility.directive';

describe('AccessibilityDirective', () => {
  it('should create an instance', () => {
    let directive: AccessibilityDirective | undefined;
    TestBed.runInInjectionContext(() => {
      directive = new AccessibilityDirective();
    });
    expect(directive).toBeTruthy();
  });
});
