import { Component, EventEmitter, Output, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class Butto3Component {}
@Component({
  selector: 'lib-button3',
  imports: [CommonModule],
  template:`
    <button
      aria-label="'Iancu'"
      role="button"
      (click)="clickButton.emit(true)"
    >
      pressMe iancu
    </button>

  `
})
export class Button3Component {
  @Output()
  clickButton= new EventEmitter();

}
