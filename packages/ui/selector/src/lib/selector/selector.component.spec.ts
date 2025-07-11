import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SelectorComponent } from './selector.component';

describe('SelectorComponent', () => {
  let component: SelectorComponent<any>;
  let fixture: ComponentFixture<SelectorComponent<any>>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SelectorComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SelectorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
