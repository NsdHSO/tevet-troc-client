# Loading Spinner

A flexible Angular loading spinner component with automatic HTTP request tracking and support for multiple independent instances.

## Features

- 🔄 **Automatic HTTP tracking**: Automatically shows/hides during HTTP requests via interceptor
- 🎯 **Global & Local modes**: Use globally or create multiple independent instances
- 🎨 **Styled overlay**: Centered spinner with backdrop blur effect
- 📊 **Concurrent request handling**: Properly tracks multiple simultaneous requests
- 🧪 **Fully tested**: Comprehensive unit tests included
- ⚡ **Angular Signals**: Built with modern Angular signals API

## Installation

This library is part of the `@tevet-troc-client` monorepo.

## Quick Start

### 1. Register the HTTP Interceptor

Add the `loadingInterceptor` to your app configuration:

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '@tevet-troc-client/loading-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
    // ... other providers
  ],
};
```

### 2. Add the Component to Your App

Add the loading spinner component to your root component:

```html
<!-- app.component.html -->
<lib-loading-spinner />
<ngx-frame-side />
```

That's it! The loading spinner will now automatically appear during HTTP requests.

## Usage

### Global Loading (Automatic)

The spinner automatically shows during HTTP requests when using the interceptor:

```typescript
import { Component, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-data',
  template: `<button (click)="loadData()">Load</button>`
})
export class DataComponent {
  private http = inject(HttpClient);

  loadData() {
    // Loading spinner shows automatically
    this.http.get('/api/data').subscribe(data => {
      console.log(data);
      // Loading spinner hides automatically
    });
  }
}
```

### Manual Control (Independent Instances)

Create independent loading spinners with manual control:

```html
<!-- Custom loading state -->
<lib-loading-spinner [isLoading]="isProcessing" />

<!-- Another independent instance -->
<lib-loading-spinner [isLoading]="isSaving" />
```

```typescript
import { Component, signal } from '@angular/core';
import { LoadingSpinnerComponent } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'app-form',
  imports: [LoadingSpinnerComponent],
  template: `
    <lib-loading-spinner [isLoading]="isSaving()" />
    <button (click)="save()">Save</button>
  `
})
export class FormComponent {
  isSaving = signal(false);

  async save() {
    this.isSaving.set(true);
    try {
      await this.saveData();
    } finally {
      this.isSaving.set(false);
    }
  }
}
```

### Using LoadingService Directly

For programmatic control without using the component:

```typescript
import { Component, inject } from '@angular/core';
import { LoadingService } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'app-custom',
  template: `
    @if (loadingService.isLoadingActive()) {
      <p>Loading...</p>
    }
  `
})
export class CustomComponent {
  loadingService = inject(LoadingService);

  async performAction() {
    this.loadingService.show();
    try {
      await this.doSomething();
    } finally {
      this.loadingService.hide();
    }
  }
}
```

## API Reference

### LoadingSpinnerComponent

#### Inputs

| Input | Type | Default | Description |
|-------|------|---------|-------------|
| `isLoading` | `boolean \| undefined` | `undefined` | When `undefined`, uses global loading state. When set, overrides global state for this instance. |

#### Example

```html
<!-- Uses global state (tracks HTTP requests) -->
<lib-loading-spinner />

<!-- Manual control -->
<lib-loading-spinner [isLoading]="true" />
<lib-loading-spinner [isLoading]="myLoadingFlag" />
```

### LoadingService

#### Properties

- `isLoading: Signal<number>` - Current count of active loading operations

#### Methods

- `show(): void` - Increment loading counter
- `hide(): void` - Decrement loading counter
- `isLoadingActive(): boolean` - Returns true if any loading operations are active

See [LoadingService documentation](./src/lib/services/loading.service.md) for detailed examples.

### loadingInterceptor

HTTP interceptor function that automatically calls `LoadingService.show()` when requests start and `LoadingService.hide()` when they complete.

```typescript
provideHttpClient(withInterceptors([loadingInterceptor]))
```

## Styling

The loading spinner uses Tailwind CSS classes:

- `z-[9999]` - Appears on top of all content (including ngx-frame-side)
- `backdrop-blur-sm` - Blurred background effect
- `bg-black/30` - 30% opacity black overlay
- `w-12 h-12` - Spinner size

### Customization

To customize the appearance, modify the component's HTML template:

```html
<!-- loading-spinner.component.html -->
@if (showOverlay()) {
  <div class="fixed inset-0 z-[9999] flex items-center justify-center backdrop-blur-sm bg-black/30">
    <!-- Customize spinner SVG here -->
  </div>
}
```

## Multiple Instances

You can have multiple independent loading spinners on the same page:

```html
<!-- Global spinner (tracks HTTP) -->
<lib-loading-spinner />

<!-- Form-specific spinner -->
<lib-loading-spinner [isLoading]="isSavingForm" />

<!-- Modal-specific spinner -->
<lib-loading-spinner [isLoading]="isLoadingModal" />
```

Each instance with manual control (`[isLoading]` provided) operates independently from the global state and other instances.

## Best Practices

1. **Use the global instance** for HTTP requests - it's automatic and requires no extra code
2. **Use manual instances** for non-HTTP operations like long-running calculations or manual async operations
3. **Always pair show() with hide()** when using `LoadingService` directly - use `try/finally` or RxJS `finalize()`
4. **Avoid excessive spinners** - too many loading indicators can be confusing

## Running Unit Tests

```bash
nx test loading-spinner
```

## Examples

### Complete App Setup

```typescript
// app.config.ts
import { ApplicationConfig } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { loadingInterceptor } from '@tevet-troc-client/loading-spinner';

export const appConfig: ApplicationConfig = {
  providers: [
    provideHttpClient(withInterceptors([loadingInterceptor])),
  ],
};
```

```typescript
// app.component.ts
import { Component } from '@angular/core';
import { LoadingSpinnerComponent } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'app-root',
  imports: [LoadingSpinnerComponent],
  template: `
    <lib-loading-spinner />
    <router-outlet />
  `
})
export class AppComponent {}
```

### Form with Independent Loading State

```typescript
import { Component, signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LoadingSpinnerComponent } from '@tevet-troc-client/loading-spinner';

@Component({
  selector: 'app-user-form',
  imports: [LoadingSpinnerComponent],
  template: `
    <lib-loading-spinner [isLoading]="isSubmitting()" />
    <form (ngSubmit)="submit()">
      <button type="submit" [disabled]="isSubmitting()">Submit</button>
    </form>
  `
})
export class UserFormComponent {
  private http = inject(HttpClient);
  isSubmitting = signal(false);

  submit() {
    this.isSubmitting.set(true);
    this.http.post('/api/users', {})
      .pipe(finalize(() => this.isSubmitting.set(false)))
      .subscribe();
  }
}
```

## Troubleshooting

### Spinner doesn't appear during HTTP requests

Make sure the `loadingInterceptor` is registered in your app config:

```typescript
provideHttpClient(withInterceptors([loadingInterceptor]))
```

### Spinner appears behind other elements

The spinner uses `z-[9999]` which should be on top of most elements. If you have elements with higher z-index, adjust the spinner's z-index in the template.

### Multiple spinners overlap

This is expected behavior - both global and manual instances will render their overlays. Use manual control with `[isLoading]="false"` to disable the global instance when needed.

## License

Part of the tevet-troc-client monorepo.
