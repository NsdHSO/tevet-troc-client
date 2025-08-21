import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest
} from '@angular/common/http';
import { catchError, NEVER, Observable, switchMap, throwError } from 'rxjs';
import {
  TEVET_API,
  TEVET_API_AUTH,
  TEVET_API_AUTH_CLIENT,
} from '../providers/api.token';
import { AuthTokenService } from '../token/auth-token.service';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService implements HttpInterceptor {
  private tokenAuthClient = inject(TEVET_API_AUTH_CLIENT);
  private tokenAuthApi = inject(TEVET_API_AUTH);
  private tokenApi = inject(TEVET_API);
  private http = inject(HttpClient);
  private tokenSvc = inject(AuthTokenService);
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        const base = this.tokenAuthApi.baseUrl as string;
        const baseApi = this.tokenApi.baseUrl as string;
        const reqUrl = req.url || '';
        const isOurApiRequest = reqUrl.startsWith(base) || reqUrl.startsWith(baseApi);
        const errUrl = err.url || '';
        const isRefreshCall =
          errUrl.startsWith(base) && errUrl.includes('/v1/auth/refresh');
        const alreadyRetried = !!req.headers.get('X-Retry');

        const redirectToLogin = () => {
          const nextUrl = encodeURIComponent(window.location.href);
          const encoded = btoa(nextUrl);
          window.location.href = `${this.tokenAuthClient.baseUrl}/login?next=${encoded}&client=hospital`;
          return NEVER;
        };

        if (err.status === 401 && isRefreshCall) {
          return redirectToLogin();
        }

        if (err.status === 403) {
          return NEVER;
        }

        if (err.status === 401 && isOurApiRequest && !alreadyRetried) {
          return this.http
            .post<any>(`${base}/v1/auth/refresh`, {}, { withCredentials: true })
            .pipe(
              tap((resp) => {
                const accessToken =
                  resp?.access_token ??
                  resp?.token ??
                  resp?.message?.access_token ??
                  null;
                if (accessToken) this.tokenSvc.setToken(accessToken);
              }),
              switchMap(() => {
                const token = this.tokenSvc.accessToken;
                const authReq = req.clone({
                  setHeaders: token
                    ? { Authorization: `Bearer ${token}`, 'X-Retry': '1' }
                    : { 'X-Retry': '1' },
                });
                return next.handle(authReq);
              }),
              catchError(() => redirectToLogin())
            );
        }
        return throwError(() => err.error ?? err);
      })
    );
  }
}
