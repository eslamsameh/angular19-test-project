import { inject } from '@angular/core';
import { ResolveFn } from '@angular/router';
import { Store } from '@ngrx/store';
import { ProductItem } from '@/interface';
import {
  selectProducts,
  selectSingleProduct,
} from '@/store/products/product.selector';
import { loadSingleProduct } from '@/store/products/product.action';
import { withCachedRequest } from '@/helpers';
import { of } from 'rxjs';

export const singleProductResolver: ResolveFn<ProductItem | null> = (route) => {
  const store = inject(Store);
  const id = Number(route.paramMap.get('id'));
  if (!id) return of(null);

  return withCachedRequest<ProductItem>(
    store.select(selectProducts),
    (item) => item.id === id,
    () => store.dispatch(loadSingleProduct({ id: id.toString() })),
    store.select(selectSingleProduct)
  );
};
