import { Injectable, signal } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class AuthTokenService {
  private readonly _accessToken = signal<string | null>(null);

  get accessToken() {
    return this._accessToken();
  }

  setToken(token: string | null) {
    this._accessToken.set(token);
  }

  clear() {
    this._accessToken.set(null);
  }
}
