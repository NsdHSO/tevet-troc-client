import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanceService } from '../../service/ambulance/ambulance.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { AmbulanceStatusEnum } from '../../maps/ambulance-type';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule],
  templateUrl: './id-ambulance.component.html',
  styleUrl: './id-ambulance.component.scss',
  providers: [AmbulanceService],
})
export default class IdAmbulanceComponent {
  /**
   *
   */
  private route = inject(ActivatedRoute);
  /**
   *
   */
  private ambulanceService = inject(AmbulanceService);
  /**
   *
   */
  ambulance = this.route.queryParams.pipe(
    switchMap((data) => {
      this.ambulanceService.ambulanceApiService.ic = (
        data as { ambulance_ic: string }
      ).ambulance_ic;
      return this.ambulanceService.ambulanceApiService.ambulanceResource;
    })
  );

  get ambulanceStatus(): typeof AmbulanceStatusEnum {
    return AmbulanceStatusEnum;
  }
}
