import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleTextEnum, StyleTextType } from '@tevet-troc-client/models';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { AccessibilityDirective } from '@tevet-troc-client/accessibility';

@Component({
  selector: 'lib-info-line',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './info-line.component.html',
  styleUrl: './info-line.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    '[attr.data-test]': "'info-line'",
  },
  hostDirectives: [
    {
      directive: AccessibilityDirective,
    },
  ],
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
  description = input('', {
    transform: (v: string | undefined): string | null => {
      if (v === undefined || v === '') {
        return null;
      }
      return v;
    },
  });
}
