import { inject, Injectable } from '@angular/core';
import { AmbulanceApiService } from '../api/ambulance-api/ambulance-api.service';

@Injectable()
export class AmbulanceService {
  /**
   *
   */
  ambulanceApiService = inject(AmbulanceApiService);
}
