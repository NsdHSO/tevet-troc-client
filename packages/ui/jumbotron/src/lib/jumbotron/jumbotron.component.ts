import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-jumbotron',
  imports: [CommonModule],
  template: `
    <ng-content />
  `,
  styleUrl: './jumbotron.component.scss',
})
export class JumbotronComponent {}
