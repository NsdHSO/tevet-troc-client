import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleComponent } from './schedule.component';
import { AppointmentService } from '../../service/appointment/appointment.service';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleComponent],
      providers: [
        {
          provide: AppointmentService,
          useValue: {
            persons: () => [],
            departments: () => [],
            staff: () => [],
            loading: () => false,
            displayPerson: () => '',
            displayDepartment: () => '',
            displayDoctor: () => '',
            patientName: () => '',
            selectedPatient: () => undefined,
            selectedDepartment: () => undefined,
            selectedDoctor: () => undefined,
            setNotes: () => void 0,
            permissionDirective: { hasPermission: () => false },
          },
        },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
