import {
  Component,
  contentChild,
  input,
  output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { provideAnimations } from '@angular/platform-browser/animations';

/**
 * @title Selector Component
 * @description A generic component for selecting an option from a dropdown list.
 * It supports custom templates for displaying options and provides a default
 * display if no custom template is provided.
 * @template T The type of the value that can be picked by the selector.
 */
@Component({
  selector: 'lib-selector',
  imports: [CommonModule, TextComponent, TextDirective, JumbotronComponent],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css',
})
export class SelectorComponent<T> {
  /**
   * @description The currently picked (selected) option of type T.
   * This property is marked with the definite assignment assertion '!' because it's
   * expected to be initialized before use, typically via the `selectOption` method
   * or an initial binding.
   */
  picked!: T;

  /**
   * @description An optional label for the selector component.
   * This is an Angular input signal.
   */
  label = input<string>(); // Assuming label is a string

  /**
   * @description An array of options to be displayed in the selector's dropdown.
   * The type is `any[]` but could be refined based on the actual option structure.
   * This is an Angular input signal.
   */
  options = input<T[]>();

  /**
   * @description An optional `TemplateRef` for rendering the currently selected option.
   * If provided, this template will be used to display the `picked` value.
   * This is an Angular input signal.
   */
  selectedTemplateRef = input<TemplateRef<any>>();

  /**
   * @description A `TemplateRef` to be projected from the parent component, used for rendering
   * each individual option within the dropdown list.
   * The context provided to this template includes `$implicit` (the option itself) and `index`.
   * This is an Angular content child signal, looking for a template with a `#optionTemplate` reference.
   */
  optionTemplateRef = contentChild<TemplateRef<{ $implicit: any; index: number }>>('optionTemplate');

  /**
   * @description An output event that emits the selected option (`T`) when an option is chosen.
   * This is an Angular output signal.
   */
  optionSelected = output<T>();

  /**
   * @description A boolean flag indicating whether the dropdown list is currently open.
   * Defaults to `false` (closed).
   */
  isOpen = false;

  /**
   * @description Toggles the visibility of the dropdown list.
   * If the dropdown is open, it closes it; if closed, it opens it.
   */
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  /**
   * @description Handles the selection of an option from the dropdown.
   * Sets the `picked` value, emits the `optionSelected` event, and closes the dropdown.
   * @param option The option that was selected. The type is `any` but ideally
   * should match `T` if type safety is desired for the `options` input.
   */
  selectOption(option: T): void { // Changed option type to T for consistency
    this.picked = option;
    this.optionSelected.emit(option);
    this.isOpen = false;
  }
}
