import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmbulanceIDComponent } from './ambulance-id.component';

describe('AmbulanceComponent', () => {
  let component: AmbulanceIDComponent;
  let fixture: ComponentFixture<AmbulanceIDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulanceIDComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AmbulanceIDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
