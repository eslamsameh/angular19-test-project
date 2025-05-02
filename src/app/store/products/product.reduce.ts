import { createReducer, on } from '@ngrx/store';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
  loadSingleProductSuccess,
  loadSingleProduct,
} from './product.action';
import { ProductItem, ProductsState } from '@/interface';

export const initialState: ProductsState = {
  products: [],
  loading: false,
  isSuccess: false,
  error: null,
  singleProduct: null,
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
  })),
  on(loadSingleProduct, (state) => ({ ...state, loading: true })),
  on(loadSingleProductSuccess, (state, { product }) => ({
    ...state,
    loading: false,
    singleProduct: product,
    isSuccess: true,
  }))
);
