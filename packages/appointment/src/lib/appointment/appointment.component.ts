import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { ButtonComponent } from '@tevet-troc-client/button';
import { DialogData, DialogService } from '@tevet-troc-client/dialog';

@Component({
  selector: 'lib-appointment',
  imports: [CommonModule, TextDirective, TextComponent, ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export default class AppointmentComponent {
  dialogService = inject(DialogService);

  addAppointment(template: any) {
    const dialogData: DialogData = {
      title: 'Test Dialog',
      message: 'This is our first dialog!',
      showOKBtn: true,
      showCancelBtn: true
    };

    const dialogRef = this.dialogService.openDialog(dialogData, {
      disableClose: true,
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('User clicked OK');
      } else {
        console.log('User clicked Cancel');
      }
    });
  }
}
