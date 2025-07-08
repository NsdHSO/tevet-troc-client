import { inject, Injectable } from '@angular/core';
import { AmbulanceApiService } from '../api/ambulance-api/ambulance-api.service';
import { AmbulanceStatusDao } from '@tevet-troc-client/models';

@Injectable()
export class AmbulanceService {
  /**
   *
   */
  ambulanceApiService = inject(AmbulanceApiService);

  public changeStatus($event: AmbulanceStatusDao, id: string|unknown, hospital_id: string|undefined, ambulance_ic: number| undefined) {
    this.ambulanceApiService.status$.next({status: $event, id, hospital_id, ambulance_ic})
  }
}
