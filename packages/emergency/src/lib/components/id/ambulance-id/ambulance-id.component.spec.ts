import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AmbulanceIdComponent } from './ambulance-id.component';
import { of } from 'rxjs';

describe('AmbulanceComponent', () => {
  let component: AmbulanceIdComponent;
  let fixture: ComponentFixture<AmbulanceIdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AmbulanceIdComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AmbulanceIdComponent);
    component = fixture.componentInstance;

    // Provide required @Input() values
    component.service = {
      ambulanceApiService: {
        getAmbulanceStatus: of({ message: [] }),
        changeAmbulanceStatus: of(false),
      },
      changeStatus: jest.fn(),
    } as any;

    component.ambulance = {
      id: 1,
      hospital_id: 'HOSP-1',
      ambulance_ic: 123,
      status: 'Active',
      uiElements: [],
    } as any;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
