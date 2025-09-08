import { UserRole, UserRoleEnum } from './role';

/**
 * Defines the specific permission codes that can be granted to a user as an enum.
 */
export enum PermissionCode {
  USER_READ = 'user.read',
  USER_WRITE = 'user.write',
  SESSION_READ = 'session.read',
  SESSION_TERMINATE = 'session.terminate',
  TOKEN_READ = 'token.read',
  TOKEN_REVOKE = 'token.revoke',
  PROJECT_READ = 'project.read',
  PROJECT_WRITE = 'project.write',
  PROJECT_DELETE = 'project.delete',
  APPOINTMENT_CREATE = 'appointment.create',
  APPOINTMENT_READ = 'appointment.read',
  APPOINTMENT_UPDATE = 'appointment.update',
  EMERGENCY_CREATE = 'emergency.create',
  EMERGENCY_READ = 'emergency.read',
  EMERGENCY_UPDATE = 'emergency.update',
  DASHBOARD_CREATE = 'dashboard.create',
  DASHBOARD_READ = 'dashboard.read',
  DASHBOARD_UPDATE = 'dashboard.update',
}
export type PermissionsMap = Record<UserRoleEnum, Set<PermissionCode>>;

/**
 * An object that defines the specific permissions for each UserRole.
 * The permissions are stored in a Set for constant time lookup (O(1)).
 */
export const userPermissions: PermissionsMap = {
  /**
   * ADMIN has all permissions.
   */
  [UserRoleEnum.ADMIN]: new Set([
    PermissionCode.USER_READ,
    PermissionCode.USER_WRITE,
    PermissionCode.SESSION_READ,
    PermissionCode.SESSION_TERMINATE,
    PermissionCode.TOKEN_READ,
    PermissionCode.TOKEN_REVOKE,
    PermissionCode.PROJECT_READ,
    PermissionCode.PROJECT_WRITE,
    PermissionCode.PROJECT_DELETE,
    PermissionCode.APPOINTMENT_CREATE,
    PermissionCode.APPOINTMENT_READ,
    PermissionCode.APPOINTMENT_UPDATE,
    PermissionCode.EMERGENCY_READ,
    PermissionCode.EMERGENCY_UPDATE,
    PermissionCode.EMERGENCY_CREATE,
    PermissionCode.DASHBOARD_READ,
    PermissionCode.DASHBOARD_UPDATE,
    PermissionCode.DASHBOARD_CREATE,
  ]),
  /**
   * MODERATOR has permissions to read users, manage sessions, and read/write projects.
   */
  [UserRoleEnum.MODERATOR]: new Set([
    PermissionCode.USER_READ,
    PermissionCode.SESSION_READ,
    PermissionCode.SESSION_TERMINATE,
    PermissionCode.PROJECT_READ,
    PermissionCode.PROJECT_WRITE,
    PermissionCode.EMERGENCY_READ,
    PermissionCode.EMERGENCY_CREATE,
    PermissionCode.APPOINTMENT_CREATE,
    PermissionCode.APPOINTMENT_READ,
  ]),
  /**
   * GUEST has a single permission to read projects.
   */
  [UserRoleEnum.OPERATOR]: new Set([
    PermissionCode.APPOINTMENT_CREATE,
    PermissionCode.APPOINTMENT_READ,
    PermissionCode.APPOINTMENT_UPDATE,
    PermissionCode.DASHBOARD_CREATE,
    PermissionCode.DASHBOARD_READ,
    PermissionCode.DASHBOARD_UPDATE,
  ]),
  /**
   * USER has permissions to read their own tokens and read projects.
   */
  [UserRoleEnum.USER]: new Set([
    PermissionCode.TOKEN_READ,
    PermissionCode.PROJECT_READ,
  ]),
  /**
   * GUEST has a single permission to read projects.
   */
  [UserRoleEnum.GUEST]: new Set([PermissionCode.PROJECT_READ]),
};

/**
 * A type alias for the inferred type of the userPermissions object.
 * This ensures the type is always in sync with the data.
 */
export type UserPermissions = typeof userPermissions;

/**
 * Checks if a user has a specific permission.
 * This version uses a Set for a more efficient lookup.
 *
 * @param roles The UserRole of the user.
 * @param permission The PermissionCode to check for.
 * @returns A boolean indicating whether the user has the permission.
 */
export const checkPermission = (
  roles: UserRole[],
  permission: PermissionCode
) => {
  const allPermissions = roles.flatMap(role => {
    const permissionsForRole = userPermissions[role];
    return permissionsForRole ? [...permissionsForRole] : [];
  });

  const permissionSet = new Set(allPermissions);

  return permissionSet.has(permission);
};
