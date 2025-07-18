import { inject, Injectable, signal } from '@angular/core';
import {
  API_CONFIG_AMBULANCE,
  API_CONFIG_EMERGENCY,
} from '../../../provider/api.token';
import { HttpClient, httpResource } from '@angular/common/http';
import { DataSourceMaterialTable } from 'ngx-liburg';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  AmbulanceDetails,
  AmbulanceType,
  ambulanceTypeDisplayNames,
  Emergency,
  emergencyStatusDisplayNames,
  EmergencyUi,
  fuelTypeDisplayNames,
  FuelTypes,
} from '@tevet-troc-client/models';
import { Router } from '@angular/router';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class EmergencyApiService {
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
   * Injects Angular's HttpClient service, primarily used for navigation.
   * @private
   */
  private _httpClient = inject(HttpClient);

  /**
   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _apiConfigAmbulance = inject(API_CONFIG_AMBULANCE);
  /**

   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _apiConfigEmergency = inject(API_CONFIG_EMERGENCY);
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
        this._apiConfigAmbulance.baseUrl
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

  /**
   *
   */
  httpEmergencyResourceRes = httpResource(
    () => ({
      url: `${
        this._apiConfigEmergency.baseUrl
      }?page=${this.pageEmergency()}&per_page=${this.pageSizeEmergency()}`,
    }),
    {
      parse: (e: unknown) => {
        const backendResponse = e as PaginatedBackendResponse<Emergency>;
        return {
          data: backendResponse.message.data.map((item: Emergency) => ({
            actions: [
              {
                iconClass: 'fa_solid:pen-to-square',
                classCss: 'edit',
                method: (row: DataSourceMaterialTable<Emergency>) => {
                  this._router.navigate(
                    [{ outlets: { drawer: ['details_panel'] } }],
                    {
                      queryParams: { emergency_ic: row.model.emergency_ic },
                    }
                  );
                },
              },
            ],
            editable: false,
            model: {
              ...item,
            },
          })),
          length: backendResponse.message.pagination.total_items,
        };
      },
    }
  );
  pageEmergency = signal(0);
  pageSizeEmergency = signal(10);
  /**
   *
   * @private
   */
  private emergencyId = new BehaviorSubject('');

  set emergencyIdValue(value: string) {
    this.emergencyId.next(value);
  }

  httpEmergencyIdResponse = this.emergencyId.pipe(
    switchMap(
      (data): Observable<PaginatedBackendResponse<Emergency>> =>
        this._httpClient.get<PaginatedBackendResponse<Emergency>>(
          `${this._apiConfigEmergency.baseUrl}`,
          {
            params: {
              per_page: 1,
              page: 0,
              filter: `ic=${data}`,
            },
          }
        )
    ),
    map((data) => data.message.data[0]),
    map((data): EmergencyUi => {
      // Assuming 'data' will be of the IncidentDetails type
      if (!data) {
        return {
          uiElements: []
        };
      }

      return {
        status: emergencyStatusDisplayNames()[data.status] as any,
        uiElements: [
          [
            {
              title: 'Incident Overview',
              edit: false,
            },
            {
              title: 'Incident ID',
              description: data.id,
              edit: false,
            },
            {
              title: 'Status',
              description: emergencyStatusDisplayNames()[data.status] as any,
              edit: false,
            },
            {
              title: 'Severity',
              description: data.severity,
              edit: false,
            },
            {
              title: 'Incident Type',
              description: data.incident_type,
              edit: false,
            },
            {
              title: 'Description',
              description: data.description,
              edit: false,
            },
            {
              title: 'Emergency IC',
              description: data.emergency_ic.toString(),
              edit: false,
            },
          ],
          [
            {
              title: 'Timeline & Reporting',
              edit: false,
            },
            {
              title: 'Created At',
              description: new Date(data.created_at).toLocaleString(),
              edit: false,
            },
            {
              title: 'Updated At',
              description: new Date(data.updated_at).toLocaleString(),
              edit: false,
            },
            {
              title: 'Resolved At',
              description: data.resolved_at
                ? new Date(data.resolved_at).toLocaleString()
                : 'N/A',
              edit: false,
            },
            {
              title: 'Reported By',
              description: data.reported_by,
              edit: false,
            },
            {
              title: 'Modification Attempts',
              description:
                data.modification_attempts !== null
                  ? data.modification_attempts.toString()
                  : 'N/A',
              edit: false,
            },
          ],
          [
            {
              title: 'Assigned Resources',
              edit: false,
            },
            {
              title: 'Hospital ID',
              description: data.hospital_id || 'N/A',
              edit: false,
            },
            {
              title: 'Ambulance ID',
              description: data.ambulance_id || 'N/A',
              edit: false,
            },
          ],
          [
            {
              title: 'Location & Notes',
              edit: false,
            },
            {
              title: 'Emergency Location',
              description: `${data.emergency_latitude}, ${data.emergency_longitude}`,
              edit: false,
            },
            {
              title: 'Notes',
              description: data.notes || 'N/A',
              edit: false,
            },
          ],
        ],
        id: data.id,
        emergency_ic: <number>(<unknown>data.emergency_ic),
        hospital_id: data.hospital_id || '',
      };
    })
  );
}
