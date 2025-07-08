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
  /**
   * A private Subject used to emit partial updates to ambulance details.
   * This can be used to trigger side effects or other reactive operations
   * based on specific ambulance detail changes within the component/service.
   *
   * @type {Subject<Partial<AmbulanceDetails>>}
   */
  private payloadAmbulance = new Subject<Partial<AmbulanceDetails>>();

  /**
   * A signal holding the ID of the hospital currently being filtered by.
   * This value is reactive and automatically updates the `httpAmbulanceResourceRes`
   * when changed.
   */
  hospitalId = signal('Hospital of the University of Pennsylvania');
  /**
   * A signal holding the current page size for pagination.
   * This value is reactive and automatically updates the `httpAmbulanceResourceRes`
   * when changed.
   */
  pageSize = signal(10);
  /**
   * A signal holding the current page number for pagination (0-indexed).
   * This value is reactive and automatically updates the `httpAmbulanceResourceRes`
   * when changed.
   */
  page = signal(0);

  /**
   * Injects Angular's Router service, primarily used for navigation.
   * @private
   */
  private _router = inject(Router);

  /**
   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _apiConfigEmergency = inject(API_CONFIG_AMBULANCE);

  /**
   * An httpResource that fetches paginated ambulance data from the backend,
   * filtered by `hospitalId`, `page`, and `pageSize` signals.
   *
   * @remarks
   * - The `url` factory dynamically constructs the API endpoint using
   * the reactive values from `hospitalId()`, `page()`, and `pageSize()`.
   * - The `parse` function transforms the raw `PaginatedBackendResponse<AmbulanceDetails>`
   * from the backend into a format suitable for a material table (`DataSourceMaterialTable`).
   * - For each `AmbulanceDetails` item:
   * - It adds an 'edit' action button. Clicking this button navigates to a
   * `details_panel` drawer route, passing the `ambulance_ic` as a query parameter.
   * - It maps `item.type` and `item.fuel_type` to their human-readable display names
   * using `ambulanceTypeDisplayNames` and `fuelTypeDisplayNames` respectively.
   * - It provides a default 'Not set' for `driver_name` if it's null/undefined.
   * - Extracts `data` (the array of transformed items) and `length` (total items for pagination)
   * from the parsed backend response.
   *
   * @returns A resource object (defined by `httpResource`) that, when triggered,
   * fetches and provides paginated ambulance data tailored for a UI table.
   */
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
