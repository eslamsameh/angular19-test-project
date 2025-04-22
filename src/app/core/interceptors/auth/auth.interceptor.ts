import {
  HttpErrorResponse,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Store } from '@ngrx/store';
import { CookieService } from 'ngx-cookie-service';
import { catchError, switchMap, tap, throwError } from 'rxjs';
import { constants } from '@/config';
import { RefreshTokenHttpProps } from '@/interface';
import { AuthService } from '@/services';
import { loginReset } from '@/store';

let isRefreshing = false;

const addToken = (req: HttpRequest<unknown>, accessToken: string) => {
  return req.clone({
    setHeaders: { Authorization: `Bearer ${accessToken}` },
  });
};

const setTokens = (cookie: CookieService, tokens: RefreshTokenHttpProps) => {
  cookie.set(constants.ACCESS_TOKEN, tokens.accessToken);
  cookie.set(constants.REFRESH_TOKEN, tokens.refreshToken);
};

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const cookieService = inject(CookieService);
  const store = inject(Store);
  const authService = inject(AuthService);
  const accessToken = cookieService.get(constants.ACCESS_TOKEN);
  let authReq = req;

  if (accessToken) {
    authReq = addToken(req, accessToken);
  }

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && !isRefreshing) {
        isRefreshing = true;
        const refreshToken = cookieService.get(constants.REFRESH_TOKEN);
        if (refreshToken) {
          return authService.refreshToken(refreshToken).pipe(
            tap((newTokens) => {
              isRefreshing = false;
              setTokens(cookieService, newTokens);
            }),
            switchMap((tokens) => next(addToken(req, tokens.accessToken))),
            catchError((err) => {
              isRefreshing = false;
              store.dispatch(loginReset());
              return throwError(() => err);
            })
          );
        }
      }
      return throwError(() => error);
    })
  );
};
