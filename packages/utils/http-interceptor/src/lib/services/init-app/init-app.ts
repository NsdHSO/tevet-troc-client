import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, tap } from 'rxjs';

export function initAppPromise() {
  const http = inject(HttpClient);
  return firstValueFrom(
    http
      .post(
        'http://127.0.0.1:4100/v1/auth/refresh',
        {},
        { withCredentials: true }
      )
      .pipe(tap((token) => console.log(token)))
  );
}
