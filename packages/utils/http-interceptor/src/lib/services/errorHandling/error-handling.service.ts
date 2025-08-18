import { inject, Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpErrorResponse,
} from '@angular/common/http';
import { catchError, NEVER, Observable, throwError } from 'rxjs';
import { TEVET_API_AUTH_CLIENT } from '../providers/api.token';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService implements HttpInterceptor {
  private  tokenAuthClient = inject(TEVET_API_AUTH_CLIENT)
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: HttpErrorResponse) => {
        debugger
        // Allow the app initializer to handle refresh failures without redirect loops
        if (err.status === 401 && (err.url || '').includes('/v1/auth/refresh')) {
          return throwError(() => err);
        }

        if (err.status === 403) {
          return NEVER;
        }

        if (err.status === 401) {
          const nextUrl = encodeURIComponent(window.location.href);
          const encoded = btoa(nextUrl);
          window.location.href = `${this.tokenAuthClient.baseUrl}/login?next=${encoded}&client=hospital`;
          return NEVER;
        }
        return throwError(() => err.error ?? err);
      })
    );
  }
}
