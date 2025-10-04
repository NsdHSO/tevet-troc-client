import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, finalize, tap } from 'rxjs/operators';
import { LoadingService } from '../services/loading.service';
import { throwError } from 'rxjs';

/**
 * HTTP interceptor that automatically manages loading state for all HTTP requests.
 *
 * This interceptor increments the loading counter when an HTTP request starts
 * and decrements it when the request completes (success or error). It integrates
 * seamlessly with {@link LoadingService} to provide automatic loading indicators.
 *
 * @example
 * Register in your app configuration:
 * ```typescript
 * // app.config.ts
 * import { ApplicationConfig } from '@angular/core';
 * import { provideHttpClient, withInterceptors } from '@angular/common/http';
 * import { loadingInterceptor } from '@tevet-troc-client/loading-spinner';
 *
 * export const appConfig: ApplicationConfig = {
 *   providers: [
 *     provideHttpClient(withInterceptors([loadingInterceptor])),
 *   ],
 * };
 * ```
 *
 * @example
 * Once registered, all HTTP requests automatically trigger loading state:
 * ```typescript
 * @Component({
 *   selector: 'app-data',
 *   template: `<button (click)="load()">Load Data</button>`
 * })
 * export class DataComponent {
 *   private http = inject(HttpClient);
 *
 *   load() {
 *     // Loading spinner shows automatically
 *     this.http.get('/api/data').subscribe(data => {
 *       console.log(data);
 *       // Loading spinner hides automatically
 *     });
 *   }
 * }
 * ```
 *
 * @param req - The outgoing HTTP request
 * @param next - The next handler in the interceptor chain
 * @returns Observable of the HTTP event, with loading state management
 *
 * @remarks
 * - Uses RxJS `finalize` operator to ensure loading state is cleared even on errors
 * - Handles multiple concurrent requests gracefully via counter-based approach
 * - Works with all HTTP methods (GET, POST, PUT, DELETE, etc.)
 * - Loading state persists until ALL concurrent requests complete
 *
 * @see {@link LoadingService} for the underlying state management
 * @see {@link LoadingSpinnerComponent} for the UI component
 *
 * @public
 */
export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  const loadingService = inject(LoadingService);

  loadingService.show();

  return next(req).pipe(
    catchError((error) => {
      loadingService.hide();
      return throwError(() => error);
    }),
    finalize(() => {
      // Also hide on success (this won't run if catchError already hid it,
      // but we check the counter so it's safe to call multiple times)
      loadingService.hide();
    })
  );
};
