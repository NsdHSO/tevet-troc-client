import { ComponentFixture, TestBed } from '@angular/core/testing';
import IdComponent from './id.component';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { EmergencyService } from '../../service/emergency/emergency.service';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { PermissionDirective } from '@tevet-troc-client/permission';

describe('IdComponent', () => {
  let component: IdComponent;
  let fixture: ComponentFixture<IdComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: of({}),
          },
        },
        EmergencyService,
        provideHttpClientTesting(),
        provideHttpClient(),
        { provide: PermissionDirective, useValue: { hasPermission: () => true } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(IdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
