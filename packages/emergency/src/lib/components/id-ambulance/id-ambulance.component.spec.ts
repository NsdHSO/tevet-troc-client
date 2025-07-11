import { ComponentFixture, TestBed } from '@angular/core/testing';
import IdAmbulanceComponent from './id-ambulance.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EmergencyService } from '../../service/emergency/emergency.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';

describe('IdAmbulanceComponent', () => {
  let component: IdAmbulanceComponent;
  let fixture: ComponentFixture<IdAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdAmbulanceComponent],
      providers:[
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({})
          }
        },
        EmergencyService,
        provideHttpClientTesting(),
        provideHttpClient()
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(IdAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
