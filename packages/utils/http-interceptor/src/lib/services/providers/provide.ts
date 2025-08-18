import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingService } from '../errorHandling';
import { AuthInterceptorService } from '../auth/auth-interceptor.service';

export const interceptorAuthProviders: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: AuthInterceptorService,
  multi: true,
};

export const interceptorErrorProviders: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlingService,
  multi: true,
};
