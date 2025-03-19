import { computed, inject, Injectable } from '@angular/core';
import { API_CONFIG_CARD } from '../provider/api.token';
import { HttpErrorResponse, httpResource } from '@angular/common/http';

@Injectable()
export class DashboardApiService {
  private apiConfigCard = inject(API_CONFIG_CARD);
  private httpResourceRes = httpResource<
    { title: string; content: string; icon: string }[]
  >(
    () => ({
      url: this.apiConfigCard.baseUrl,
    }),
    {
      parse: (e: any) =>
        e.message.map((message: any) => ({
          content: message.content,
          title: message.title.toLowerCase(),
          icon: 'fa_solid:d',
        })),
    }
  );

  // Consolidated response for template usage
  resp = computed(() => ({
    value: this.httpResourceRes.value(),
    loading: this.httpResourceRes.isLoading(),
    error: this.httpResourceRes.error() as HttpErrorResponse,
  }));
}
