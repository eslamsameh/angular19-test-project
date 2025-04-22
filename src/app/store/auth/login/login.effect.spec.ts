import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { LoginEffects } from './login.effects';
import { AuthService } from '@/services';
import { CookieService } from 'ngx-cookie-service';
import {
  login,
  loginSuccess,
  loginFailure,
  LOGIN_FAILURE_ACTION,
} from './login.actions';
import { UserProps } from '@/interface';
import { constants } from '@/config';

describe('LoginEffects', () => {
  let actions$: Observable<any>;
  let effects: LoginEffects;
  let authService: jasmine.SpyObj<AuthService>;
  let cookieService: jasmine.SpyObj<CookieService>;

  beforeEach(() => {
    const authServiceSpy = jasmine.createSpyObj('AuthService', ['login']);
    const cookieServiceSpy = jasmine.createSpyObj('CookieService', ['set']);

    TestBed.configureTestingModule({
      providers: [
        LoginEffects,
        provideMockActions(() => actions$),
        { provide: AuthService, useValue: authServiceSpy },
        { provide: CookieService, useValue: cookieServiceSpy },
      ],
    });

    effects = TestBed.inject(LoginEffects);
    authService = TestBed.inject(AuthService) as jasmine.SpyObj<AuthService>;
    cookieService = TestBed.inject(
      CookieService
    ) as jasmine.SpyObj<CookieService>;
  });

  describe('login$', () => {
    it('should dispatch loginSuccess on successful login', () => {
      const user: UserProps = {
        id: 1,
        username: 'testuser',
        accessToken: 'token123',
        refreshToken: 'refresh123',
        email: 'testuser@asd.com',
        firstName: 'testuser',
        gender: 'mail',
        image: '',
        lastName: 'testuser',
      };
      const action = login({ username: 'test', password: 'pass' });
      const outcome = loginSuccess({ user });

      actions$ = of(action);
      authService.login.and.returnValue(of(user));

      effects.login$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should dispatch loginFailure on login error', () => {
      const error = new Error('Login failed');
      const action = login({ username: 'test', password: 'pass' });

      actions$ = of(action);
      authService.login.and.returnValue(throwError(() => error));

      effects.login$.subscribe((result) => {
        expect(result.type).toEqual(LOGIN_FAILURE_ACTION);
      });
    });
  });

  describe('persistUserInfo$', () => {
    it('should set cookies on loginSuccess', () => {
      const user: UserProps = {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        accessToken: 'token123',
        refreshToken: 'refresh123',
        gender: 'mail',
        image: '',
      };
      const action = loginSuccess({ user });

      actions$ = of(action);

      effects.persistUserInfo$.subscribe(() => {
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.ACCESS_TOKEN,
          'token123',
          jasmine.any(Object)
        );
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.REFRESH_TOKEN,
          'refresh123',
          jasmine.any(Object)
        );
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.COOKIE_PROP_USER,
          jasmine.any(String),
          jasmine.any(Object)
        );
      });
    });

    it('should set cookies on loginSuccess', () => {
      const user: UserProps = {
        id: 1,
        username: 'testuser',
        email: 'test@test.com',
        firstName: 'Test',
        lastName: 'User',
        accessToken: 'token123',
        refreshToken: 'refresh123',
        gender: 'mail',
        image: '',
      };
      const action = loginSuccess({ user });

      actions$ = of(action);

      effects.persistUserInfo$.subscribe(() => {
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.ACCESS_TOKEN,
          'token123',
          jasmine.any(Object)
        );
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.REFRESH_TOKEN,
          'refresh123',
          jasmine.any(Object)
        );
        expect(cookieService.set).toHaveBeenCalledWith(
          constants.COOKIE_PROP_USER,
          jasmine.any(String),
          jasmine.any(Object)
        );
      });
    });
  });
});
