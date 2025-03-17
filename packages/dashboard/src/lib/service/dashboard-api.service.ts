import { computed, inject, Injectable } from '@angular/core';
import { API_CONFIG_CARD } from '../provider/api.token';
import { HttpErrorResponse, httpResource } from '@angular/common/http';

@Injectable()
export class DashboardApiService {
  private apiConfigCard = inject(API_CONFIG_CARD);
  private httpResourceRes = httpResource<{
    message: { title: string; description: string }[];
  }>(() => ({
    url: this.apiConfigCard.baseUrl,
  }));

  // Consolidated response for template usage
  resp = computed(() => ({
    value: this.httpResourceRes.value()?.message.map((value) => ({
      ...value,
      title: value.title.toLowerCase(),
    })),
    loading: this.httpResourceRes.isLoading(),
    error: this.httpResourceRes.error() as HttpErrorResponse,
  }));
}
