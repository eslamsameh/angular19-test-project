import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { loadSingleProduct } from '@/store/products/product.action';
import {
  selectProducts,
  selectSingleProduct,
} from '@/store/products/product.selector';
import { ProductItem } from '@/interface';
import { filter, map, switchMap, take } from 'rxjs/operators';
import { of } from 'rxjs';

export const singleProductResolver: ResolveFn<ProductItem | null> = (
  route,
  state
) => {
  const store = inject(Store);
  const id = Number(route.paramMap.get('id'));

  if (!id) return of(null);

  return store.select(selectProducts).pipe(
    take(1), // only get the current value of the products array
    switchMap((products) => {
      const productInList = products?.find((p) => p.id === id);

      if (productInList) {
        // Product already exists in store, set it as singleProduct manually if needed
        return of(productInList);
      }

      // Dispatch action to fetch single product
      store.dispatch(loadSingleProduct({ id: id.toString() }));

      // Wait until the correct product is loaded
      return store.select(selectSingleProduct).pipe(
        filter(
          (product): product is ProductItem => !!product && product.id === id
        ),
        take(1)
      );
    })
  );
};
