import { computed, inject, Injectable } from '@angular/core';
import { EmergencyApiService } from '../api/emergency-api/emergency-api.service';
import { DataSourceMaterialTable } from 'ngx-liburg';
import { toSignal } from '@angular/core/rxjs-interop';

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
    const dataSource: DataSourceMaterialTable<any>[] = [];
    dataSource.push(this._ambulanceApi.httpAmbulanceResourceRes as any);

    return dataSource;
  }) as any;
}
