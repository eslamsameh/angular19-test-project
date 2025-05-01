import { TestBed } from '@angular/core/testing';

import { ProductsService } from './products.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { APIS_URL } from '@/config';

describe('ProductsService', () => {
  let service: ProductsService;
  let httpMock: HttpTestingController;
  const mockPorductResponse = [{ name: 'productName', description: 'desc' }];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductsService,
        provideHttpClient(),
        provideHttpClientTesting(),
      ],
    });
    service = TestBed.inject(ProductsService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('getProducts', () => {
    it('should make a GET request to getProducts endpoint', () => {
      service.getProducts().subscribe((response) => {
        expect(response).toEqual(mockPorductResponse);
      });

      const req = httpMock.expectOne(APIS_URL.GET_PRODUCTS);
      expect(req.request.method).toBe('GET');
      req.flush(mockPorductResponse);
    });
  });

  it('should handle login error', () => {
    const errorMessage = 'Login failed';

    service.getProducts().subscribe({
      error: (err) => {
        expect(err.status).toBe(500);
        expect(err.statusText).toBe('Internal Server Error');
      },
    });

    const req = httpMock.expectOne(APIS_URL.GET_PRODUCTS);
    req.flush(errorMessage, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  });
});
