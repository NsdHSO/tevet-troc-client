import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  input,
  model,
  signal,
  TemplateRef,
} from '@angular/core';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { NgTemplateOutlet } from '@angular/common';

@Component({
  selector: 'lib-input-selectable',
  imports: [TextComponent, TextDirective, JumbotronComponent, NgTemplateOutlet],
  templateUrl: './input-selectable.component.html',
  styleUrl: './input-selectable.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class InputSelectableComponent<T> {
  /**
   * Label for the input element.
   */
  public label = input<string>('Select an option');

  /**
   * The list of options available for selection.
   */
  public options = input<T[]>([]);

  /**
   * The currently picked option.
   */
  public picked = model<T | undefined>();

  /**
   * The value of the text input field (emitted to parent when user types).
   */
  public inputValue = model<string>('');

  /**
   * The value shown in the input for display purposes (not emitted on select).
   */
  public displayValue = signal<string>('');

  constructor() {
    effect(() => {
      const v = this.inputValue() ?? '';
      this.displayValue.set(v);
    });
  }
  /**
   * Flag to indicate whether options are being loaded.
   */
  public isLoading = input<boolean>(false);
  /**
   * A function to convert an option of type `T` to a displayable string.
   */
  public displayWith = input<(option: T) => string>();

  /**
   * Signal to control the visibility of the dropdown.
   */
  public isOpen = signal(false);

  /**
   * Content child for a custom option template.
   */
  public optionTemplateRef =
    contentChild<TemplateRef<{ $implicit: T; index: number }>>(
      'optionTemplate'
    );

  /**
   * A computed signal that filters options based on input or returns a loading state.
   */
  public filteredOptions = computed(() => {
    if (this.isLoading()) {
      return ['Loading...'];
    }

    const input = this.inputValue()?.toLowerCase();
    const allOptions = this.options() ?? [];
    if (!input) {
      return allOptions;
    }
    return allOptions;
  });

  /**
   * Opens/closes the dropdown when the user types.
   */
  onInput(event: Event): void {
    const value = (event.target as HTMLInputElement).value;
    this.displayValue.set(value);
    this.inputValue.set(value);
    this.isOpen.set(value.trim().length > 0);
  }

  /**
   * Sets the picked option and updates the input value.
   * @param option The selected option.
   */
  selectOption(option: T | string): void {
    if (option === 'Loading...') return;
    this.picked.set(option as T);

    const displayFn = this.displayWith();
    if (displayFn) {
      this.displayValue.set(displayFn(option as T));
    } else {
      this.displayValue.set(String(option));
    }

    this.isOpen.set(false);
  }
}
