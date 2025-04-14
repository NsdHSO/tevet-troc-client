import { Component, inject, input, linkedSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { EmergencyService } from '../service/emergency.service';
import { MatIcon } from '@angular/material/icon';
import { ColumnTextComponent, TableComponent } from 'ngx-liburg';
import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'lib-emergency',
  imports: [
    CommonModule,
    TextComponent,
    TextDirective,
    MatIcon,
    TableComponent,
    ColumnTextComponent,
  ],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss',
  providers: [EmergencyService],
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


  changePage($event: PageEvent) {
    this.emergencyService.page.set($event.pageIndex);
    this.emergencyService.pageSize.set($event.pageSize);
  }
}
