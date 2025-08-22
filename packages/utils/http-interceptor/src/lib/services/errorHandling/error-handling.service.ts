import { inject, Injectable } from '@angular/core';
import {
  HttpClient,
  HttpContextToken,
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
} from '@angular/common/http';
import { catchError, NEVER, Observable, switchMap, throwError } from 'rxjs';
import {
  TEVET_API,
  TEVET_API_AUTH,
  TEVET_API_AUTH_CLIENT,
} from '../providers/api.token';
import { AuthTokenService } from '../token/auth-token.service';
import { tap } from 'rxjs/operators';
import { BackendResponse } from '@tevet-troc-client/http-response';

// Single, shared context token to mark a retried request (avoids custom headers and CORS preflight)
export const RETRIED = new HttpContextToken<boolean>(() => false);

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

        // Normalize req.url to handle both absolute and relative URLs
        const normalize = (u: string) => {
          try {
            return new URL(u).href;
          } catch {
            try {
              return new URL(u, baseApi).href;
            } catch {
              return u;
            }
          }
        };

        const normalizedReqUrl = normalize(req.url || '');
        const isOurApiRequest =
          normalizedReqUrl.startsWith(base) || normalizedReqUrl.startsWith(baseApi);

        const refreshUrl = `${base}/v1/auth/refresh`;
        const isRefreshCall = normalizedReqUrl.startsWith(refreshUrl);

        const alreadyRetried = req.context.get(RETRIED);
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

        // If the request was already retried and still returns 401, redirect to login
        if (err.status === 401 && isOurApiRequest && alreadyRetried) {
          return redirectToLogin();
        }

        if (err.status === 401 && isOurApiRequest && !alreadyRetried) {
          return this.http
            .post<BackendResponse<{ access_token: string }>>(
              refreshUrl,
              {},
              { withCredentials: true }
            )
            .pipe(
              tap((resp) => {
                const accessToken =
                  resp?.message?.access_token ?? null;
                if (accessToken) this.tokenSvc.setToken(accessToken);
              }),
              switchMap(() => {
                const token = this.tokenSvc.accessToken;
                const authReq = token
                  ? req.clone({
                      context: req.context.set(RETRIED, true),
                      setHeaders: { Authorization: `Bearer ${token}` },
                    })
                  : req.clone({ context: req.context.set(RETRIED, true) });
                return next.handle(authReq);
              }),
              // Only redirect if the retried request still returns 401
              catchError((e) =>
                e?.status === 401 ? redirectToLogin() : throwError(() => e)
              )
            );
        }
        return throwError(() => err.error ?? err);
      })
    );
  }
}
