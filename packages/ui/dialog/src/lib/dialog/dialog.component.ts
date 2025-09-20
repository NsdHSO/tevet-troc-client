import { ChangeDetectionStrategy, Component, inject, ViewEncapsulation } from '@angular/core';
import { DialogData } from './types/dialog.type';
import {
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef
} from '@angular/material/dialog';
import { ButtonComponent } from '@tevet-troc-client/button';
import { NgTemplateOutlet } from '@angular/common';
import { TextDirective } from '@tevet-troc-client/text';

/**
 * A reusable dialog component that integrates with Angular Material's dialog system.
 *
 * @component
 * @selector lib-dialog
 *
 * @description
 * This component provides a customizable dialog interface with the following features:
 * - Automatic integration with Angular Material's dialog system
 * - OnPush change detection for better performance
 * - No view encapsulation for global styling capabilities
 * - Built-in close functionality
 */
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
  /** Dialog data injected through MAT_DIALOG_DATA token */
  public data = inject<DialogData>(MAT_DIALOG_DATA);

  /** Reference to the dialog instance */
  public dialogRef = inject(MatDialogRef<DialogComponent>);

  /**
   * Closes the dialog, passing 'true' as the result to indicate the OK/confirm action.
   *
   * @returns void
   */
  close(): void {
    this.dialogRef.close(true);
  }
}
