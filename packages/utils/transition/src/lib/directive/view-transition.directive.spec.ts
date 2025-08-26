// eslint-disable-next-file @angular-eslint/template/elements-content
import { Component } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ViewTransitionDirective,
} from './view-transition.directive';
import { TransitionViewService } from './../service/transition-view.service';

@Component({
  imports: [ViewTransitionDirective],
  template: `<a
    [libViewTransition]="'fade'"
    [identifierTransition]="'home'"
  >Iancu</a>`,
})
class HostComponent {}

describe('ViewTransitionDirective', () => {
  let fixture: ComponentFixture<HostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HostComponent, ViewTransitionDirective],
      providers: [TransitionViewService],
    });
    fixture = TestBed.createComponent(HostComponent);
    fixture.detectChanges();
  });

  it('should create the host with directive applied', () => {
    expect(fixture.componentInstance).toBeTruthy();
    const anchor: HTMLElement = fixture.nativeElement.querySelector('a');
    expect(anchor).toBeTruthy();
  });

  it('should set view-transition-name to none when no transition is active', () => {
    const anchor: HTMLElement = fixture.nativeElement.querySelector('a');
    const style = (anchor as HTMLElement).style as CSSStyleDeclaration;
    // When no transition is active, computed returns 'none'
    expect(
      style.getPropertyValue('view-transition-name') ||
        anchor.style.viewTransitionName
    ).toBe('none');
  });
});
