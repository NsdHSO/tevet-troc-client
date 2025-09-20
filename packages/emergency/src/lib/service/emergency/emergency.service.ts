import { inject, Injectable, WritableSignal } from '@angular/core';
import { EmergencyApiService } from '../api/emergency-api/emergency-api.service';
import { DataSourceMaterialTable } from 'ngx-liburg';
import { Observable } from 'rxjs';
import {
  AmbulanceDetails,
  Emergency,
  PermissionCode,
} from '@tevet-troc-client/models';
import { PermissionDirective } from '@tevet-troc-client/permission';

type WrapperDataSource = {
  value: Observable<any>;
  pageIndex: WritableSignal<any>;
  pageSize: WritableSignal<any>;
  rows: {
    className: string;
    field: string;
    name: string;
  }[];
};

@Injectable()
export class EmergencyService {
  /**
   * Injects the PermissionDirective to check permissions.
   */
  readonly permissionDirective = inject(PermissionDirective);

  get permissionCode() {
    return PermissionCode.EMERGENCY_CREATE;
  }
  /**
   *
   * @private
   */
  private readonly _ambulanceApi = inject(EmergencyApiService);
  /**
   *
   */
  pageSize = this._ambulanceApi.pageSize;
  emergencyIdResponse = this._ambulanceApi.httpEmergencyIdResponse$;

  set emergencyIc(v: string) {
    this._ambulanceApi.emergencyIdValue = v;
  }

  changePageSize(
    event: any,
    pageIndex: WritableSignal<any>,
    pageSize: WritableSignal<any>
  ): void {
    pageSize.set(event.pageSize);
    pageIndex.set(event.pageIndex);
  }

  /**
   *
   */
  page = this._ambulanceApi.page;

  /**
   * Computed value for resource
   */
  private readonly ambulanceRows = [
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
  ];

  private readonly emergencyRows = [
    {
      className: 'emergency-ic',
      field: 'emergency_ic',
      name: 'Edit Emergency IC',
    },
    {
      className: 'action2',
      field: 'reported_by',
      name: 'Action',
    },
  ];

  dataSourceForTable: WrapperDataSource[] = [
    {
      value: this._ambulanceApi.httpAmbulanceResponse$ as Observable<{
        data: DataSourceMaterialTable<AmbulanceDetails>[];
        length: number;
      }>,
      pageIndex: this.page,
      pageSize: this.pageSize,
      rows: this.ambulanceRows,
    },
    {
      value: this._ambulanceApi.httpEmergencyResponse$ as Observable<{
        data: DataSourceMaterialTable<Emergency>[];
        length: number;
      }>,
      pageIndex: this._ambulanceApi.pageEmergency,
      pageSize: this._ambulanceApi.pageSizeEmergency,
      rows: this.emergencyRows,
    },
  ];
}
