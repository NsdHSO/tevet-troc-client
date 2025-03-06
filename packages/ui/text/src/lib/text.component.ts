import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-text',
  standalone: true,
  imports: [CommonModule],
  template: '<ng-content/>',
})
export class TextComponent {}
