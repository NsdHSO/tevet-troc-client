import { inject, Injectable, signal } from '@angular/core';
import {
  API_CONFIG_AMBULANCE,
  API_CONFIG_EMERGENCY,
} from '../../../provider/api.token';
import { HttpClient, HttpParams, httpResource } from '@angular/common/http';
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
import {
  BehaviorSubject,
  combineLatest,
  map,
  Observable,
  switchMap,
} from 'rxjs';
import { AuthTokenService } from '@tevet-troc-client/http-interceptor';
import { toObservable } from '@angular/core/rxjs-interop';

@Injectable({ providedIn: 'root' })
export class EmergencyApiService {

  /**
   * Injects the AuthTokenService to retrieve the current user's token.'
   */
  authToken = inject(AuthTokenService)

  /**
   * Injects Angular's HttpClient service for making HTTP requests.
   * @private
   */
  private _httpClient = inject(HttpClient);

  /**
   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _apiConfigAmbulance = inject(API_CONFIG_AMBULANCE);

  /**
   * Injects the API configuration for emergency-related endpoints.
   * @private
   */
  private _apiConfigEmergency = inject(API_CONFIG_EMERGENCY);

  /**
   * Injects the router service for navigation.
   * @private
   */
  private _router = inject(Router);

  // Signals for pagination
  hospitalId = signal('Hospital of the University of Pennsylvania');
  page = signal(0);
  pageSize = signal(10);

  pageEmergency = signal(0);
  pageSizeEmergency = signal(10);

  /**
   * BehaviorSubject to manage the selected emergency ID for details fetching.
   * @private
   */
  private emergencyId = new BehaviorSubject('');


  /**
   * A reactive stream that fetches paginated ambulance data from the backend,
   * triggered by changes to `hospitalId`, `page`, and `pageSize` signals.
   *
   * @returns An Observable that emits transformed ambulance data for a material table.
   */
  httpAmbulanceResponse$: Observable<{ data: DataSourceMaterialTable<AmbulanceDetails>[]; length: number; }> =
    combineLatest([
      toObservable(this.hospitalId),
      toObservable(this.page),
      toObservable(this.pageSize)
    ]).pipe(
      switchMap(() => {
        const url = `${this._apiConfigAmbulance.baseUrl}`;
        const params = new HttpParams()
          .set('filterBy', `hospitalId=${this.hospitalId()}`)
          .set('page', this.page())
          .set('per_page', this.pageSize());

        return this._httpClient.get<PaginatedBackendResponse<AmbulanceDetails>>(url, { params });
      }),
      map((backendResponse: PaginatedBackendResponse<AmbulanceDetails>) => ({
        data: backendResponse.message.data.map(
          (item: AmbulanceDetails) =>
            ({
              actions: [
                {
                  iconClass: 'fa_solid:pen-to-square',
                  classCss: 'edit',
                  method: (row: DataSourceMaterialTable<AmbulanceDetails>) => {
                    this._router.navigate(
                      [{ outlets: { drawer: ['details_panel'] } }],
                      { queryParams: { ambulance_ic: row.model.ambulance_ic } }
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
      }))
    );

  /**
   * A reactive stream that fetches paginated emergency data from the backend,
   * triggered by changes to `pageEmergency` and `pageSizeEmergency` signals.
   *
   * @returns An Observable that emits transformed emergency data for a material table.
   */
  httpEmergencyResponse$: Observable<{ data: DataSourceMaterialTable<Emergency>[]; length: number; }> =
    combineLatest([
      toObservable(this.pageEmergency),
      toObservable(this.pageSizeEmergency)
    ]).pipe(
      switchMap(() => {
        const url = `${this._apiConfigEmergency.baseUrl}`;
        const params = new HttpParams()
          .set('page', this.pageEmergency())
          .set('per_page', this.pageSizeEmergency());

        return this._httpClient.get<PaginatedBackendResponse<Emergency>>(url, { params });
      }),
      map((backendResponse: PaginatedBackendResponse<Emergency>) => ({
        data: backendResponse.message.data.map((item: Emergency) => ({
          actions: [
            {
              iconClass: 'fa_solid:pen-to-square',
              classCss: 'edit',
              method: (row: DataSourceMaterialTable<Emergency>) => {
                this._router.navigate(
                  [{ outlets: { drawer: ['details_panel'] } }],
                  { queryParams: { emergency_ic: row.model.emergency_ic } }
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
      }))
    );


  set emergencyIdValue(value: string) {
    this.emergencyId.next(value);
  }

  /**
   * A reactive stream that fetches details for a specific emergency based on `emergencyId`.
   * It transforms the backend response into a structured UI format.
   *
   * @returns An Observable that emits the formatted `EmergencyUi` data.
   */
  httpEmergencyIdResponse$ = this.emergencyId.pipe(
    switchMap((data) =>
      this._httpClient.get<PaginatedBackendResponse<Emergency>>(
        `${this._apiConfigEmergency.baseUrl}`,
        {
          params: {
            per_page: '1',
            page: '0',
            filter: `ic=${data}`,
          },
        }
      )
    ),
    map((data) => data.message.data[0]),
    map((data): EmergencyUi => {
      if (!data) {
        return { uiElements: [] };
      }

      return {
        status: emergencyStatusDisplayNames()[data.status] as any,
        uiElements: [
          [
            { title: 'Incident Overview', edit: false },
            { title: 'Incident ID', description: data.id, edit: false },
            { title: 'Status', description: emergencyStatusDisplayNames()[data.status] as any, edit: false },
            { title: 'Severity', description: data.severity, edit: false },
            { title: 'Incident Type', description: data.incident_type, edit: false },
            { title: 'Description', description: data.description, edit: false },
            { title: 'Emergency IC', description: data.emergency_ic.toString(), edit: false },
          ],
          [
            { title: 'Timeline & Reporting', edit: false },
            { title: 'Created At', description: new Date(data.created_at).toLocaleString(), edit: false },
            { title: 'Updated At', description: new Date(data.updated_at).toLocaleString(), edit: false },
            { title: 'Resolved At', description: data.resolved_at ? new Date(data.resolved_at).toLocaleString() : 'N/A', edit: false },
            { title: 'Reported By', description: data.reported_by, edit: false },
            { title: 'Modification Attempts', description: data.modification_attempts !== null ? data.modification_attempts.toString() : 'N/A', edit: false },
          ],
          [
            { title: 'Assigned Resources', edit: false },
            { title: 'Hospital ID', description: data.hospital_id || 'N/A', edit: false },
            { title: 'Ambulance ID', description: data.ambulance_id || 'N/A', edit: false },
          ],
          [
            { title: 'Location & Notes', edit: false },
            { title: 'Emergency Location', description: `${data.emergency_latitude}, ${data.emergency_longitude}`, edit: false },
            { title: 'Notes', description: data.notes || 'N/A', edit: false },
          ],
        ],
        id: data.id,
        emergency_ic: <number>(<unknown>data.emergency_ic),
        hospital_id: data.hospital_id || '',
      };
    })
  );
}
