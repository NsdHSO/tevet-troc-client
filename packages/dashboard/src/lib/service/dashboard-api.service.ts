import { computed, inject, Injectable } from '@angular/core';
import { API_CONFIG_CARD } from '../provider/api.token';
import { HttpErrorResponse, httpResource } from '@angular/common/http';
import { CARD_COLOR } from '../maps/card-color';

@Injectable()
export class DashboardApiService {
  private apiConfigCard = inject(API_CONFIG_CARD);
  private httpResourceRes = httpResource<
    {
      title: string;
      content: string;
      icon: string;
      iconClass: string;
      routerLink: string;
    }[]
  >(
    () => ({
      url: this.apiConfigCard.baseUrl,
      params:{
        filter:'dashboard=Dashboard TjNxu',
        page:0
      }
    }),
    {
      parse: (e: any) =>
        e.message.data.map((message: any) => ({
          content: message.content,
          title: message.title.toLowerCase(),
          icon: message.icon,
          iconClass: CARD_COLOR[message.title],
          routerLink: message.title.replace(/ /g, '-').toLowerCase(),
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
