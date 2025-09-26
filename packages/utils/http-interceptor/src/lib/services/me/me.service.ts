import { inject, Injectable, signal } from '@angular/core';
import { TEVET_API } from '../providers/api.token';
import { HttpClient } from '@angular/common/http';
import { Me } from '@tevet-troc-client/models';
import { BackendResponse } from '@tevet-troc-client/http-response';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class MeService {
  private tokenApi = inject(TEVET_API);
  private me = signal<Me | string>('');
  /**
   * HttpClient
   */
  private readonly _httpClient = inject(HttpClient);
  getMe$ = this._httpClient
    .get<BackendResponse<Me>>(`${this.tokenApi.baseUrl}/v1/me/profile`)
    .pipe(
      tap((value) => {
        this.meInfo = value.message;
      })
    );

  set meInfo(me: Me | string) {
    this.me.set(me);
  }
  get meInfo(): Me | string {
    return this.me();
  }
}
