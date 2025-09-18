import {
  ChangeDetectionStrategy,
  Component,
  computed,
  contentChild,
  effect,
  ElementRef,
  input,
  model,
  signal,
  TemplateRef,
  viewChild,
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
  // Use `input()` for the label property
  public label = input<string>('Select an option');

  // Use `input()` for an array of options
  public options = input<any>([]);

  // Use `model()` for two-way binding of the picked value
  public picked = model<T | undefined>();

  // Use a writable signal for the input field's value
  public inputValue = model<string>('');
  public isLoading = input<boolean>(false);
  public displayWith = input<(option: T) => string >();

  // Writable signals for component state
  public isOpen = signal(false);

  public dropdownList = viewChild<ElementRef<HTMLUListElement>>('dropdownList');

  // Use contentChild() for projected templates
  public optionTemplateRef =
    contentChild<TemplateRef<{ $implicit: T; index: number }>>(
      'optionTemplate'
    );

  public filteredOptions = computed(() => {
    if (this.isLoading()) {
      return ['Loading...']; // temporary UI option
    }

    const input = this.inputValue()?.toLowerCase();
    if (!input) {
      return this.options() ?? [];
    }
    return (this.options() ?? [])
  });


  // Toggles the visibility of the dropdown list.
  toggleDropdown(): void {
    this.isOpen.update((value) => !value);
  }

  // Handles input focus to open the dropdown
  onInputFocus(): void {
    this.isOpen.set(true);
  }

  // Handles the selection of an option
  selectOption(option: T | string): void {
    if (option === 'Loading...') return; // ignore
    this.picked.set(option as any as T);

    const displayFn = this.displayWith();
    if (displayFn) {
      this.inputValue.set(displayFn(option as T));
    } else {
      this.inputValue.set(String(option));
    }

    this.isOpen.set(false);
  }
}
