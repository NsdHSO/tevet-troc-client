import { Injectable, signal } from '@angular/core';
import {
  PermissionCode,
  UserRole,
  UserRoleEnum,
} from '@tevet-troc-client/models';

@Injectable({
  providedIn: 'root',
})
export class PermissionService {
  private role = signal<UserRole>(UserRoleEnum.GUEST);
  private permissions = signal<PermissionCode>(PermissionCode.PROJECT_READ);

  set userRole(role: UserRole) {
    this.role.set(role);
  }

  get userRole() {
    return this.role();
  }
  set userPermission(perm: PermissionCode) {
    this.permissions.set(perm);
  }

  get userPermission() {
    return this.permissions();
  }
}
