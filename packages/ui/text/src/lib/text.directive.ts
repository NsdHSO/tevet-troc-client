import {
  DestroyRef,
  Directive,
  DOCUMENT,
  ElementRef,
  inject,
  input,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
} from '@angular/core';

import { Observable, tap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { AccessibilityDirective } from '@tevet-troc-client/accessibility';
import { StyleTextEnum, StyleTextType } from '@tevet-troc-client/models';

@Directive({
  // eslint-disable-next-line @angular-eslint/directive-selector
  selector: 'lib-text',
  hostDirectives: [
    {
      directive: AccessibilityDirective,
      inputs: ['ariaName', 'ariaDesc'],
    },
  ],
})
export class TextDirective implements OnChanges {
  /**
   * Instance of element Ref
   */
  private _elementRef = inject(ElementRef);
  /**
   * Instance of Renderer2
   */
  private _renderer2 = inject(Renderer2);
  /**
   * Instance of Document
   */
  private _document = inject(DOCUMENT);
  /**
   * Instance of DestroyRef
   *
   */
  private _destroyed$ = inject(DestroyRef);
  /**
   *
   */
  @Input()
  reactiveValueChange?: Observable<unknown>;
  /**
   * Content to be displayed. This can be:
   * - An object with a 'label' property (string).
   * @type {string | { label: string } | any}
   */
  content = input<string | { label: string } | any>(null);
  /**
   * An input what wanted to put it on the element
   */
  ariaName = input<string>('');
  /**
   * An input what wanted to put it on the element
   */
  ariaDesc = input<string>('');
  /**
   * Input with style
   * @enum {string} StyleTextEnum
   * @property {string} Title_1 'Title_1' - Large, bold heading style.
   * @property {string} Title_2 'Title_2' - Medium-sized heading style.
   * @property {string} Title_3 'Title_3' - Smaller heading style.
   * @property {string} Medium_1 'Medium_1' - Medium-sized, bold body text.
   * @property {string} Medium_2 'Medium_2' - Regular medium-sized body text.
   * @property {string} Medium_3 'Medium_3' - Medium-sized, slightly smaller body text.
   * @property {string} Small_1 'Small_1' - Small, bold body text.
   * @property {string} Small_2 'Small_2' - Regular small body text.
   * @property {string} Small_3 'Small_3' - Small, lighter body text.
   */
  styleText = input<StyleTextType>(StyleTextEnum.Small_1);
  /**
   * Color for text
   */
  colorText = input<string>('text-slate-800 dark:text-indigo-50');

  constructor() {
    setTimeout(() => {
      this.verifiedIfIsReactiveOrNot();
    }, 0);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes['content'] &&
      changes['content']['currentValue'] &&
      changes['content']['currentValue']['label']
    ) {
      this.checkContentAndApplied(changes['content']['currentValue']['label']);
    }
  }

  /**
   * Subscribe on value changes and applied the contet
   * @private
   */
  private verifiedIfIsReactiveOrNot() {
    if (this.reactiveValueChange !== undefined) {
      this.reactiveValueChange
        .pipe(
          tap((vlaue: unknown) => {
            this.checkContentAndApplied(vlaue);
          }),
          takeUntilDestroyed(this._destroyed$)
        )
        .subscribe();
    }
    this.checkContentAndApplied();
  }

  getElementTag(style: string, content: string): string {
    switch (style as StyleTextType) {
      case StyleTextEnum.Title_1:
        return 'h3';
      case StyleTextEnum.Title_2:
        return 'h2';
      case StyleTextEnum.Title_3:
      case StyleTextEnum.Title_3_1:
      case StyleTextEnum.Title_4:
        return 'h1';
      default:
        if (content.length > 8) {
          return 'p';
        }
        return 'span';
    }
  }

  getElementClasses(style: string): string[] {
    switch (style as StyleTextEnum) {
      case StyleTextEnum.Medium_1:
        return ['text-2xl', ...this.colorText().split(' ')];
      case StyleTextEnum.Medium_2:
        return ['text-3xl', ...this.colorText().split(' ')];
      case StyleTextEnum.Medium_3:
        return ['text-6xl', ...this.colorText().split(' ')];
      case StyleTextEnum.Small_1:
        return ['text-base', ...this.colorText().split(' ')];
      case StyleTextEnum.Small_2:
        return ['text-2xl', ...this.colorText().split(' ')];
      case StyleTextEnum.Small_3:
        return ['text-5xl', ...this.colorText().split(' ')];
      case StyleTextEnum.Title_4:
        return [
          'text-7xl',
          ...this.colorText().split(' '),
          'font-bold',
          'mb-3',
        ];
      case StyleTextEnum.Title_3:
        return [
          'text-5xl',
          ...this.colorText().split(' '),
          'font-bold',
          'mb-3',
        ];
      case StyleTextEnum.Title_3_1:
        return [
          'text-4xl',
          ...this.colorText().split(' '),
          'font-bold',
          'mb-3',
        ];
      case StyleTextEnum.Title_2:
        return [
          'text-3xl',
          ...this.colorText().split(' '),
          'font-bold',
          'mb-2',
        ];
      case StyleTextEnum.Title_1:
        return [
          'text-1xl',
          ...this.colorText().split(' '),
          'font-bold',
          'mb-1',
        ];
      // Add cases for other styles as needed
      default:
        return ['bg-red-700'];
    }
  }

  createStyledElement(tag: string, classes: string[], content: string): void {
    const element = this._document.createElement(tag);
    element.textContent = content;

    classes.forEach((className) =>
      this._renderer2.addClass(element, className)
    );

    // Clear the original content
    this._renderer2.setProperty(
      this._elementRef.nativeElement,
      'textContent',
      ''
    );

    // Append the newly created element
    this._renderer2.appendChild(this._elementRef.nativeElement, element);
    this._renderer2.setStyle(
      this._elementRef.nativeElement.firstChild,
      'color',
      'var(--app-text-color)'
    );
    this._renderer2.setStyle(
      this._elementRef.nativeElement.firstChild,
      'hyphens',
      'auto'
    );
  }

  /**
   * Check content and remove all elements after applied the style and content
   * @private
   */
  private checkContentAndApplied(value?: unknown) {
    const hostElement = this._elementRef.nativeElement;
    const content = hostElement.innerText?.trim();

    if (!content) {
      console.error(
        'No content found inside <lib-text>. Please check the content projection.'
      );
    }

    this.appliedStyleAndAppended(value ?? content);
  }

  /**
   * Applied style and append the content on what element choose
   * @param content
   * @private
   */
  private appliedStyleAndAppended(content: string | any) {
    const elementTag = this.getElementTag(this.styleText(), content);

    const elementClasses = this.getElementClasses(this.styleText());
    this.createStyledElement(elementTag, elementClasses, content);
  }
}
