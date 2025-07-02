import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, switchMap } from 'rxjs';
import { API_CONFIG_AMBULANCE } from '../../../provider/api.token';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  AmbulanceDetails,
  AmbulanceIdUi, ambulanceTypeDisplayNames,
  getAmbulanceTypeFromDisplay
} from '../../../maps/ambulance-type';

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
        status: data.status,
        uiElements: [
          // General Information Section
          [
            { title: 'General Information' }, // Section Title
            {
              title: 'Vehicle Number',
              description: data.vehicle_number,
            },
            {
              title: 'Type',
              description: ambulanceTypeDisplayNames[data.type],
            },
            {
              title: 'Make',
              description: data.make,
            },
            {
              title: 'Model',
              description: data.car_details_model,
            },
            {
              title: 'Capacity',
              description: `${data.capacity} passengers`,
            },
            {
              title: 'Fuel Type',
              description: data.fuel_type || 'N/A',
            },
            {
              title: 'Ambulance IC',
              description: data.ambulance_ic.toString(),
            },
            {
              title: 'Hospital ID',
              description: data.hospital_id,
            },
            {
              title: 'Created At',
              description: new Date(data.created_at).toLocaleString(),
            },
            {
              title: 'Updated At',
              description: new Date(data.updated_at).toLocaleString(),
            },
          ],
          // Driver & Service Section
          [
            { title: 'Driver & Service' }, // Section Title
            {
              title: 'Driver Name',
              description: data.driver_name || 'N/A',
            },
            {
              title: 'Driver License',
              description: data.driver_license || 'N/A',
            },
            {
              title: 'Mileage',
              description: `${data.mileage} km`,
            },
            {
              title: 'Last Service',
              description: data.last_service_date || 'N/A',
            },
            {
              title: 'Next Service',
              description: data.next_service_date || 'N/A',
            },
            {
              title: 'Registration Number',
              description: data.registration_number || 'N/A',
            },
            {
              title: 'Insurance Provider',
              description: data.insurance_provider || 'N/A',
            },
            {
              title: 'Insurance Expiry',
              description: data.insurance_expiry_date || 'N/A',
            },
          ],
          // Car Specifics Section
          [
            { title: 'Car Specifics' }, // Section Title
            {
              title: 'Car Year',
              description: data.car_details_year.toString(),
            },
            {
              title: 'Color',
              description: data.car_details_color,
            },
            {
              title: 'Is Ambulance',
              description: data.car_details_is_ambulance ? 'Yes' : 'No',
            },
            {
              title: 'License Plate',
              description: data.car_details_license_plate || 'N/A',
            },
            {
              title: 'Car Mileage',
              description: `${data.car_details_mileage} km`,
            },
          ],
          // Mission & Notes Section
          [
            { title: 'Mission & Notes' }, // Section Title
            {
              title: 'Mission',
              description: data.mission,
            },
            {
              title: 'Notes',
              description: data.notes,
            },
            {
              title: 'Passengers',
              description:
                data.passengers.length > 0
                  ? data.passengers.join(', ')
                  : 'None',
            },
            {
              title: 'Location (Lat/Lon)',
              description: `${data.location_latitude},${data.location_longitude}`,
            },
          ],
        ],
      };
    })
  );
}
