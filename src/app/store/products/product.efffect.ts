import { inject, Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import {
  loadProducts,
  loadProductsSuccess,
  loadProductsFailure,
} from './product.action';
import { catchError, map, mergeMap, of, take } from 'rxjs';
import { ProductsService } from '@/services';

@Injectable()
export class ProductsEffects {
  private actions$ = inject(Actions);
  private productsService = inject(ProductsService);

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productsService.getProducts().pipe(
          map((data) => data.products.slice(0, 10)),
          map((products) => loadProductsSuccess({ products })),
          catchError((error) => of(loadProductsFailure({ error })))
        )
      )
    )
  );
}
