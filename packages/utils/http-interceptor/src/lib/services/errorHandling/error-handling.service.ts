import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpResponse,
} from '@angular/common/http';
import { catchError, NEVER, Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ErrorHandlingService implements HttpInterceptor {
  public intercept(
    req: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next
      .handle(req)
      .pipe(
        catchError((err: HttpResponse<unknown>) => this.errorIntercept(err))
      );
  }

  /**
   * Handle error
   * @returns
   * @param httpResponse
   * @private
   */
  private errorIntercept(httpResponse: HttpResponse<unknown>) {
    const { error } = httpResponse as any;

    if (httpResponse['status'] === 403) {
      return NEVER;
    }

    if (httpResponse['status'] === 401) {
      const next = encodeURIComponent(window.location.href);
      const encoded = btoa(next);
      window.location.href = `http://localhost:4300/login?next=${encoded}&client=hospital`;
      return NEVER;
    }
    return throwError(error);
  }
}
