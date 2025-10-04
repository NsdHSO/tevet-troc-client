import { Component, computed, inject, input } from '@angular/core';
import { LoadingService } from '../services/loading.service';

/**
 * A flexible loading spinner component that displays a centered overlay with a spinning indicator.
 *
 * This component supports two modes:
 * - **Global mode**: Automatically shows during HTTP requests when used without `isLoading` input
 * - **Manual mode**: Controlled via `isLoading` input for independent loading states
 *
 * The spinner appears on top of all content (z-index: 9999) with a blurred background overlay,
 * making it ideal for displaying on top of navigation frames and other UI elements.
 *
 * @example
 * Global mode (automatic HTTP tracking):
 * ```html
 * <lib-loading-spinner />
 * ```
 *
 * @example
 * Manual mode (custom loading state):
 * ```html
 * <lib-loading-spinner [isLoading]="isSaving" />
 * ```
 *
 * @example
 * Multiple independent instances:
 * ```typescript
 * @Component({
 *   selector: 'app-example',
 *   template: `
 *     <!-- Global spinner for HTTP requests -->
 *     <lib-loading-spinner />
 *
 *     <!-- Form-specific spinner -->
 *     <lib-loading-spinner [isLoading]="isSubmitting()" />
 *
 *     <!-- Modal-specific spinner -->
 *     <lib-loading-spinner [isLoading]="isLoadingModal()" />
 *   `
 * })
 * export class ExampleComponent {
 *   isSubmitting = signal(false);
 *   isLoadingModal = signal(false);
 *
 *   submitForm() {
 *     this.isSubmitting.set(true);
 *     // ... async operation
 *     this.isSubmitting.set(false);
 *   }
 * }
 * ```
 *
 * @remarks
 * - Uses Tailwind CSS classes for styling (requires Tailwind CSS in your project)
 * - Spinner SVG is animated with CSS `animate-spin`
 * - Overlay uses `backdrop-blur-sm` and `bg-black/30` for visual effect
 * - Multiple instances can coexist on the same page
 *
 * @see {@link LoadingService} for the underlying state management
 * @see {@link loadingInterceptor} for automatic HTTP tracking
 *
 * @public
 */
@Component({
  selector: 'lib-loading-spinner',
  imports: [],
  templateUrl: './loading-spinner.component.html',
  styleUrl: './loading-spinner.component.css',
})
export class LoadingSpinnerComponent {
  /**
   * Injected loading service for global loading state management.
   * @private
   */
  private loadingService = inject(LoadingService);

  /**
   * Optional input to manually control the loading state.
   *
   * @remarks
   * - When `undefined` (default), the component uses the global loading state from {@link LoadingService}
   * - When set to `true` or `false`, the component uses the provided value and ignores global state
   * - This allows multiple independent loading spinners to coexist on the same page
   *
   * @example
   * ```html
   * <!-- Uses global state -->
   * <lib-loading-spinner />
   *
   * <!-- Manual control -->
   * <lib-loading-spinner [isLoading]="true" />
   * <lib-loading-spinner [isLoading]="myLoadingSignal()" />
   * ```
   */
  isLoading = input<boolean | undefined>(undefined);

  /**
   * Optional input to control positioning mode.
   *
   * @remarks
   * - `'fixed'`: Covers the entire viewport - use for global loading
   * - `'absolute'`: Covers only the parent container (default) - use for local/component loading
   * - Parent container must have `position: relative` when using `'absolute'`
   *
   * @example
   * ```html
   * <!-- Global loading (covers entire screen) -->
   * <lib-loading-spinner position="fixed" />
   *
   * <!-- Local loading (covers parent container only) -->
   * <main class="relative">
   *   <lib-loading-spinner position="absolute" />
   *   <elix-table>...</elix-table>
   * </main>
   * ```
   */
  position = input<'fixed' | 'absolute'>('absolute');

  /**
   * Computed CSS classes for the overlay container.
   * @internal
   */
  overlayClasses = computed(() => {
    const baseClasses = 'inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/30';
    return this.position() === 'fixed'
      ? `fixed ${baseClasses}`
      : `absolute ${baseClasses}`;
  });

  /**
   * Computed signal that determines whether to show the loading overlay.
   *
   * @remarks
   * - Returns the `isLoading` input value if provided (manual mode)
   * - Returns the global loading state if `isLoading` is undefined (global mode)
   * - Used in the template to conditionally render the overlay
   *
   * @returns `true` if loading overlay should be shown, otherwise `false`
   *
   * @internal
   */
  showOverlay = computed(() => {
    const manualLoading = this.isLoading();
    return manualLoading !== undefined
      ? manualLoading
      : this.loadingService.isLoadingActive();
  });
}
