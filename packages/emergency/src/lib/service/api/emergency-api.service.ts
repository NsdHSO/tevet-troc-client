import { computed, inject, Injectable, signal } from '@angular/core';
import { API_CONFIG_AMBULANCE } from '../../provider/api.token';
import { httpResource } from '@angular/common/http';
import { DataSourceMaterialTable } from 'ngx-liburg';
import {
  AmbulanceDetails,
  AmbulanceType,
  ambulanceTypeDisplayNames,
} from '../../maps/ambulance-type';
import { PaginatedBackendResponse } from '../../../../../utils/http-response/src/lib/models';
import { fuelTypeDisplayNames, FuelTypes } from '@tevet-troc-client/models';

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
   */
  pageSize = signal(10);
  /**
   *
   */
  page = signal(0);

  /**
   *
   * @private
   */
  private apiConfigEmergency = inject(API_CONFIG_AMBULANCE);

  httpResourceRes = httpResource(
    () => ({
      url: `${
        this.apiConfigEmergency.baseUrl
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
                    method: (row: DataSourceMaterialTable<AmbulanceDetails>) =>
                      console.log(row.model),
                  },
                ],
                editable: true,
                model: {
                  ...item,
                  // Ensure type lookup is correct:
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
