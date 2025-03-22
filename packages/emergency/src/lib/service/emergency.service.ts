import { inject, Injectable } from '@angular/core';
import { EmergencyApiService } from './api/emergency-api.service';

@Injectable()
export class EmergencyService {
  /**
   *
   * @private
   */
  private readonly _ambulanceApi = inject(EmergencyApiService);

  /**
   *
   */
  resource = this._ambulanceApi.httpResourceRes;
}
