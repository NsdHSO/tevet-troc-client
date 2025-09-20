import { Component, inject, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { InputSelectableComponent } from '@tevet-troc-client/input-selectable';

@Component({
  selector: 'lib-schedule',
  imports: [
    CommonModule,
    TextDirective,
    TextComponent,
    InputSelectableComponent,
  ],
  templateUrl: './schedule.component.html',
  styleUrl: './schedule.component.scss',
})
export class ScheduleComponent implements OnDestroy {
  /**
   * Appointment Service
   */
  readonly appointmentService = inject(AppointmentService, {
    skipSelf: true,
  });

  ngOnDestroy() {
    this.appointmentService.patientName.set('');
    this.appointmentService.selectedPatient.set(undefined);
    this.appointmentService.departmentSearch.set('');
    this.appointmentService.selectedDepartment.set(undefined);
    this.appointmentService.doctorSearch.set('');
    this.appointmentService.selectedDoctor.set(undefined);
    this.appointmentService.notes.set(null);
  }
}
