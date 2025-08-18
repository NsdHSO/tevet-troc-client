import { inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { AuthTokenService } from '../token/auth-token.service';
import { TEVET_API_AUTH } from '../providers/api.token';

/**
 * Initialize app by attempting to refresh access token using refresh cookie.
 * On success, store access token in memory so the auth interceptor can attach it.
 * On failure (401), let the error interceptor redirect, but also resolve to allow bootstrap.
 */
export function initAppPromise() {
  const tokenAuthAPI = inject(TEVET_API_AUTH);

  const http = inject(HttpClient);
  const tokenSvc = inject(AuthTokenService);
  debugger
  return firstValueFrom(
    http
      .post<any>(
        `${tokenAuthAPI.baseUrl}/v1/auth/refresh`,
        {},
        { withCredentials: true }
      )
      .pipe(
        tap((resp) => {
          // Try common shapes: {accessToken}, {token}, {message:{accessToken}}
          const accessToken =
            resp?.access_token ??
            resp?.token ??
            resp?.message?.access_token ??
            null;
          if (accessToken) {
            tokenSvc.setToken(accessToken);
          }
        }),
        catchError(() => {
          // Do not block bootstrap; error interceptor will handle redirect if needed
          tokenSvc.clear();
          return of(null);
        })
      )
  );
}
