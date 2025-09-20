import { TemplateRef } from '@angular/core';

export interface DialogData {
  title?: string;
  message?: string;
  showOKBtn?: boolean;
  showCancelBtn?: boolean;
  templateRef?: TemplateRef<any>;
}
