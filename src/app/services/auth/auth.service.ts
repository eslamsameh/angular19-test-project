import { inject, Injectable } from '@angular/core';
import { LoginProps, RefreshTokenHttpProps } from '@/interface';
import { HttpClient } from '@angular/common/http';
import { APIS_URL } from '@/config';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  httpClient = inject(HttpClient);

  login({ username, password }: LoginProps): Observable<any> {
    return this.httpClient.post(APIS_URL.LOGIN, { username, password });
  }

  refreshToken(refreshToken: string): Observable<RefreshTokenHttpProps> {
    return this.httpClient.post<RefreshTokenHttpProps>(APIS_URL.REFRESH_AUTH, {
      refreshToken,
    });
  }
}
