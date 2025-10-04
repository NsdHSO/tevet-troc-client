import { Component, inject, input } from '@angular/core';

import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { EmergencyService } from '../../service/emergency/emergency.service';
import { MatIcon } from '@angular/material/icon';
import {
  ColumnIconActionComponent,
  ColumnTextComponent,
  TableComponent,
} from 'ngx-liburg';
import { AsyncPipe, JsonPipe } from '@angular/common';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { LoadingSpinnerComponent } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'lib-emergency',
  imports: [
    TextComponent,
    TextDirective,
    MatIcon,
    TableComponent,
    ColumnTextComponent,
    ColumnIconActionComponent,
    AsyncPipe,
    LoadingSpinnerComponent,
  ],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss',
  providers: [EmergencyService, PermissionDirective],
})
export default class EmergencyComponent {
  readonly emergencyService = inject(EmergencyService);

  /**
   * Layout
   */
  readonly layouts = input<
    [
      {
        title: string;
        icon: string;
        ariaLabel: string;
        ariaDescription: string;
        class: string;
        sectionClass: string;
      }
    ]
  >();
}
