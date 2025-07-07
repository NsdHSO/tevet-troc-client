import {
  Component,
  ContentChild,
  EventEmitter,
  Input,
  Output,
  TemplateRef,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-selector',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './selector.component.html',
  styleUrl: './selector.component.css',
})
export class SelectorComponent<T> {
  picked!: T;

  @Input()
  label!: string;
  @Input()
  options!: T[] | undefined;

  @Input()
  selectedTemplateRef!: TemplateRef<any>;

  @ContentChild('optionTemplate', { static: false })
  optionTemplateRef!: TemplateRef<any>;

  @Output()
  selectionChanged = new EventEmitter<T>();

  @Output() optionSelected = new EventEmitter<any>();

  isOpen = false; // This property will control the dropdown's visibility

  // Toggles the visibility of the dropdown list
  toggleDropdown(): void {
    this.isOpen = !this.isOpen;
  }

  // Handles selecting an option from the list
  selectOption(option: any): void {
    this.picked = option;
    this.optionSelected.emit(option);
    this.isOpen = false; // Close the dropdown after an option is selected
  }
}
