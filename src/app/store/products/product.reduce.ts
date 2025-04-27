import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.action';
import { ProductItem, ProductsState } from '@/interface';

export const initialState: ProductsState = {
  products: [],
  loading: false,
  isSuccess: false,
  error: null,
};

export const productsReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({ ...state, loading: true })),
  on(loadProductsSuccess, (state, { products }) => ({
    ...state,
    loading: false,
    products,
    isSuccess: true,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
    isSuccess: false,
  }))
);
