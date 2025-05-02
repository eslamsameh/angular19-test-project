import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { CookieService } from 'ngx-cookie-service';
import { authInterceptor } from './auth.interceptor';
import { constants } from '@/config';
import { MockStore, provideMockStore } from '@ngrx/store/testing';
import { AuthService } from '@/services';
import { of, throwError } from 'rxjs';
import { loginReset } from '@/store';

describe('AuthInterceptor (Functional)', () => {
  let http: HttpClient;
  let httpMock: HttpTestingController;
  let cookieService: CookieService;
  let authServiceSpy: jasmine.SpyObj<AuthService>;

  beforeEach(() => {
    authServiceSpy = jasmine.createSpyObj('AuthService', ['refreshToken']);

    TestBed.configureTestingModule({
      providers: [
        CookieService,
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
        { provide: AuthService, useValue: authServiceSpy },

        provideMockStore(),
      ],
    });

    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
    cookieService = TestBed.inject(CookieService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should add Authorization header if accessToken is present', () => {
    cookieService.set(constants.ACCESS_TOKEN, 'fake-access-token');
    http.get('/test-url').subscribe();
    const req = httpMock.expectOne('/test-url');

    expect(req.request.headers.has('Authorization')).toBeTrue();
    expect(req.request.headers.get('Authorization')).toBe(
      'Bearer fake-access-token'
    );

    req.flush({});
  });

  it('should try to refresh token on 401 original request', () => {
    cookieService.set('accessToken', 'expired-token');
    cookieService.set('refreshToken', 'refresh-token');

    authServiceSpy.refreshToken.and.returnValue(
      of({
        accessToken: 'new-token',
        refreshToken: 'new-refresh-token',
      })
    );

    http.get('/test-url').subscribe();

    const firstReq = httpMock.expectOne('/test-url');
    firstReq.flush({}, { status: 401, statusText: 'Unauthorized' });

    const retryReq = httpMock.expectOne('/test-url');
    expect(retryReq.request.headers.get('Authorization')).toBe(
      'Bearer new-token'
    );
    retryReq.flush({});
  });

  it('should dispatch logout on refresh failure', () => {
    const mockStore = TestBed.inject(MockStore);
    const dispatchSpy = spyOn(mockStore, 'dispatch');

    cookieService.set('accessToken', 'expired-token');
    cookieService.set('refreshToken', 'refresh-token');

    authServiceSpy.refreshToken.and.returnValue(
      throwError(() => new Error('Refresh failed'))
    );

    http.get('/test-url').subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('/test-url');
    req.flush({}, { status: 401, statusText: 'Unauthorized' });
    expect(authServiceSpy.refreshToken.apply).toThrowError();
    expect(dispatchSpy).toHaveBeenCalledWith(loginReset());
  });

  it('should not refresh token function called if the error not 401', () => {
    cookieService.set('accessToken', 'token');
    cookieService.set('refreshToken', 'token');

    http.get('/test-url').subscribe({
      error: (err) => {
        expect(err).toBeTruthy();
      },
    });

    const req = httpMock.expectOne('/test-url');
    req.flush({}, { status: 404, statusText: 'not found' });
    expect(authServiceSpy.refreshToken).not.toHaveBeenCalled();
  });
});
