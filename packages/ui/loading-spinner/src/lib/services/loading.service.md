# LoadingService

A service for managing global loading states in Angular applications. It tracks multiple concurrent loading operations using a counter-based approach.

## Overview

The `LoadingService` maintains a signal-based counter that increments when a loading operation starts and decrements when it completes. This allows handling multiple concurrent operations gracefully.

## API

### Properties

#### `isLoading: Signal<number>`
A readonly signal that returns the current count of active loading operations.

```typescript
const count = loadingService.isLoading();
```

### Methods

#### `show(): void`
Increments the loading counter by 1. Call this when a loading operation starts.

```typescript
loadingService.show();
```

#### `hide(): void`
Decrements the loading counter by 1 (minimum 0). Call this when a loading operation completes.

```typescript
loadingService.hide();
```

#### `isLoadingActive(): boolean`
Returns `true` if there are any active loading operations (count > 0), otherwise `false`.

```typescript
if (loadingService.isLoadingActive()) {
  console.log('Loading in progress...');
}
```

## Usage Examples

### Basic Usage

```typescript
import { Component, inject } from '@angular/core';
import { LoadingService } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'app-example',
  template: `
    <button (click)="loadData()">Load Data</button>
    @if (loadingService.isLoadingActive()) {
      <p>Loading...</p>
    }
  `
})
export class ExampleComponent {
  loadingService = inject(LoadingService);

  loadData() {
    this.loadingService.show();
    
    // Simulate async operation
    setTimeout(() => {
      this.loadingService.hide();
    }, 2000);
  }
}
```

### With HTTP Requests (Manual)

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingService } from '@tevet-troc-client/loading-spinner';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-data',
  template: `<div>{{ data }}</div>`
})
export class DataComponent {
  private http = inject(HttpClient);
  private loadingService = inject(LoadingService);
  data: any;

  loadData() {
    this.loadingService.show();
    
    this.http.get('/api/data')
      .pipe(finalize(() => this.loadingService.hide()))
      .subscribe(result => {
        this.data = result;
      });
  }
}
```

### Concurrent Operations

The service automatically handles multiple concurrent operations:

```typescript
// Three operations start
loadingService.show(); // count = 1
loadingService.show(); // count = 2
loadingService.show(); // count = 3

console.log(loadingService.isLoadingActive()); // true

// Operations complete one by one
loadingService.hide(); // count = 2
loadingService.hide(); // count = 1
loadingService.hide(); // count = 0

console.log(loadingService.isLoadingActive()); // false
```

## Integration with HTTP Interceptor

When used with the `loadingInterceptor`, the service automatically tracks all HTTP requests:

```typescript
// app.config.ts
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '@tevet-troc-client/loading-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    // ... other providers
  ],
};
```

With this setup, you don't need to manually call `show()` and `hide()` for HTTP requests - the interceptor handles it automatically.

## Best Practices

1. **Always pair show() with hide()**: Use the `finalize` operator with RxJS observables to ensure `hide()` is called even if an error occurs.

2. **Use the HTTP interceptor**: For HTTP requests, prefer using the `loadingInterceptor` instead of manually managing loading states.

3. **Check active state**: Use `isLoadingActive()` for boolean checks rather than comparing `isLoading()` directly.

4. **Multiple instances**: The service is provided at root level, so all components share the same loading state. For independent loading states, use the `LoadingSpinnerComponent` with manual control.

## See Also

- [LoadingSpinnerComponent](../loading-spinner/loading-spinner.component.md)
- [Loading Interceptor](../interceptors/loading.interceptor.md)
