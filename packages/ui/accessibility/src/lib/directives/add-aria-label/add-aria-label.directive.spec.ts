import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AddAriaLabelDirective } from './add-aria-label.directive';
import { expect } from '@playwright/test';

describe('Add Aria label', () => {
  describe('Init Value', () => {
    describe('On element', () => {
      @Component({
        selector: 'lib-test',
        template: ` <div>asfsf</div>`,
        hostDirectives: [
          {
            directive: AddAriaLabelDirective,
            inputs: ['ariaName'],
          },
        ],
      })
      class TestComponent {}

      let component: TestComponent;
      let fixture: ComponentFixture<TestComponent>;

      beforeEach(() => {
        TestBed.configureTestingModule({
          imports: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        component = fixture.componentInstance;
      });

      it('should get aria label', () => {
        fixture.componentRef.setInput('ariaName', 'mamaPauker');
        fixture.detectChanges();

        expect(fixture.nativeElement.getAttribute('aria-label')).toContain(
          'mamaPauker'
        );
      });
    });
  });
});
