import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-text',
  imports: [CommonModule],
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {}
