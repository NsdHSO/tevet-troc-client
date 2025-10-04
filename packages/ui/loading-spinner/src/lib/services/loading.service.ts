import { Injectable, signal } from '@angular/core';

/**
 * Service for managing global loading states in Angular applications.
 *
 * This service uses a counter-based approach to track multiple concurrent loading operations.
 * It maintains a signal that increments when operations start and decrements when they complete.
 * This allows graceful handling of multiple simultaneous HTTP requests or async operations.
 *
 * @example
 * ```typescript
 * import { Component, inject } from '@angular/core';
 * import { LoadingService } from '@tevet-troc-client/loading-spinner';
 *
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     @if (loadingService.isLoadingActive()) {
 *       <p>Loading...</p>
 *     }
 *   `
 * })
 * export class ExampleComponent {
 *   loadingService = inject(LoadingService);
 *
 *   async loadData() {
 *     this.loadingService.show();
 *     try {
 *       await this.fetchData();
 *     } finally {
 *       this.loadingService.hide();
 *     }
 *   }
 * }
 * ```
 *
 * @remarks
 * - This service is provided at the root level, so all components share the same loading state
 * - For automatic HTTP request tracking, use with the `loadingInterceptor`
 * - For independent loading states, use `LoadingSpinnerComponent` with manual control
 *
 * @see {@link LoadingSpinnerComponent} for the UI component
 * @see {@link loadingInterceptor} for automatic HTTP tracking
 */
@Injectable({ providedIn: 'root' })
export class LoadingService {
  /**
   * Internal signal tracking the count of active loading operations.
   * @private
   */
  private loadingCount = signal(0);

  /**
   * Readonly signal exposing the current count of active loading operations.
   *
   * @example
   * ```typescript
   * const count = loadingService.isLoading();
   * console.log(`Active operations: ${count}`);
   * ```
   *
   * @returns Signal<number> - The number of active loading operations
   */
  isLoading = this.loadingCount.asReadonly();

  /**
   * Increments the loading counter by 1.
   * Call this method when a loading operation starts.
   *
   * @example
   * ```typescript
   * // Manual usage
   * loadingService.show();
   * await performOperation();
   * loadingService.hide();
   *
   * // With RxJS
   * this.http.get('/api/data')
   *   .pipe(
   *     tap(() => loadingService.show()),
   *     finalize(() => loadingService.hide())
   *   )
   *   .subscribe();
   * ```
   *
   * @remarks
   * Always pair this method with `hide()` to ensure proper cleanup.
   * Use try/finally blocks or RxJS finalize operator to guarantee hiding.
   */
  show() {
    this.loadingCount.update(count => count + 1);
  }

  /**
   * Decrements the loading counter by 1, with a minimum value of 0.
   * Call this method when a loading operation completes (success or error).
   *
   * @example
   * ```typescript
   * loadingService.show();
   * try {
   *   await performOperation();
   * } catch (error) {
   *   console.error(error);
   * } finally {
   *   loadingService.hide(); // Always called, even on error
   * }
   * ```
   *
   * @remarks
   * The counter will never go below 0, even if `hide()` is called more times than `show()`.
   */
  hide() {
    this.loadingCount.update(count => Math.max(0, count - 1));
  }

  /**
   * Checks if any loading operations are currently active.
   *
   * @returns `true` if the loading count is greater than 0, otherwise `false`
   *
   * @example
   * ```typescript
   * if (loadingService.isLoadingActive()) {
   *   console.log('Loading in progress...');
   * }
   *
   * // In template
   * @if (loadingService.isLoadingActive()) {
   *   <p>Please wait...</p>
   * }
   * ```
   *
   * @remarks
   * Prefer this method over checking `isLoading() > 0` for better readability.
   */
  isLoadingActive() {
    return this.loadingCount() > 0;
  }
}
