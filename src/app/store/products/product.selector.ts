import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductsState } from '@/interface';

export const selectProductsState =
  createFeatureSelector<ProductsState>('products');

export const selectProductsSuccess = createSelector(
  selectProductsState,
  (state) => {
    return state.isSuccess;
  }
);

export const selectProducts = createSelector(selectProductsState, (state) => {
  return state.products;
});

export const selectProductsFailure = createSelector(
  selectProductsState,
  (state) => state.error
);

export const selectProductsLoading = createSelector(
  selectProductsState,
  (state) => state.loading
);
