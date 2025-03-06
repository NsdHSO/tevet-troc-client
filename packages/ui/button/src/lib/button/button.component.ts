import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'lib-button',
  imports: [CommonModule],
  templateUrl: './button.component.html',
  styleUrl: './button.component.css',
})
export class ButtonComponent {
  /**
   * Aria Label
   */
  public ariaLabel = input();

  /**
   * Button Role
   */
  public buttonRole = input();

  /**
   * Text
   */
  public text = input();
  protected readonly event = output();
}
