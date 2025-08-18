import { Provider } from '@angular/core';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ErrorHandlingService } from '../errorHandling';

export const interceptorErrorProviders: Provider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ErrorHandlingService,
  multi: true,
};
