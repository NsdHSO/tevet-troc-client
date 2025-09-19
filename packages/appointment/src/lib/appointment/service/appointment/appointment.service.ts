import { inject, Injectable, signal } from '@angular/core';
import { Department, PermissionCode, Person } from '@tevet-troc-client/models';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import {
  API_CONFIG_DEPARTMENT,
  API_CONFIG_PERSON,
  API_CONFIG_STAFF,
} from '../../../provider';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs';
import { Staff } from '../../../../../../utils/models/src/lib/models/starff.type';

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
   * API configuration for the department endpoint, injected via a token.
   */
  private readonly apiConfigDepartment = inject(API_CONFIG_DEPARTMENT);

  /**
   * API configuration for the department endpoint, injected via a token.
   */
  private readonly apiConfigStaff = inject(API_CONFIG_STAFF);

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
   * The selected patient entity from the dropdown.
   */
  public readonly selectedPatient = signal<Person | undefined>(undefined);

  /**
   * A signal to hold the value of the patient name search input.
   */
  departmentSearch = signal<string>('');
  selectedDepartment = signal<Department | undefined>(undefined);

  /**
   * A signal to hold the value of the doctor name search input.
   */
  doctorSearch = signal<string>('');
  selectedDoctor = signal<Staff | undefined>(undefined);
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
   * Formats a `Department` object's full name for display.
   * @param department The `Department` object to format.
   * @returns A string combining the department's first and last name.
   */
  displayDepartment = (department: Department) => `${department.description} `;
  /**
   * Formats a `Staff` object's full name for display.
   * @param staff The `Staff` object to format.
   * @returns A string combining the staff's first and last name.
   */
  displayDoctor = (staff: Staff) => `${staff.last_name} ${staff.first_name}`;
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

  /**
   * A readonly list of department
   */
  public readonly departments = toSignal(
    this.httpClient
      .get<PaginatedBackendResponse<Department>>(
        `${this.apiConfigDepartment.baseUrl}`,
        {
          params: {
            value: 'd7051eea-7698-415f-b5ce-7c15e71cc17b',
            field: 'hospital_id',
          },
        }
      )
      .pipe(map((response) => response.message.data)),
    { initialValue: [] }
  );
  /**
   * A readonly list of department
   */
  public readonly staff = toSignal(
    this.httpClient
      .get<PaginatedBackendResponse<[Staff, Person][]>>(`${this.apiConfigStaff.baseUrl}`, {
        params: {
          hospital_id: 'd7051eea-7698-415f-b5ce-7c15e71cc17b',
          field: 'role',
          value: 'doctor'.toUpperCase(),
        },
      })
      .pipe(map((response) => response.message.data.map(([staff, person]) => ({ ...staff, ...person }))), tap(console.log)),
    { initialValue: [] }
  );
}
