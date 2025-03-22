import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG_AMBULANCE } from '../../provider/api.token';
import { httpResource } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class EmergencyApiService {
  /**
   *
   */
  hospitalId = signal('Hospital of the University of Pennsylvania');
  /**
   *
   * @private
   */
  private apiConfigEmergency = inject(API_CONFIG_AMBULANCE);

  httpResourceRes = httpResource({
    url: this.apiConfigEmergency.baseUrl + '?' + this.hospitalId(),
  });
}
