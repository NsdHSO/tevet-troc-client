
export type UserRole = "ADMIN" | "USER" | "MODERATOR" | "GUEST" | "OPERATOR";
/**
 * @fileoverview Defines user roles and their associated permissions using permission
 * and a type-safe object structure.
 * This file is self-contained and can be used directly in a TypeScript project.
 */

/**
 * Defines the different roles a user can have in the system as an enum.
 */
export enum UserRoleEnum {
  ADMIN = "ADMIN",
  USER = "USER",
  MODERATOR = "MODERATOR",
  OPERATOR = "OPERATOR",
  GUEST = "GUEST",
}
