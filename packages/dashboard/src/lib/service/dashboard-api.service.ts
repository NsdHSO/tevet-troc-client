import { inject, Inject, Injectable } from '@angular/core';
import { API_CONFIG_CARD, API_CONFIG_DASHBOARD } from '../provider/api.token';
import { HttpClient } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

@Injectable()
export class DashboardApiService {
  private _httpClient = inject(HttpClient);
  private apiConfigDashboard = inject(API_CONFIG_DASHBOARD);
  private apiConfigCard = inject(API_CONFIG_CARD);
  getAllCards$= this._httpClient.get<any>(this.apiConfigCard.baseUrl).pipe(tap(console.log))
}
