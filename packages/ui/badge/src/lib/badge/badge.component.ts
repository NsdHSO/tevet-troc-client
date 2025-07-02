import { Component, input } from '@angular/core';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { AmbulanceStatusEnum } from '@tevet-troc-client/models';

@Component({
  selector: 'lib-badge',
  template: ` <lib-text
    class="rounded-full px-3 py-1 font-semibold"
    styleText="Small_1"
    [class.bg-green-200]="title() === ambulanceStatus.AVAILABLE"
    [class.bg-red-200]="title() === ambulanceStatus.OUT_OF_SERVICE"
    [class.bg-blue-200]="title() === ambulanceStatus.DISPATCHED"
    [class.bg-yellow-200]="title() === ambulanceStatus.AWAITING_DISPATCH"
    [class.bg-purple-200]="title() === ambulanceStatus.MAINTENANCE"
    >{{ title() }}
  </lib-text>`,
  styleUrl: './badge.component.css',
  imports: [TextComponent, TextDirective],
})
export class BadgeComponent {
  /**
   * Title
   */
  title = input(null, {
    transform: (v) => {
      if (v === null) return '' as unknown as typeof AmbulanceStatusEnum;
      return AmbulanceStatusEnum[v as AmbulanceStatusEnum];
    },
  });

  get ambulanceStatus(): typeof AmbulanceStatusEnum {
    return AmbulanceStatusEnum;
  }
}
