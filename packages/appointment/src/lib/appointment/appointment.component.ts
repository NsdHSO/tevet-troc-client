import { Component, inject, TemplateRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { ButtonComponent } from '@tevet-troc-client/button';
import { DialogData, DialogService } from '@tevet-troc-client/dialog';
import { ScheduleComponent } from './components/schedule/schedule.component';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { AppointmentService } from './service/appointment/appointment.service';

@Component({
  selector: 'lib-appointment',
  imports: [
    CommonModule,
    TextDirective,
    TextComponent,
    ButtonComponent,
    ScheduleComponent,
  ],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
  providers: [AppointmentService, PermissionDirective],
})
export default class AppointmentComponent {
  dialogService = inject(DialogService);
  /**
   * Appointment Service
   */
  readonly appointmentService = inject(AppointmentService);
  addAppointment(template: TemplateRef<ScheduleComponent>) {
    const dialogData: DialogData = {
      templateRef: template,
      showOKBtn: true,
      showCancelBtn: true,
    };

    const dialogRef = this.dialogService.openDialog(dialogData, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.appointmentService.postAppointment().subscribe()

      } else {
        console.log('User clicked Cancel');
      }
    });
  }
}
