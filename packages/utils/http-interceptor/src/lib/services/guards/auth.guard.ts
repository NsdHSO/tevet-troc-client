import { inject } from '@angular/core';
import { CanMatchFn, Route, UrlSegment } from '@angular/router';
import { AuthTokenService } from '../token/auth-token.service';

export const authCanMatchGuard: CanMatchFn = (
  route: Route,
  segments: UrlSegment[]
) => {
  const tokenSvc = inject(AuthTokenService);
  const token = tokenSvc.accessToken;
  if (token) return true;

  // No token: redirect to auth login with next
  const next = encodeURIComponent(window.location.href);
  const encoded = btoa(next);

  window.location.href = `http://localhost:4300/login?next=${encoded}&client=hospital`;
  return false;
};
