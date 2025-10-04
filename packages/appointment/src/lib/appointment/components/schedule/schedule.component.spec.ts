import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ScheduleComponent } from './schedule.component';
import { AppointmentService } from '../../service/appointment/appointment.service';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { provideHttpClient } from '@angular/common/http';
import { MeService } from '@tevet-troc-client/http-interceptor';

describe('ScheduleComponent', () => {
  let component: ScheduleComponent;
  let fixture: ComponentFixture<ScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ScheduleComponent, PermissionDirective],
      providers: [
        provideHttpClientTesting(),
        provideHttpClient(),
        AppointmentService,
        PermissionDirective,
        {
          provide: MeService,
          useValue: {
            meInfo: {
              attributes: {
                hospital_id: 'test-hospital-id',
                name: 'Test User',
              },
            },
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
