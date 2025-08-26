import { PermissionDirective } from './persmission.directive';
import { PermissionService } from '@tevet-troc-client/http-interceptor';
import { TestBed } from '@angular/core/testing';
import { expect } from '@playwright/test';
import { PermissionCode, UserRoleEnum } from '@tevet-troc-client/models';

describe('PermissionDirective', () => {
  const setup = (permissionService: PermissionService) =>
    TestBed.configureTestingModule({
      providers: [{ provide: PermissionService, useValue: permissionService }, PermissionDirective],
    }).inject(PermissionDirective);
  it('should create an instance', () => {
    const directive = setup({ userRole:UserRoleEnum.GUEST } as PermissionService);
    expect(
      directive.hasPermission(PermissionCode.APPOINTMENT_CREATE)
    ).toBe(false);
  });
  it('should create an instance', () => {
    const directive = setup({ userRole: UserRoleEnum.ADMIN } as PermissionService);
    expect(
      directive.hasPermission(PermissionCode.APPOINTMENT_CREATE)
    ).toBe(true);
  });
});
