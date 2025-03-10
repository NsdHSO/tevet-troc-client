import { Component, input, output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AccessibilityDirective } from '@tevet-troc-client/accessibility';
import { StyleTextEnum, StyleTextType, TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-button',
  imports: [CommonModule, TextDirective, TextComponent],
  templateUrl: './button.component.html',
  styleUrl: './button.component.scss',
  hostDirectives: [
    {
      directive: AccessibilityDirective,
      inputs: ['ariaName', 'ariaDesc'],
    },
  ],
})
export class ButtonComponent {
  styleText = input<StyleTextType>(StyleTextEnum.Small_1);

  /**
   * Button Role
   */
  public buttonRole = input();

  /**
   * Text
   */
  public text = input();
  /**
   * An input what wanted to put it on the element
   */
  ariaName = input<string>('');
  /**
   * An input what wanted to put it on the element
   */
  ariaDesc = input<string>('');
  protected readonly event = output();
}
