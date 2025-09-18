import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSelectableComponent } from './input-selectable.component';

describe('InputSelectableComponent', () => {
  let component: InputSelectableComponent<string>;
  let fixture: ComponentFixture<InputSelectableComponent<any>>;

  const getInput = (): HTMLInputElement => fixture.nativeElement.querySelector('input');
  const getDropdown = (): HTMLElement | null => fixture.nativeElement.querySelector('ul[role="listbox"]');
  const typeInto = (value: string) => {
    const input = getInput();
    input.value = value;
    input.dispatchEvent(new Event('input', { bubbles: true }));
    fixture.detectChanges();
  };

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectableComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();


    fixture = TestBed.createComponent(InputSelectableComponent);
    component = fixture.componentInstance as InputSelectableComponent<string>;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('does not open on focus alone', () => {
    const input = getInput();
    input.dispatchEvent(new Event('focus'));
    fixture.detectChanges();

    expect(component.isOpen()).toBe(false);
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(getDropdown()).toBeNull();
  });

  it('opens when typing non-empty and closes when cleared', () => {
    const input = getInput();

    typeInto('a');
    expect(component.isOpen()).toBe(true);
    expect(input.getAttribute('aria-expanded')).toBe('true');
    expect(getDropdown()).not.toBeNull();

    typeInto('');
    expect(component.isOpen()).toBe(false);
    expect(input.getAttribute('aria-expanded')).toBe('false');
    expect(getDropdown()).toBeNull();
  });

  it('renders all options when open and not loading', () => {
    fixture.componentRef.setInput('options', ['Alpha', 'Beta', 'Gamma']);
    fixture.detectChanges();

    typeInto('z'); // any non-empty to open

    const optionButtons = fixture.nativeElement.querySelectorAll('ul[role="listbox"] li button');
    expect(optionButtons.length).toBe(3);
    expect(optionButtons[0].textContent).toContain('Alpha');
    expect(optionButtons[1].textContent).toContain('Beta');
    expect(optionButtons[2].textContent).toContain('Gamma');
  });

  it('selecting an option updates picked and display only, does not change inputValue and closes dropdown', () => {
    fixture.componentRef.setInput('options', ['Alpha', 'Beta']);
    fixture.detectChanges();

    // User types a search term
    typeInto('al');
    expect(component.inputValue()).toBe('al');

    // Open and click the second option
    const optionButtons: HTMLButtonElement[] = Array.from(
      fixture.nativeElement.querySelectorAll('ul[role="listbox"] li button')
    );
    optionButtons[1].click();
    fixture.detectChanges();

    // picked set
    expect(component.picked()).toBe('Beta');

    // display shows selected value
    expect(getInput().value).toBe('Beta');

    // search term NOT changed by selection
    expect(component.inputValue()).toBe('al');

    // dropdown closed
    expect(component.isOpen()).toBe(false);
    expect(getDropdown()).toBeNull();
  });

  it('uses displayWith to format the input when selecting', () => {
    fixture.componentRef.setInput('options', ['Alpha']);
    fixture.componentRef.setInput('displayWith', (o: string) => `>> ${o}`);
    fixture.detectChanges();

    typeInto('a');
    const btn: HTMLButtonElement = fixture.nativeElement.querySelector('ul[role="listbox"] li button');
    btn.click();
    fixture.detectChanges();

    expect(getInput().value).toBe('>> Alpha');
  });

  it('shows Loading... when isLoading is true', () => {
    fixture.componentRef.setInput('isLoading', true);
    fixture.detectChanges();

    typeInto('a');

    const loadingEl: HTMLElement | null = fixture.nativeElement.querySelector('ul[role="listbox"] li[role="status"]');
    expect(loadingEl).not.toBeNull();
    expect(loadingEl!.textContent).toContain('Loading...');
  });

  it('shows No results found when there are no options and not loading', () => {
    fixture.componentRef.setInput('isLoading', false);
    fixture.componentRef.setInput('options', []);
    fixture.detectChanges();

    typeInto('a');

    const emptyEl: HTMLElement | null = fixture.nativeElement.querySelector('ul[role="listbox"] li[role="status"]');
    expect(emptyEl).not.toBeNull();
    expect(emptyEl!.textContent).toContain('No results found.');
  });

  it('combobox has proper ARIA attributes and they toggle', () => {
    const input = getInput();

    expect(input.getAttribute('role')).toBe('combobox');
    expect(input.getAttribute('aria-controls')).toBe('dropdown-list');
    expect(input.getAttribute('aria-haspopup')).toBe('listbox');
    expect(input.getAttribute('aria-expanded')).toBe('false');

    typeInto('x');
    expect(input.getAttribute('aria-expanded')).toBe('true');
  });

  it('external updates to inputValue sync to the displayed input (displayValue)', () => {
    // Parent sets search term programmatically
    component.inputValue.set('external');
    fixture.detectChanges();

    expect(getInput().value).toBe('external');
  });

  it('aria-live region reflects open/closed state', () => {
    const liveRegion = fixture.nativeElement.querySelector('[aria-live="polite"]') as HTMLElement;
    expect(liveRegion.textContent?.toLowerCase()).toContain('dropdown closed');

    typeInto('a');
    expect(liveRegion.textContent?.toLowerCase()).toContain('dropdown opened');

    typeInto('');
    expect(liveRegion.textContent?.toLowerCase()).toContain('dropdown closed');
  });
});
