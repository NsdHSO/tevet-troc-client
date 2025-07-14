import { computed, inject, Injectable, Signal, WritableSignal } from '@angular/core';
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

  changePageSize(event: any, pageIndex: WritableSignal<any>, pageSize: WritableSignal<any>): void {
      pageSize.set(event.pageSize);
      pageIndex.set(event.pageIndex);

    console.log(event);
  }

  /**
   *
   */
  page = this._ambulanceApi.page;

  /**
   * Computed value for resource
   */
  private readonly ambulanceRows = [
    { className: 'ambulance-id', field: 'ambulance_ic', name: 'Ambulance ID' },
    { className: 'fuell-type', field: 'fuel_type', name: 'Fuell Type' },
    { className: 'ambulance-type', field: 'type', name: 'Type of Ambulance' },
    { className: 'action2', field: 'ambulanceIc', name: 'Edit Ambulance IC ' },
  ];

  private readonly emergencyRows = [
    { className: 'emergency-ic', field: 'emergency_ic', name: 'Edit Emergency IC' },
    { className: 'action2', field: 'reported_by', name: 'Action' },
  ];

  dataSourceForTable = [
    {
      value: this._ambulanceApi.httpAmbulanceResourceRes as any,
      pageIndex: this.page,
      pageSize: this.pageSize,
      rows: this.ambulanceRows,
    },
    {
      value: this._ambulanceApi.httpEmergencyResourceRes as any,
      pageIndex: this._ambulanceApi.pageEmergency,
      pageSize: this._ambulanceApi.pageSizeEmergency,
      rows: this.emergencyRows,
    }
  ]
}
