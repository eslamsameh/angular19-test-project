import { TestBed } from '@angular/core/testing';
import { provideMockActions } from '@ngrx/effects/testing';
import { Observable, of, throwError } from 'rxjs';
import { ProductsService } from '@/services';
import { ProductItem, UserProps } from '@/interface';
import { constants } from '@/config';
import { ProductsEffects } from './product.efffect';
import {
  loadProducts,
  loadProductsSuccess,
  PRODUCT_FAILURE_ACTION,
} from './product.action';

describe('ProductsEffects', () => {
  let actions$: Observable<any>;
  let effects: ProductsEffects;
  let productService: jasmine.SpyObj<ProductsService>;

  beforeEach(() => {
    const productServiceSpy = jasmine.createSpyObj('ProductsService', [
      'getProducts',
    ]);

    TestBed.configureTestingModule({
      providers: [
        ProductsEffects,
        provideMockActions(() => actions$),
        { provide: ProductsService, useValue: productServiceSpy },
      ],
    });

    effects = TestBed.inject(ProductsEffects);
    productService = TestBed.inject(
      ProductsService
    ) as jasmine.SpyObj<ProductsService>;
  });

  describe('getProducts$', () => {
    it('should dispatch loadProductsSuccess on successful get products', () => {
      const products = [{ title: 'Test Product' }] as ProductItem[];

      const action = loadProducts();
      const outcome = loadProductsSuccess({ products });

      actions$ = of(action);
      productService.getProducts.and.returnValue(of({ products: products }));

      effects.loadProducts$.subscribe((result) => {
        expect(result).toEqual(outcome);
      });
    });

    it('should dispatch loginFailure on login error', () => {
      const error = new Error('Login failed');
      const action = loadProducts();

      actions$ = of(action);
      productService.getProducts.and.returnValue(throwError(() => error));

      effects.loadProducts$.subscribe((result) => {
        expect(result.type).toEqual(PRODUCT_FAILURE_ACTION);
      });
    });
  });
});
