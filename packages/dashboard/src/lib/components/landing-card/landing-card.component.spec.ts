import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { LandingCardComponent } from './landing-card.component';
import { DashboardApiService } from '../../service/dashboard-api.service';
import { API_CONFIG_CARD } from '../../provider/api.token';

describe('LandingCardComponent', () => {
  let component: LandingCardComponent;
  let fixture: ComponentFixture<LandingCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LandingCardComponent],
      providers: [
        DashboardApiService,
        provideHttpClient(),
        provideHttpClientTesting(),
        { provide: API_CONFIG_CARD, useValue: { baseUrl: 'http://api.example/v1/card' } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LandingCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
