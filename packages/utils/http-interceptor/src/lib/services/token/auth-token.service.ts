import { inject, Injectable, signal } from '@angular/core';
import { PermissionService } from '../permission/permission.service';
import { JwtDecodeService } from '../jwtDecode/jwt-decode.service';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private readonly _permissionService = inject(PermissionService);
  private readonly _jwtDecodeService = inject(JwtDecodeService);

  private readonly _accessToken = signal<string | null>(null);

  /* Stored token
   */
  get accessToken() {
    return this._accessToken();
  }

  /* Setter for token
   */
  setToken(token: string | null) {
    if (token) {
      this._permissionService.userRole =
        this._jwtDecodeService.decodeToken(token)['roles'];
      this._permissionService.userPermission =
        this._jwtDecodeService.decodeToken(token)['perms'];
    }
    this._accessToken.set(token);
  }

  /*
   * Clear token
   */
  clear() {
    this._accessToken.set(null);
  }
}
