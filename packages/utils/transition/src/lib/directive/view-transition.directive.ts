import { computed, Directive, inject, input } from '@angular/core';
import { TransitionViewService } from '../service/transition-view.service';
import { ActivatedRoute } from '@angular/router';
import { toSignal } from '@angular/core/rxjs-interop';

@Directive({
  selector: '[libViewTransition]',
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
   * Activate route
   */
  activatedRoute = inject(ActivatedRoute);
  id = input.required();
  nameForTransition = input.required({
    alias: 'libViewTransition',
  });
  data = toSignal<{ view: string }>(this.activatedRoute.data as any);

  protected readonly viewTransitionName = computed(() => {
    const currentTransition = this._transitionView.currentTransition();
    const apply =
      currentTransition?.to.firstChild?.routeConfig?.path === this.id() ||
      currentTransition?.from.firstChild?.routeConfig?.path === this.id();

    return apply ? this.nameForTransition() : 'none';
  });
}
