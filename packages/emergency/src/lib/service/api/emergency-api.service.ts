import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG_AMBULANCE } from '../../provider/api.token';
import { HttpClient, httpResource } from '@angular/common/http';
import { DataSourceMaterialTable } from 'ngx-liburg';
import {
  AmbulanceDetails,
  AmbulanceType,
  ambulanceTypeDisplayNames,
  getAmbulanceTypeFromDisplay,
} from '../../maps/ambulance-type';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import { fuelTypeDisplayNames, FuelTypes } from '@tevet-troc-client/models';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EmergencyApiService {
  private payloadAmbulance = new Subject<Partial<AmbulanceDetails>>();

  /**
   *
   */
  httpClient = inject(HttpClient);

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
                    method: (
                      row: DataSourceMaterialTable<AmbulanceDetails>
                    ) => {
                      row.editable = !row.editable;
                      if (!row.editable) {
                      console.log(row.model.driver_name);
                        this.httpClient
                          .patch(
                            `${this.apiConfigEmergency.baseUrl}/${row.model.id}`,
                            {
                              ...row.model,
                              type: getAmbulanceTypeFromDisplay(row.model.type) || row.model.type as AmbulanceType
                            }
                          )
                          .subscribe();
                      }
                    },
                  },
                ],
                editable: false,
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
