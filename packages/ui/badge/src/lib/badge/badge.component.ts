import { Component, input } from '@angular/core';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { AmbulanceStatusEnum } from '@tevet-troc-client/models';

@Component({
  selector: 'lib-badge',
  template: `
    <lib-text
      styleText="Small_1"
    >{{ title() }}
    </lib-text>`,
  styleUrl: './badge.component.css',
  imports: [TextComponent, TextDirective],
  host: {
    '[class.available]': 'title() === ambulanceStatus.AVAILABLE',
    '[class.in_service]': 'title() === ambulanceStatus.IN_SERVICE',
    '[class.maintenance]': 'title() === ambulanceStatus.MAINTENANCE',
    '[class.dispatched]': 'title() === ambulanceStatus.DISPATCHED',
    '[class.en_route_to_scene]': 'title() === ambulanceStatus.EN_ROUTE_TO_SCENE',
    '[class.at_scene]': 'title() === ambulanceStatus.AT_SCENE',
    '[class.transporting_patient]': 'title() === ambulanceStatus.TRANSPORTING_PATIENT',
    '[class.en_route_to_hospital]': 'title() === ambulanceStatus.EN_ROUTE_TO_HOSPITAL',
    '[class.at_hospital]': 'title() === ambulanceStatus.AT_HOSPITAL',
    '[class.returning_to_base]': 'title() === ambulanceStatus.RETURNING_TO_BASE',
    '[class.unavailable]': 'title() === ambulanceStatus.UNAVAILABLE',
    '[class.out_of_service]': 'title() === ambulanceStatus.OUT_OF_SERVICE',
    '[class.on_break]': 'title() === ambulanceStatus.ON_BREAK',
    '[class.fueling]': 'title() === ambulanceStatus.FUELING',
    '[class.cleaning]': 'title() === ambulanceStatus.CLEANING',
    '[class.awaiting_dispatch]': 'title() === ambulanceStatus.AWAITING_DISPATCH',
    '[class.preparing_for_mission]': 'title() === ambulanceStatus.PREPARING_FOR_MISSION',
    '[class.under_repair]': 'title() === ambulanceStatus.UNDER_REPAIR',
  },
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
