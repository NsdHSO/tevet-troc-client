import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import AppointmentComponent from './appointment.component';
import { provideHttpClient } from '@angular/common/http';

describe('AppointmentComponent', () => {
  let component: AppointmentComponent;
  let fixture: ComponentFixture<AppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentComponent],
      providers: [provideHttpClient(),provideHttpClientTesting()],
    }).compileComponents();

    fixture = TestBed.createComponent(AppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
