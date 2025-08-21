import { HttpClient, httpResource } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import {
  BehaviorSubject,
  map,
  Observable,
  of,
  Subject,
  switchMap,
  tap,
} from 'rxjs';
import { API_CONFIG_AMBULANCE } from '../../../provider/api.token';
import {
  BackendResponse,
  PaginatedBackendResponse,
} from '@tevet-troc-client/http-response';
import {
  AmbulanceDetails,
  AmbulanceIdUi,
  AmbulanceStatus,
  AmbulanceStatusDao,
  ambulanceStsDisplayNames,
  ambulanceTypeDisplayNames,
} from '@tevet-troc-client/models';

@Injectable({
  providedIn: 'root',
})
export class AmbulanceApiService {
  /**
   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _apiConfigAmbulance = inject(API_CONFIG_AMBULANCE);
  /**
   * Injects the API configuration for ambulance-related endpoints.
   * @private
   */
  private _httpClient = inject(HttpClient);
  /**
   * A BehaviorSubject that holds the current ambulance identifier code (IC).
   * It initially emits an empty string.
   * This subject serves as a trigger for fetching ambulance details.
   */
  private ambulanceIc = new BehaviorSubject<string>('');

  /**
   * A Subject that emits payloads to trigger ambulance status updates.
   * This stream provides the necessary data for the `changeAmbulanceStatus` operation.
   *
   * @remarks
   * The `id`, `hospital_id`, and `ambulance_ic` are typed as `string | unknown`
   * or `number | unknown` because their exact type (e.g., `string` vs `Uuid`)
   * might be uncertain or they might be `null` in some initial states.
   * It's recommended to refine these types to be more specific if possible.
   *
   * @type {Subject<{ status: AmbulanceStatusDao; id: string | unknown; hospital_id: string | unknown; ambulance_ic: number | unknown; }>}
   */
  status$ = new Subject<{
    status: AmbulanceStatusDao;
    id: string | unknown;
    hospital_id: string | unknown;
    ambulance_ic: number | unknown;
  }>();
  /**
   *
   */
  httpClient = inject(HttpClient);

  set ic(ambulanceIc: string) {
    this.ambulanceIc.next(ambulanceIc);
  }

  /**
   * An RxJS Observable that fetches and transforms ambulance details
   * based on the `ambulanceIc` emitted by `this.ambulanceIc` BehaviorSubject.
   * It processes the raw backend data into a UI-friendly structure (`AmbulanceIdUi`).
   *
   * @remarks
   * - Listens for `ambulanceIc` changes from `this.ambulanceIc`.
   * - Uses `switchMap` to perform an HTTP GET request to retrieve ambulance details
   * filtered by the emitted `ic`. Any previous HTTP requests triggered by an older `ic`
   * will be cancelled if a new `ic` is emitted before completion.
   * - `map` (first): Extracts the first ambulance detail object from the
   * `PaginatedBackendResponse`'s `message.data` array.
   * - `map` (second): Transforms the `AmbulanceDetails` object into the
   * `AmbulanceIdUi` structure, categorizing information into UI sections
   * (General Information, Driver & Service, Car Specifics, Mission & Notes)
   * and mapping status/type codes to display names.
   * - Handles the case where no ambulance data is found (`!data`), returning a default
   * empty `AmbulanceIdUi` structure.
   *
   * @returns An `Observable<AmbulanceIdUi>` that emits the transformed UI data
   * for a specific ambulance based on its IC.
   */
  ambulanceResource: Observable<AmbulanceIdUi> = this.ambulanceIc.pipe(
    switchMap((data) =>
      this.httpClient.get<PaginatedBackendResponse<AmbulanceDetails>>(
        `${this._apiConfigAmbulance.baseUrl}`,
        {
          params: {
            per_page: 1,
            page: 0,
            filter: `ic=${data}`,
          },
        }
      )
    ),
    map(
      (data: PaginatedBackendResponse<AmbulanceDetails>) => data.message.data[0]
    ),
    map((data: AmbulanceDetails) => {
      if (!data) {
        return {
          uiElements: [],
          status: null,
        };
      }
      return {
        status: ambulanceStsDisplayNames()[data.status] as AmbulanceStatus,
        uiElements: [
          [
            {
              title: 'General Information',
              edit: false,
            },
            {
              title: 'Vehicle Number',
              description: data.vehicle_number,
              edit: false,
            },
            {
              title: 'Type',
              description: ambulanceTypeDisplayNames[data.type],
              edit: false,
            },
            {
              title: 'Make',
              description: data.make,
              edit: false,
            },
            {
              title: 'Model',
              description: data.car_details_model,
              edit: false,
            },
            {
              title: 'Capacity',
              description: `${data.capacity} passengers`,
              edit: false,
            },
            {
              title: 'Fuel Type',
              description: data.fuel_type || 'N/A',
              edit: false,
            },
            {
              title: 'Ambulance IC',
              description: data.ambulance_ic.toString(),
              edit: false,
            },
            {
              title: 'Hospital ID',
              description: data.hospital_id,
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
          ],

          [
            {
              title: 'Driver & Service',
              edit: false,
            },
            {
              title: 'Driver Name',
              description: data.driver_name || 'N/A',
              edit: false,
            },
            {
              title: 'Driver License',
              description: data.driver_license || 'N/A',
              edit: false,
            },
            {
              title: 'Mileage',
              description: `${data.mileage} km`,
              edit: false,
            },
            {
              title: 'Last Service',
              description: data.last_service_date || 'N/A',
              edit: false,
            },
            {
              title: 'Next Service',
              description: data.next_service_date || 'N/A',
              edit: false,
            },
            {
              title: 'Registration Number',
              description: data.registration_number || 'N/A',
              edit: false,
            },
            {
              title: 'Insurance Provider',
              description: data.insurance_provider || 'N/A',
              edit: false,
            },
            {
              title: 'Insurance Expiry',
              description: data.insurance_expiry_date || 'N/A',
              edit: false,
            },
          ],

          [
            {
              title: 'Car Specifics',
              edit: false,
            },
            {
              title: 'Car Year',
              description: data.car_details_year.toString(),
              edit: false,
            },
            {
              title: 'Color',
              description: data.car_details_color,
              edit: false,
            },
            {
              title: 'Is Ambulance',
              description: data.car_details_is_ambulance ? 'Yes' : 'No',
              edit: false,
            },
            {
              title: 'License Plate',
              description: data.car_details_license_plate || 'N/A',
              edit: false,
            },
            {
              title: 'Car Mileage',
              description: `${data.car_details_mileage} km`,
              edit: false,
            },
          ],
          [
            {
              title: 'Mission & Notes',
              edit: false,
            },
            {
              title: 'Mission',
              description: data.mission,
              edit: false,
            },
            {
              title: 'Notes',
              description: data.notes,
              edit: false,
            },
            {
              title: 'Passengers',
              description:
                data.passengers.length > 0
                  ? data.passengers.join(', ')
                  : 'None',
              edit: false,
            },
            {
              title: 'Location (Lat/Lon)',
              description: `${data.location_latitude},${data.location_longitude}`,
              edit: false,
            },
          ],
        ],
        id: data.id,
        ambulance_ic: data.ambulance_ic,
        hospital_id: data.hospital_id,
      };
    })
  );

  /**
   * An RxJS Observable that represents a resource for fetching all ambulance statuses.
   * This stream typically exposes the loading state, errors, and the fetched data.
   *
   * @remarks
   * This uses a custom `httpResource` helper which likely manages the HTTP request
   * lifecycle (e.g., loading indicators, error handling).
   *
   * @returns An `Observable` emitting `BackendResponse<AmbulanceStatusDao[]>`
   * when subscribed, providing the list of all ambulance statuses.
   */
  /**
   * Fetches all ambulance statuses from the backend.
   *
   * @returns An `Observable` emitting `BackendResponse<AmbulanceStatusDao[]>`
   * when subscribed, providing the list of all ambulance statuses.
   */
  getAmbulanceStatus= this._httpClient.get<BackendResponse<AmbulanceStatusDao[]>>(this._apiConfigAmbulance.baseUrl + '/status');
  /**
   * An RxJS Observable that triggers an ambulance status update API call
   * and updates a shared observable with the ambulance identifier code (IC) upon success.
   *
   * @remarks
   * - Listens for new `AmbulanceStatusUpdatePayload` values emitted by `this.status$`.
   * - Uses `switchMap` to cancel any ongoing PATCH requests if a new update
   * payload is received, preventing race conditions.
   * - Sends a PATCH request to `_apiConfigAmbulance.baseUrl/{ambulanceId}`
   * with the new status and hospital ID.
   * - After a successful PATCH, it pipes the `ambulance_ic` from the original payload
   * to the next operator.
   * - Uses `tap` to side-effect the `this.ambulanceIc` BehaviorSubject,
   * making the updated ambulance IC available to other parts of the application.
   *
   * @param value - The `AmbulanceStatusUpdatePayload` containing:
   * - `id`: The ID of the ambulance to update.
   * - `status.value`: The new status value (e.g., 'available', 'en_route').
   * - `hospital_id`: The ID of the hospital to associate the ambulance with.
   * - `ambulance_ic`: The ambulance's identifier code.
   *
   * @returns An `Observable<string>` that emits the `ambulance_ic` after the
   * status update is successfully processed. The actual backend response
   * from the PATCH request is discarded in favor of the `ambulance_ic`.
   * Errors in the HTTP request will propagate down this stream unless caught.
   */
  changeAmbulanceStatus = this.status$.pipe(
    switchMap((value) =>
      this.httpClient
        .patch(this._apiConfigAmbulance.baseUrl + '/' + `${value.id}`, {
          status: value.status.value,
          hospital_name: value.hospital_id,
        })
        .pipe(switchMap(() => of(value.ambulance_ic)))
    ),
    tap((ambulance_ic) => {
      this.ambulanceIc.next(ambulance_ic as string);
    })
  );
}
