import { ProductsState } from '@/interface';
import { productsReducer } from './product.reduce';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './product.action';

describe('LoginReducer', () => {
  const initialState: ProductsState = {
    products: [],
    loading: false,
    error: null,
    isSuccess: false,
    singleProduct: null,
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = productsReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle loadProducts', () => {
    const action = loadProducts();
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
      isSuccess: false,
    });
  });

  it('should handle loadProductsSuccess', () => {
    const products = { id: 1, title: 'test' } as any;
    const action = loadProductsSuccess({ products });
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      products,
      loading: false,
      isSuccess: true,
    });
  });

  it('should handle loadProductsFailure', () => {
    const error = 'Login failed';
    const action = loadProductsFailure({ error });
    const state = productsReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error,
      loading: false,
      isSuccess: false,
    });
  });
});
