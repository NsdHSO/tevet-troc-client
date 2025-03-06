import { Directive, input } from '@angular/core';

@Directive({
  standalone: true,
  host: {
    '[attr.aria-label]': 'ariaName()??""'
  }
})
export class AddAriaLabelDirective {

  /**
   * An input what wanted to put it on the element
   */
  ariaName = input<string>('');
}