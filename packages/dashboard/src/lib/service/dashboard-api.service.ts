import { inject, Inject, Injectable } from '@angular/core';
import { API_CONFIG_CARD, API_CONFIG_DASHBOARD } from '../provider/api.token';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DashboardApiService {
    private apiConfigDashboard = Inject(API_CONFIG_DASHBOARD)
    private apiConfigCard = Inject(API_CONFIG_CARD)
  private _httpClient = inject(HttpClient);
  getAllCards$= this._httpClient.get(this.apiConfigCard).pipe(tap(console.log))as any
}
