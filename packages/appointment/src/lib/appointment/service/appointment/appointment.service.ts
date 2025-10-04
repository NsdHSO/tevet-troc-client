import {
  inject,
  Injectable,
  Signal,
  signal,
  WritableSignal,
} from '@angular/core';
import {
  AppointmentPayload,
  Department,
  Me,
  PermissionCode,
  Person,
  Staff,
} from '@tevet-troc-client/models';
import { PermissionDirective } from '@tevet-troc-client/permission';
import { toObservable, toSignal } from '@angular/core/rxjs-interop';
import { HttpClient } from '@angular/common/http';
import {
  API_CONFIG_APPOINTMENT,
  API_CONFIG_DEPARTMENT,
  API_CONFIG_PERSON,
  API_CONFIG_STAFF,
} from '../../../provider';
import { PaginatedBackendResponse } from '@tevet-troc-client/http-response';
import {
  catchError,
  combineLatest,
  debounceTime, delay,
  distinctUntilChanged,
  filter,
  map,
  merge,
  Observable,
  startWith,
  Subject,
  switchMap,
  tap,
  throwError,
} from 'rxjs';
import { MeService } from '@tevet-troc-client/http-interceptor';
import { DataSourceMaterialTable } from 'ngx-liburg';

@Injectable()
export class AppointmentService {
  /**
   * HttpClient instance injected for making API calls.
   */
  private readonly httpClient = inject(HttpClient);

  /**
   * Me Service
   */
  private readonly meService = inject(MeService);

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
   * API configuration for the appointment endpoint, injected via a token.
   */
  private readonly apiConfigAppointment = inject(API_CONFIG_APPOINTMENT);

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
   * A signal to hold the value of the notes input.
   */
  notes = signal<string | null>(null);


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

  pageOffsetAppointments = signal(0);
  perPageOffsetAppointments = signal(10);

  triggeredGetAppointment = new Subject<void>();

  loadingAppointments = signal(false);
  totalAppointments = 0; // Can be a signal if needed elsewhere


  private pageOffset$: Observable<number> = toObservable(this.pageOffsetAppointments);
  private perPageOffset$: Observable<number> = toObservable(this.perPageOffsetAppointments);

  private combinedTrigger$ = merge(
    combineLatest([this.pageOffset$, this.perPageOffset$]),
    this.triggeredGetAppointment,
  ).pipe(
    debounceTime(0),
    tap(() => this.loadingAppointments.set(true)),
    switchMap(() =>
      this.httpClient
        .get<PaginatedBackendResponse<AppointmentPayload>>(
          `${this.apiConfigAppointment.baseUrl}`,
          {
            params: {
              page: this.pageOffsetAppointments(),
              per_page: this.perPageOffsetAppointments(),
              filter:`hospital_id=${(this.meService.meInfo as Me)?.attributes.hospital_id || ''}`
            },
          }
        )
        .pipe(
          tap((response) => {
            this.totalAppointments = response.message.pagination.total_items;
          }),
          map((response) =>
            response.message.data.map(
              (appointment, index) =>
                ({
                  model: appointment,
                  editable: true,
                  actions: [],
                  id: index,
                } as DataSourceMaterialTable<AppointmentPayload>)
            )
          ),
          tap(() => this.loadingAppointments.set(false))
        )
    )
  );

  getAppointment: Signal<DataSourceMaterialTable<AppointmentPayload>[]> =
    toSignal(this.combinedTrigger$, { initialValue: [] });

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
            value: (this.meService.meInfo as Me)?.attributes.hospital_id || '',
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
      .get<PaginatedBackendResponse<[Staff, Person][]>>(
        `${this.apiConfigStaff.baseUrl}`,
        {
          params: {
            hospital_id:
              (this.meService.meInfo as Me)?.attributes.hospital_id || '',
            field: 'role',
            value: 'doctor'.toUpperCase(),
          },
        }
      )
      .pipe(
        map((response) =>
          response.message.data.map(([staff, person]) => ({
            ...staff,
            ...person,
          }))
        ),
        tap(console.log)
      ),
    { initialValue: [] }
  );
  /**
   *
   */
  public postAppointment() {
    const patient = this.selectedPatient();
    const department = this.selectedDepartment();
    const doctor = this.selectedDoctor();

    if (!patient || !department || !doctor) {
      return throwError(
        () =>
          new Error(
            'Missing required fields: patient, department, and doctor are required.'
          )
      );
    }

    /**
     * TODO: Remove this hardcoded after PR is merged
     */

    const payload: AppointmentPayload = {
      hospital_name: (this.meService.meInfo as Me)?.attributes.hospital_id || '',
      patient_name: patient.first_name,
      doctor_name: doctor.first_name,
      notes: this.notes() ?? '',
      appointment_date: new Date().toDateString(),
      reason: 'Test',
      scheduled_by:  (this.meService.meInfo as Me)?.attributes.staff_name || '',
      appointment_type: 'Test',
      status: 'Scheduled',
    };

    return this.httpClient
      .post<AppointmentPayload>(`${this.apiConfigAppointment.baseUrl}`, payload)
      .pipe(
        catchError((e) => {
          console.log(payload);
          return throwError(() => e);
        })
      );
  }
  public setNotes($event: Event) {
    this.notes.set(($event.target as HTMLInputElement).value);
  }

  changePageSize(
    event: any,
    pageIndex: WritableSignal<any>,
    pageSize: WritableSignal<any>
  ): void {
    pageSize.set(event.pageSize);
    pageIndex.set(event.pageIndex);
  }

}
