import { ComponentFixture, TestBed } from '@angular/core/testing';
import IdAmbulanceComponent from './id-ambulance.component';

describe('IdAmbulanceComponent', () => {
  let component: IdAmbulanceComponent;
  let fixture: ComponentFixture<IdAmbulanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdAmbulanceComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(IdAmbulanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
