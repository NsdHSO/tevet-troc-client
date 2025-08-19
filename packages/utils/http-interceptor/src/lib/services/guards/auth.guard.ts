import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthTokenService } from '../token/auth-token.service';
import { TEVET_API_AUTH_CLIENT } from '../providers/api.token';

export const authCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const authClient = inject(TEVET_API_AUTH_CLIENT);
  const tokenSvc = inject(AuthTokenService);
  const token = tokenSvc.accessToken;
  if (token) return true;

  // No token: redirect to auth login with next
  const next = encodeURIComponent(window.location.href);
  const encoded = btoa(next);

  window.location.href = `${authClient.baseUrl}/login?next=${encoded}&client=hospital`;
  return false;
};
