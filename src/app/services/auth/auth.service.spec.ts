import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AuthService } from './auth.service';
import { LoginProps, RefreshTokenHttpProps } from '@/interface';
import { APIS_URL } from '@/config';
import { provideHttpClient } from '@angular/common/http';

describe('AuthService', () => {
  let service: AuthService;
  let httpMock: HttpTestingController;
  const mockLoginResponse = { token: 'fake-token' };
  const mockRefreshResponse: RefreshTokenHttpProps = {
    accessToken: 'new-access-token',
    refreshToken: 'new-refresh-token',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [],
      providers: [AuthService, provideHttpClient(), provideHttpClientTesting()],
    });

    service = TestBed.inject(AuthService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify(); // Verify no outstanding requests
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('login', () => {
    const loginData: LoginProps = {
      username: 'testuser',
      password: 'testpass',
    };

    it('should make a POST request to login endpoint', () => {
      service.login(loginData).subscribe((response) => {
        expect(response).toEqual(mockLoginResponse);
      });

      const req = httpMock.expectOne(APIS_URL.LOGIN);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual(loginData);
      req.flush(mockLoginResponse);
    });

    it('should handle login error', () => {
      const errorMessage = 'Login failed';

      service.login(loginData).subscribe({
        error: (err) => {
          expect(err.status).toBe(401);
          expect(err.statusText).toBe('Unauthorized');
        },
      });

      const req = httpMock.expectOne(APIS_URL.LOGIN);
      req.flush(errorMessage, {
        status: 401,
        statusText: 'Unauthorized',
      });
    });
  });

  describe('refreshToken', () => {
    const refreshToken = 'old-refresh-token';

    it('should make a POST request to refresh endpoint', () => {
      service.refreshToken(refreshToken).subscribe((response) => {
        expect(response).toEqual(mockRefreshResponse);
      });

      const req = httpMock.expectOne(APIS_URL.REFRESH_AUTH);
      expect(req.request.method).toBe('POST');
      expect(req.request.body).toEqual({ refreshToken });
      req.flush(mockRefreshResponse);
    });

    it('should handle refresh error', () => {
      const errorMessage = 'Refresh failed';

      service.refreshToken(refreshToken).subscribe({
        error: (err) => {
          expect(err.status).toBe(400);
          expect(err.statusText).toBe('Bad Request');
        },
      });

      const req = httpMock.expectOne(APIS_URL.REFRESH_AUTH);
      req.flush(errorMessage, {
        status: 400,
        statusText: 'Bad Request',
      });
    });
  });
});
