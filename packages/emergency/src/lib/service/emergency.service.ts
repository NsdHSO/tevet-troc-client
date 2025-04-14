import { computed, inject, Injectable, signal } from '@angular/core';
import { EmergencyApiService } from './api/emergency-api.service';
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
  pageSize = this._ambulanceApi.pageSize
  /**
   *
   */
  page = this._ambulanceApi.page;
  /**
   * Computed value for resource
   */
  dataSourceForTable = computed(() => {
    const dataSource: DataSourceMaterialTable<any>[] = [];
    console.log(this._ambulanceApi.httpResourceRes.value());
    dataSource.push(this._ambulanceApi.httpResourceRes as any);

    return dataSource;
  }) as any;
}
