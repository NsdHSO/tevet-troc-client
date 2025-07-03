import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG_AMBULANCE } from '../../../provider/api.token';
import { httpResource } from '@angular/common/http';
import { DataSourceMaterialTable } from 'ngx-liburg';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  AmbulanceDetails,
  AmbulanceType,
  ambulanceTypeDisplayNames,
  fuelTypeDisplayNames,
  FuelTypes
} from '@tevet-troc-client/models';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class EmergencyApiService {
  private payloadAmbulance = new Subject<Partial<AmbulanceDetails>>();

  /**
   *
   */
  hospitalId = signal('Hospital of the University of Pennsylvania');
  /**
   *
   */
  pageSize = signal(10);
  /**
   *
   */
  page = signal(0);

  /**
   * @private
   */
  private _router = inject(Router);

  /**
   *
   * @private
   */
  private _apiConfigEmergency = inject(API_CONFIG_AMBULANCE);

  httpAmbulanceResourceRes = httpResource(
    () => ({
      url: `${
        this._apiConfigEmergency.baseUrl
      }?filterBy=hospitalId=${this.hospitalId()}&page=${this.page()}&per_page=${this.pageSize()}`,
    }),
    {
      parse: (e: unknown) => {
        const backendResponse = e as PaginatedBackendResponse<AmbulanceDetails>;
        return {
          data: backendResponse.message.data.map(
            (item: AmbulanceDetails) =>
              ({
                actions: [
                  {
                    iconClass: 'fa_solid:pen-to-square',
                    classCss: 'edit',
                    method: (
                      row: DataSourceMaterialTable<AmbulanceDetails>
                    ) => {
                      this._router.navigate(
                        [{ outlets: { drawer: ['details_panel'] } }],
                        {
                          queryParams: { ambulance_ic: row.model.ambulance_ic },
                        }
                      );
                    },
                  },
                ],
                editable: false,
                model: {
                  ...item,
                  type: ambulanceTypeDisplayNames[item.type as AmbulanceType],
                  fuel_type: fuelTypeDisplayNames[item.fuel_type as FuelTypes],
                  driver_name: item.driver_name ?? 'Not set',
                },
              } as DataSourceMaterialTable<AmbulanceDetails>)
          ),
          length: backendResponse.message.pagination.total_items,
        };
      },
    }
  );
}
