import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private readonly _accessToken = signal<string | null>(null);

  /* Stored token
   */
  get accessToken() {
    return this._accessToken();
  }

  /* Setter for token
   */
  setToken(token: string | null) {
    this._accessToken.set(token);
  }

  /*
   * Clear token
   */
  clear() {
    this._accessToken.set(null);
  }
}
