import { inject, Injectable, signal } from '@angular/core';
import { PermissionCode, Person } from '@tevet-troc-client/models';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import { API_CONFIG_PERSON } from '../../../provider';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';

@Injectable()
export class AppointmentService {
  /**
   * HttpClient
   */
  private httpClient = inject(HttpClient);

  /**
   * PERSON injector
   */
  private readonly apiConfigPerson = inject(API_CONFIG_PERSON);

  readonly showCreateNewPatient = false;
  /**
   * Permission Directive
   */
  readonly permissionDirective = inject(PermissionDirective);
  public patientName = signal<string>('');
  /**
   *
   */
  public loading = signal(false);

  /**
   * Permission Code
   */
  get permissionAppointmentCreateCode() {
    return PermissionCode.APPOINTMENT_CREATE;
  }

  /**
   * Permission Code
   */
  get permissionPersonCreateCode() {
    return PermissionCode.PERSON_CREATE;
  }

  public persons = toSignal(
    toObservable(this.patientName).pipe(
      tap(() => this.loading.set(true)),
      // Wait for 500ms after the last keystroke
      debounceTime(500),
      // Only proceed if the value has changed
      distinctUntilChanged(),
      // Optional: Filter out empty strings to avoid an initial or empty search
      filter((name) => !!name),
      // Use switchMap to cancel previous requests and make a new one
      switchMap((name) =>
        this.httpClient
          .get<PaginatedBackendResponse<Person>>(
            `${this.apiConfigPerson.baseUrl}`,
            {
              params: {
                field: 'fts',
                value: name,
              },
            }
          )
          .pipe(tap(() => this.loading.set(false)))
      ),
      map((response) => response.message.data)
    )
  );
}
