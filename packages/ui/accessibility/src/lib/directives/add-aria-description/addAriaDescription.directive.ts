import { Directive, input } from '@angular/core';

@Directive({
  host: {
    '[attr.aria-description]': 'ariaDesc()?? ""',
  },
})
export class AddAriaDescriptionDirective {
  /**
   * An input what wanted to put it on the element
   */
  ariaDesc = input<string>('');
}
