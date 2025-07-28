import {
  ChangeDetectionStrategy,
  Component,
  inject,
  ViewEncapsulation,
} from '@angular/core';
import { DialogData } from './types/dialog.type';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { ButtonComponent } from '@tevet-troc-client/button';
import { NgTemplateOutlet } from '@angular/common';
import { TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-dialog',
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  imports: [
    MatDialogContent,
    MatDialogActions,
    ButtonComponent,
    MatDialogClose,
    NgTemplateOutlet,
    TextDirective,
  ],
})
export class DialogComponent {
  public data = inject<DialogData>(MAT_DIALOG_DATA);
  public dialogRef = inject(MatDialogRef<DialogComponent>);

  close() {
    this.dialogRef.close(true);
  }
}
