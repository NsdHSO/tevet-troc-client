import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap } from 'rxjs';
import { API_CONFIG_AMBULANCE } from '../../../provider/api.token';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import { AmbulanceDetails } from '../../../maps/ambulance-type';

@Injectable({
  providedIn: 'root',
})
export class AmbulanceApiService {
  /**
   *
   * @private
   */
  private _apiConfigEmergency = inject(API_CONFIG_AMBULANCE);
  /**
   *
   */
  private ambulanceIc = new BehaviorSubject<string>('');

  /**
   *
   */
  httpClient = inject(HttpClient);

  set ic(ambulanceIc: string) {
    this.ambulanceIc.next(ambulanceIc);
  }

  /**
   *
   */
  ambulanceResource = this.ambulanceIc.pipe(
    switchMap((data) =>
      this.httpClient.get<PaginatedBackendResponse<AmbulanceDetails>>(`${this._apiConfigEmergency.baseUrl}`, {
        params: {
          per_page: 1,
          page: 0,
          filter: `ic=${data}`,
        },
      })
    ),
    map(
      (data: PaginatedBackendResponse<AmbulanceDetails>) => data.message.data[0]
    )
  );
}
