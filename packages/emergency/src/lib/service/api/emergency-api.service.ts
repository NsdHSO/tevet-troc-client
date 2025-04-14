import { inject, Injectable, signal } from '@angular/core';
import { API_CONFIG_AMBULANCE } from '../../provider/api.token';
import { httpResource } from '@angular/common/http';
import { DataSourceMaterialTable } from 'ngx-liburg';

@Injectable({
  providedIn: 'root',
})
export class EmergencyApiService {
  /**
   *
   */
  hospitalId = signal('Hospital of the University of Pennsylvania');
  /**
   *
   */
  pageSize = signal(10);
  /**
   *
   */
  page = signal(1);
  /**
   *
   * @private
   */
  private apiConfigEmergency = inject(API_CONFIG_AMBULANCE);

  httpResourceRes = httpResource(
    () =>
      `${
        this.apiConfigEmergency.baseUrl
      }?filterBy=hospitalId=${this.hospitalId()},page=${this.page()},pageSize=${this.pageSize()}`,
    {
      parse: (e: any) => ({
        data: e.message.data.map(
          (item: any) =>
            ({
              actions: [
                {
                  iconClass: 'fa_solid:d',
                  classCss: 'edit',
                  method: (row: any) => console.log(row),
                },
              ],
              editable: true,
              model: {
                ...item,
              },
            } as DataSourceMaterialTable<any>)
        ),
        length: e.message.length,
      }),
    }
  );
}
