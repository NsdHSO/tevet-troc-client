import { PermissionDirective } from './persmission.directive';
import { PermissionService } from '@tevet-troc-client/http-interceptor';
import { TestBed } from '@angular/core/testing';
import { PermissionCode, UserRoleEnum } from '@tevet-troc-client/models';

describe('PermissionDirective', () => {
  const setup = (permissionService: Partial<PermissionService>) =>
    TestBed.configureTestingModule({
      providers: [
        { provide: PermissionService, useValue: permissionService },
        PermissionDirective,
      ],
    }).inject(PermissionDirective);

  it('should return false for guests', () => {
    const directive = setup({ userRole: [UserRoleEnum.GUEST] });
    expect(
      directive.hasPermission(PermissionCode.APPOINTMENT_CREATE)
    ).toBe(false);
  });

  it('should return true for admin', () => {
    const directive = setup({ userRole: [UserRoleEnum.ADMIN] });
    expect(
      directive.hasPermission(PermissionCode.APPOINTMENT_CREATE)
    ).toBe(true);
  });
});
