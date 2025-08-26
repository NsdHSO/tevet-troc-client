import { inject, Injectable } from '@angular/core';
import { PermissionCode } from '@tevet-troc-client/models';
import { PermissionDirective } from '@tevet-troc-client/permission';

@Injectable()
export class AppointmentService {
  /**
   * Permission Directive
   */
  readonly permissionDirective = inject(PermissionDirective);

  get permissionCode (){
    return PermissionCode.APPOINTMENT_CREATE
  }
}
