import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class JwtDecodeService {
  decodeToken(token: string): { [key: string]: any} {
    return jwtDecode(token)
  }
}
