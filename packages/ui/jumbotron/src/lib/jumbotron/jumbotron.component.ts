import { Component, HostBinding, input } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-jumbotron',
  imports: [CommonModule],
  template: `
    <ng-content />
  `,
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent {
  /**
   * Controls whether hover effects are enabled
   */
  hover = input(false);

  @HostBinding('class.hover-enabled')
  get isHoverEnabled(): boolean {
    return this.hover();
  }
}
