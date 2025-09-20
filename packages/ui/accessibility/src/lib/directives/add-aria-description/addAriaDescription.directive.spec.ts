import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { AddAriaDescriptionDirective } from './addAriaDescription.directive';

@Component({
  selector: "lib-host",
  template: '',
  // Apply the directive to the host element and expose its input
  hostDirectives: [{ directive: AddAriaDescriptionDirective, inputs: ['ariaDesc'] }],
})
class HostComponent {}

describe('AddAriaDescriptionDirective (hostDirectives)', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent],
    });
  });

  it('should render aria-description when ariaDesc is provided', () => {
    const fixture = TestBed.createComponent(HostComponent);

    // Forwarded input from host component to the directive
    fixture.componentRef.setInput('ariaDesc', 'Helpful description');
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;
    expect(hostEl.getAttribute('aria-description')).toBe('Helpful description');
  });

  it('should set empty aria-description by default when not provided', () => {
    const fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();

    const hostEl: HTMLElement = fixture.nativeElement as HTMLElement;

    // Attribute should exist and be the empty string when input is missing/empty
    expect(hostEl.hasAttribute('aria-description')).toBe(true);
    expect(hostEl.getAttribute('aria-description')).toBe('');
  });

  it('should update aria-description when the input changes', () => {
    const fixture = TestBed.createComponent(HostComponent);

    fixture.componentRef.setInput('ariaDesc', 'First');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('aria-description')).toBe('First');

    fixture.componentRef.setInput('ariaDesc', 'Second');
    fixture.detectChanges();
    expect((fixture.nativeElement as HTMLElement).getAttribute('aria-description')).toBe('Second');
  });
});
