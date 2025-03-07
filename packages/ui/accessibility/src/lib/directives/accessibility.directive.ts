import { Directive, input } from '@angular/core';
import { AddAriaLabelDirective } from './add-aria-label/add-aria-label.directive';
import { AddAriaDescriptionDirective } from './add-aria-description/addAriaDescription.directive';

@Directive({
  hostDirectives: [
    {
      directive: AddAriaLabelDirective,
      inputs: ['ariaName'],
    },
    {
      directive: AddAriaDescriptionDirective,
      inputs: ['ariaDesc'],
    },
  ],
})
export class AccessibilityDirective {
  /**
   * An input what wanted to put it on the element
   */
  ariaName= input<string>('');
  /**
   * An input what wanted to put it on the element
   */
  ariaDesc = input<string>('');
}
