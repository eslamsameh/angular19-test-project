import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  HttpInterceptorFn,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { baseUrlInterceptor } from './base-url.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { environment } from '@/environment/environment';

describe('baseUrlInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    http = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should add the base url from environment', () => {
    http.get('test-url').subscribe();
    const req = httpMock.expectOne(environment.apiUrl + 'test-url');
    expect(req.request.url).toBe(environment.apiUrl + 'test-url');
    req.flush({});
  });

  it('should not add the base url from environment', () => {
    http.get('https://stackoverflow.com').subscribe();
    const req = httpMock.expectOne('https://stackoverflow.com');
    expect(req.request.url).toBe('https://stackoverflow.com');
    req.flush({});
  });
});
