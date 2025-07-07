import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { API_CONFIG_AMBULANCE } from '../../../provider/api.token';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  AmbulanceDetails,
  AmbulanceIdUi, AmbulanceStatus,
  ambulanceStsDisplayNames,
  ambulanceTypeDisplayNames
} from '@tevet-troc-client/models';

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
  ambulanceResource: Observable<AmbulanceIdUi> = this.ambulanceIc.pipe(
    switchMap((data) =>
      this.httpClient.get<PaginatedBackendResponse<AmbulanceDetails>>(
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
    map(
      (data: PaginatedBackendResponse<AmbulanceDetails>) => data.message.data[0]
    ),
    map((data: AmbulanceDetails) => {
      if (!data) {
        return {
          uiElements: [],
          status: null,
        }; // Return an empty array if no data is found
      }
      return {
        status: ambulanceStsDisplayNames()[data.status] as AmbulanceStatus,
        uiElements: [
          // General Information Section
          [
            { title: 'General Information', edit: false }, // Already has edit: false
            {
              title: 'Vehicle Number',
              description: data.vehicle_number,
              edit: false // Added edit property
            },
            {
              title: 'Type',
              description: ambulanceTypeDisplayNames[data.type],
              edit: false // Added edit property
            },
            {
              title: 'Make',
              description: data.make,
              edit: false // Added edit property
            },
            {
              title: 'Model',
              description: data.car_details_model,
              edit: false // Added edit property
            },
            {
              title: 'Capacity',
              description: `${data.capacity} passengers`,
              edit: false // Added edit property
            },
            {
              title: 'Fuel Type',
              description: data.fuel_type || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Ambulance IC',
              description: data.ambulance_ic.toString(),
              edit: false // Added edit property
            },
            {
              title: 'Hospital ID',
              description: data.hospital_id,
              edit: false // Added edit property
            },
            {
              title: 'Created At',
              description: new Date(data.created_at).toLocaleString(),
              edit: false // Added edit property
            },
            {
              title: 'Updated At',
              description: new Date(data.updated_at).toLocaleString(),
              edit: false // Added edit property
            },
          ],
          // Driver & Service Section
          [
            { title: 'Driver & Service', edit: false }, // Already has edit: false
            {
              title: 'Driver Name',
              description: data.driver_name || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Driver License',
              description: data.driver_license || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Mileage',
              description: `${data.mileage} km`,
              edit: false // Added edit property
            },
            {
              title: 'Last Service',
              description: data.last_service_date || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Next Service',
              description: data.next_service_date || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Registration Number',
              description: data.registration_number || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Insurance Provider',
              description: data.insurance_provider || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Insurance Expiry',
              description: data.insurance_expiry_date || 'N/A',
              edit: false // Added edit property
            },
          ],
          // Car Specifics Section
          [
            { title: 'Car Specifics', edit: false }, // Already has edit: false
            {
              title: 'Car Year',
              description: data.car_details_year.toString(),
              edit: false // Added edit property
            },
            {
              title: 'Color',
              description: data.car_details_color,
              edit: false // Added edit property
            },
            {
              title: 'Is Ambulance',
              description: data.car_details_is_ambulance ? 'Yes' : 'No',
              edit: false // Added edit property
            },
            {
              title: 'License Plate',
              description: data.car_details_license_plate || 'N/A',
              edit: false // Added edit property
            },
            {
              title: 'Car Mileage',
              description: `${data.car_details_mileage} km`,
              edit: false // Added edit property
            },
          ],
          // Mission & Notes Section
          [
            { title: 'Mission & Notes', edit: false }, // Already has edit: false
            {
              title: 'Mission',
              description: data.mission,
              edit: false // Added edit property
            },
            {
              title: 'Notes',
              description: data.notes,
              edit: false // Added edit property
            },
            {
              title: 'Passengers',
              description:
                data.passengers.length > 0
                  ? data.passengers.join(', ')
                  : 'None',
              edit: false // Added edit property
            },
            {
              title: 'Location (Lat/Lon)',
              description: `${data.location_latitude},${data.location_longitude}`,
              edit: false // Added edit property
            },
          ],
        ],
      };
    })
  );
}
