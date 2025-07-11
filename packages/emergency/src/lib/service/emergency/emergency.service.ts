import { computed, inject, Injectable } from '@angular/core';
import { EmergencyApiService } from '../api/emergency-api/emergency-api.service';
import { DataSourceMaterialTable } from 'ngx-liburg';

@Injectable()
export class EmergencyService {
  /**
   *
   * @private
   */
  private readonly _ambulanceApi = inject(EmergencyApiService);
  /**
   *
   */
  pageSize = this._ambulanceApi.pageSize;

  changePageSize(event: any) {
    this._ambulanceApi.pageSize.set(event.pageSize);
    this._ambulanceApi.page.set(++event.pageIndex);
  }

  /**
   *
   */
  page = this._ambulanceApi.page;

  /**
   * Computed value for resource
   */
  dataSourceForTable = computed(() => {
    const dataSource = [];
    dataSource.push({
      value: this._ambulanceApi.httpAmbulanceResourceRes as any,
      rows: [
        {
          className: 'ambulance-id',
          field: 'ambulance_ic',
          name: 'Ambulance ID',
        },
        {
          className: 'fuell-type',
          field: 'fuel_type',
          name: 'Fuell Type',
        },
        {
          className: 'ambulance-type',
          field: 'type',
          name: 'Type of Ambulance',
        },
        {
          className: 'action2',
          field: 'ambulanceIc',
          name: 'Edit Ambulance IC ',
        },
      ],
    });
    dataSource.push({
      value: this._ambulanceApi.httpEmergencyResourceRes as any,
      rows: [
        {
          className: 'emergency-ic',
          field: 'emergency_ic',
          name: 'Edit Emergency IC',
        },
        {
          className: 'action3',
          field: 'id',
          name: 'Action',
        },
      ],
    })
    return dataSource;
  }) as any;
}
