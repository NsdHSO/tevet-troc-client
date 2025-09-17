import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InputSelectableComponent } from './input-selectable.component';

describe('InputSelectableComponent', () => {
  let component: InputSelectableComponent;
  let fixture: ComponentFixture<InputSelectableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputSelectableComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InputSelectableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
