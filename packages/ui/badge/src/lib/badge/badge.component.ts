import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import {
  AmbulanceStatusEnum,
  ambulanceStsDisplayNames,
  emergencyStatusDisplayNames,
  EmergencyStatusEnum,
} from '@tevet-troc-client/models';

@Component({
  selector: 'lib-badge',
  template: ` <lib-text styleText="Small_1" [content]="{ label: title() }" />`,
  styleUrl: './badge.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [TextComponent, TextDirective],
  host: {
    '[class.available]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.AVAILABLE] || title() === emergencyStatusDisplayNames()[EmergencyStatusEnum.InProgress]',
    '[class.in_service]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.IN_SERVICE]',
    '[class.maintenance]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.MAINTENANCE] || title() === emergencyStatusDisplayNames()[EmergencyStatusEnum.Reported]',
    '[class.dispatched]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.DISPATCHED]|| title() === emergencyStatusDisplayNames()[EmergencyStatusEnum.Assigned]',
    '[class.en_route_to_scene]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.EN_ROUTE_TO_SCENE]',
    '[class.at_scene]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.AT_SCENE]',
    '[class.transporting_patient]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.TRANSPORTING_PATIENT] || title() === emergencyStatusDisplayNames()[EmergencyStatusEnum.Resolved]',
    '[class.en_route_to_hospital]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.EN_ROUTE_TO_HOSPITAL]',
    '[class.at_hospital]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.AT_HOSPITAL]',
    '[class.returning_to_base]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.RETURNING_TO_BASE]',
    '[class.unavailable]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.UNAVAILABLE] || title() === emergencyStatusDisplayNames()[EmergencyStatusEnum.Canceled]',
    '[class.out_of_service]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.OUT_OF_SERVICE]',
    '[class.on_break]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.ON_BREAK]',
    '[class.fueling]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.FUELING]',
    '[class.cleaning]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.CLEANING]',
    '[class.awaiting_dispatch]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.AWAITING_DISPATCH]',
    '[class.preparing_for_mission]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.PREPARING_FOR_MISSION]',
    '[class.under_repair]':
      'title() === ambulanceStsDisplayNames()[ambulanceStatus.UNDER_REPAIR]',
  },
})
export class BadgeComponent {
  /**
   * Title
   */
  title = input(null, {
    transform: (v) => {
      if (v === null) return '' as unknown as typeof AmbulanceStatusEnum;
      return v;
    },
  });

  get ambulanceStatus(): typeof AmbulanceStatusEnum {
    return AmbulanceStatusEnum;
  }

  protected readonly ambulanceStsDisplayNames = ambulanceStsDisplayNames;
  protected readonly emergencyStatusDisplayNames = emergencyStatusDisplayNames;
  protected readonly EmergencyStatusEnum = EmergencyStatusEnum;
}
