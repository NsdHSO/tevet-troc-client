import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanceService } from '../../service/ambulance/ambulance.service';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule],
  templateUrl: './id-ambulance.component.html',
  styleUrl: './id-ambulance.component.scss',
  providers: [AmbulanceService],
})
export default class IdAmbulanceComponent {}
