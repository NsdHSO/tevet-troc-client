import { Directive, inject } from '@angular/core';
import { PermissionService } from '@tevet-troc-client/http-interceptor';
import { checkPermission, PermissionCode } from '@tevet-troc-client/models';

@Directive({
  selector: '[libPermission]',
})
export class PermissionDirective {
  /**
   * Role Service
   */
  private readonly _roleService = inject(PermissionService);

  // This property will be used by the parent component's template
  // to determine whether to show the element.
  hasPermission(permission: PermissionCode): boolean {
    return checkPermission(this._roleService.userRole, permission);
  }
}
