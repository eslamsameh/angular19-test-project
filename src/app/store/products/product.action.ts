import { createAction, props } from '@ngrx/store';
import { ProductItem } from '@/interface';

export const LOAD_PRODUCT = '[Products] Load Products';
export const PRODUCT_SUCCESS_ACTION = '[Products] Load Products Success';
export const PRODUCT_FAILURE_ACTION = '[Products] Load Products Failure';
export const LOAD_SINGLE_PRODUCT_ACTION = '[Products] Load Single Product';
export const SINGLE_PRODUCT_SUCCESS_ACTION =
  '[Products] Load Single Product Success';

export const loadProducts = createAction(LOAD_PRODUCT);

export const loadProductsSuccess = createAction(
  PRODUCT_SUCCESS_ACTION,
  props<{ products: ProductItem[] }>()
);

export const loadProductsFailure = createAction(
  PRODUCT_FAILURE_ACTION,
  props<{ error: any }>()
);

export const loadSingleProduct = createAction(
  LOAD_SINGLE_PRODUCT_ACTION,
  props<{ id: string }>()
);

export const loadSingleProductSuccess = createAction(
  SINGLE_PRODUCT_SUCCESS_ACTION,
  props<{ product: ProductItem }>()
);
