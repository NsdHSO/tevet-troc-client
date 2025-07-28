import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogComponent } from '../../dialog.component';
import { DialogData } from '../../types/dialog.type';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  private dialogRef!: MatDialogRef<DialogComponent>;

  private dialog = inject(MatDialog);

  openDialog(
    data: DialogData,
    additionalDialogConfigData?: any
  ): MatDialogRef<DialogComponent> {
    if (this.dialogRef) {
      this.dialogRef.close();
    }
    this.dialogRef = this.dialog.open(DialogComponent, {
      width: '500px',
      data,
      ...additionalDialogConfigData,
    });

    return this.dialogRef;
  }
}
