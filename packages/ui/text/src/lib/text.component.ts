import { ChangeDetectionStrategy, Component } from '@angular/core';


@Component({
  selector: 'lib-text',
  imports: [],
  template: '<ng-content/>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent {}
