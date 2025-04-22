import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { CookieService } from 'ngx-cookie-service';
import { catchError, map, mergeMap, of, tap } from 'rxjs';
import { AuthService } from '@/services';
import { UserProps } from '@/interface';
import { login, loginSuccess, loginFailure } from './login.actions';
import { constants } from '@/config';

@Injectable()
export class LoginEffects {
  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private cookieService: CookieService
  ) {}

  setSecureCookie(key: string, value: string, expires: number) {
    this.cookieService.set(key, value, {
      secure: true,
      sameSite: 'Lax',
      expires,
    });
  }

  login$ = createEffect(() =>
    this.actions$.pipe(
      ofType(login),
      mergeMap((loginData) =>
        this.authService.login(loginData).pipe(
          map((user: UserProps) => loginSuccess({ user })),
          catchError((error) => of(loginFailure({ error })))
        )
      )
    )
  );

  persistUserInfo$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(loginSuccess),
        tap(({ user }) => {
          const { accessToken, refreshToken, ...otherProps } = user;

          if (accessToken) {
            this.setSecureCookie(constants.ACCESS_TOKEN, accessToken, 30);
          }
          if (refreshToken) {
            this.setSecureCookie(constants.REFRESH_TOKEN, refreshToken, 60);
          }

          const userProps = JSON.stringify({ ...otherProps });
          this.setSecureCookie(constants.COOKIE_PROP_USER, userProps, 60);
        })
      ),
    { dispatch: false }
  );
}
