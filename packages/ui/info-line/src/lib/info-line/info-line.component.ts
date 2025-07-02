import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleTextEnum, StyleTextType } from '@tevet-troc-client/models';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-info-line',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './info-line.component.html',
  styleUrl: './info-line.component.scss',
  host: {
    '[attr.data-test]': "'info-line'",
    'class': "flex justify-between"
  },
})
export class InfoLineComponent {
  /**
   * Type
   */
  type = input(StyleTextEnum.Title_1 as StyleTextType);
  /**
   * Title
   */
  title = input<string | null>(null);
  /**
   * Title
   */
  description = input<string | null>(null);
}
