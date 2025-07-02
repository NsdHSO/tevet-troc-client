import { ComponentFixture, TestBed } from '@angular/core/testing';
import { InfoLineComponent } from './info-line.component';

describe('InfoLineComponent', () => {
  let component: InfoLineComponent;
  let fixture: ComponentFixture<InfoLineComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InfoLineComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(InfoLineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have 2 cells', () => {
    const element: HTMLElement = fixture.debugElement.nativeElement;

    expect(element.children.length).toEqual(2);
  });
});
