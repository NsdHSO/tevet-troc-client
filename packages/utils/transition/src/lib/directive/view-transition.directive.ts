import { computed, Directive, inject, input } from '@angular/core';
import { TransitionViewService } from '../service/transition-view.service';

@Directive({
  selector: 'a, [libViewTransition]',
  host: {
    '[style.view-transition-name]': 'viewTransitionName()',
  },
})
export class ViewTransitionDirective {
  /**
   * Injected transition view
   */
  private readonly _transitionView = inject(TransitionViewService);

  /**
   * Identifier to verify what is current transition
   */
  identifierTransition = input.required();

  /**
   * Name for applying view transition name
   */
  nameForTransition = input.required({
    alias: 'libViewTransition',
  });

  protected readonly viewTransitionName = computed(() => {
    const currentTransition = this._transitionView.currentTransition();
    const apply =
      currentTransition?.to.firstChild?.routeConfig?.path === this.identifierTransition() ||
      currentTransition?.from.firstChild?.routeConfig?.path === this.identifierTransition();

    return apply ? this.nameForTransition() : 'none';
  });
}
