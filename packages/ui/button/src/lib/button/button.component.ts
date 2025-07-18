import {
  Component,
  ElementRef,
  HostBinding,
  HostListener,
  inject,
  input,
  OnDestroy,
  output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDirective } from '@tevet-troc-client/accessibility';
import {
  StyleTextEnum,
  StyleTextType,
  TextComponent,
  TextDirective,
} from '@tevet-troc-client/text';

@Component({
  selector: 'lib-button',
  imports: [CommonModule, TextDirective, TextComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  hostDirectives: [
    {
      directive: AccessibilityDirective,
      inputs: ['ariaName', 'ariaDesc'],
    },
  ],
})
export class ButtonComponent implements OnDestroy {
  private rippleTimeoutId: number | null = null;
  private _elementRef = inject<ElementRef<HTMLElement>>(ElementRef);

  styleText = input<StyleTextType>(StyleTextEnum.Small_1);

  /**
   * Button Role
   */
  public buttonRole = input();

  /**
   * Text
   */
  public text = input();
  /**
   * An input what wanted to put it on the element
   */
  ariaName = input<string>('');
  /**
   * An input what wanted to put it on the element
   */
  ariaDesc = input<string>('');

  /**
   * Disabled state
   */
  public disabled = input<boolean>(false);

  protected readonly event = output();

  // Listen to click events on the host element
  @HostListener('click', ['$event'])
  onClick(event: MouseEvent) {
    if (this.disabled()) {
      event.preventDefault();
      event.stopPropagation();
      return;
    }
    if (!(event.target instanceof HTMLButtonElement) && !this.disabled()) {
      this.addRipple();
      this.event.emit();
    }
  }

  buttonClick(event: MouseEvent) {
    this.onClick(event);
  }

  // Bind the disabled attribute to the host element
  @HostBinding('attr.disabled')
  get isDisabled() {
    return this.disabled() ? 'disabled' : null;
  }

  // Bind the aria-disabled attribute
  @HostBinding('attr.aria-disabled')
  get ariaDisabled() {
    return this.disabled();
  }

  addRipple() {
    if (this.disabled()) return;

    // Clear any existing timeout first
    if (this.rippleTimeoutId !== null) {
      clearTimeout(this.rippleTimeoutId);
      this.rippleTimeoutId = null;
    }

    // Use ElementRef instead of document.querySelector
    const hostElement = this._elementRef.nativeElement;

    // Add ripple class
    hostElement.classList.add('ripple');

    // Store the timeout ID for potential cleanup
    this.rippleTimeoutId = window.setTimeout(() => {
      hostElement.classList.remove('ripple');
      this.rippleTimeoutId = null;
    }, 600);
  }

  // Add ngOnDestroy to clean up when component is destroyed
  ngOnDestroy() {
    // Clean up any pending timeouts
    if (this.rippleTimeoutId !== null) {
      clearTimeout(this.rippleTimeoutId);
      this.rippleTimeoutId = null;
    }
  }
}
