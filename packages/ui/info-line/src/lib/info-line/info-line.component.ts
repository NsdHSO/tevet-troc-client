import { ChangeDetectionStrategy, Component, input, InputSignal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StyleTextEnum, StyleTextType } from '@tevet-troc-client/models';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { AccessibilityDirective } from '@tevet-troc-client/accessibility';

/**
 * A reusable UI component designed to display a title and an optional description,
 * typically for presenting a single line of information.
 *
 * @remarks
 * This component leverages `ChangeDetectionStrategy.OnPush` for optimized performance,
 * ensuring it only re-renders when its inputs change or when an event it's listening to fires.
 * It also includes a `data-test` attribute for easier testing and applies an
 * `AccessibilityDirective` for enhanced accessibility features.
 *
 * @example
 * ```html
 * <lib-info-line
 * [type]="'Title_2'"
 * [title]="'User Name'"
 * [description]="'John Doe'">
 * </lib-info-line>
 *
 * <lib-info-line
 * [title]="'Status'"
 * [description]="'Active'">
 * </lib-info-line>
 *
 * <lib-info-line
 * [title]="'Notes'">
 * </lib-info-line>
 * ```
 */
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
   * Defines the visual style and typography for the title.
   * This corresponds to predefined styles from `StyleTextEnum` (e.g., 'Title_1', 'Small_1').
   *
   * @defaultValue `StyleTextEnum.Title_1`
   * @type {StyleTextType}
   */
  type :InputSignal<StyleTextType>= input(StyleTextEnum.Title_1 as StyleTextType);

  /**
   * The main title text for the information line.
   * This input is optional.
   *
   * @type InputSignal<string | null>
   */
  title: InputSignal<string | null> = input<string | null>(null);

  /**
   * The descriptive text displayed alongside the title.
   * This input is optional and will be transformed:
   * - If `undefined` or an empty string `''` is provided, it will be internally
   * treated as `null`, ensuring it doesn't render empty descriptions.
   *
   * @defaultValue `null` (after transformation of `''` or `undefined`)
   * @type {string | null}
   */
  description: InputSignal<any | unknown> = input('', {
    transform: (v: string | undefined): string | null => {
      if (v === undefined || v === '') {
        return null;
      }
      return v;
    },
  });
}
