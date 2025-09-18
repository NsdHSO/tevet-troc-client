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
   * HttpClient instance injected for making API calls.
   */
  private readonly httpClient = inject(HttpClient);

  /**
   * API configuration for the person endpoint, injected via a token.
   */
  private readonly apiConfigPerson = inject(API_CONFIG_PERSON);

  /**
   * A flag to control the visibility of a "create new patient" UI element.
   * Currently set to `false`.
   */
  readonly showCreateNewPatient = false;

  /**
   * The `PermissionDirective` instance injected to check user permissions.
   */
  readonly permissionDirective = inject(PermissionDirective);

  /**
   * A signal to hold the value of the patient name search input.
   */
  public readonly patientName = signal<string>('');

  /**
   * A signal to track the loading state of the asynchronous data fetch.
   */
  public readonly loading = signal(false);

  /**
   * Formats a `Person` object's full name for display.
   * @param person The `Person` object to format.
   * @returns A string combining the person's first and last name.
   */
  displayPerson = (person: Person) =>
    `${person.first_name} ${person.last_name}`;

  /**
   * A getter that provides the permission code for creating an appointment.
   */
  get permissionAppointmentCreateCode() {
    return PermissionCode.APPOINTMENT_CREATE;
  }

  /**
   * A getter that provides the permission code for creating a person.
   */
  get permissionPersonCreateCode() {
    return PermissionCode.PERSON_CREATE;
  }

  /**
   * A readonly signal that reactively fetches and holds the list of persons
   * based on the `patientName` signal's value.
   * The signal is derived from an observable pipeline that handles:
   * - Debouncing user input.
   * - Filtering out empty values.
   * - Making HTTP requests.
   * - Managing the `loading` signal.
   * - Mapping the API response to an array of `Person` objects.
   */
  public readonly persons = toSignal(
    toObservable(this.patientName).pipe(
      tap(() => this.loading.set(true)),
      debounceTime(500),
      distinctUntilChanged(),
      filter((name) => !!name),
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
    ),
    { initialValue: [] }
  );
}
