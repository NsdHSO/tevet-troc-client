import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergencyService } from '../../service/emergency.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
})
export default class IdComponent {
  readonly emergencyService = inject(EmergencyService);
   private readonly route = inject(ActivatedRoute);
  dataForAmbulance = this.route.queryParams.pipe(
    switchMap((data) => {
      this.emergencyService.ambulance_ic.next((data as  { ambulance_ic: string }).ambulance_ic)
      return this.emergencyService.dataForId;

    })
  );
}
