import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-schedule',
  imports: [CommonModule, TextDirective, TextComponent],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent {
  /**
   * Appointment Service
   */
  readonly appointmentService = inject(AppointmentService, {
    skipSelf: true,
  });
}
