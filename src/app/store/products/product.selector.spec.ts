import { LoginState, ProductItem, ProductsState, UserProps } from '@/interface';
import {
  selectProducts,
  selectProductsFailure,
  selectProductsLoading,
  selectProductsSuccess,
} from './product.selector';

describe('ProductsSelectors', () => {
  const initialState: ProductsState = {
    products: null,
    loading: false,
    error: null,
    isSuccess: false,
    singleProduct: null,
  };

  it('should select the products state', () => {
    const products = [{ title: 'Test product' }] as ProductItem[];
    const result = selectProducts.projector({
      ...initialState,
      products: products,
    });
    expect(result).toEqual(products);
  });

  it('should select the products loaded successfully', () => {
    const stateWithSuccess = { ...initialState, isSuccess: true };
    const result = selectProductsSuccess.projector(stateWithSuccess);
    expect(result).toBeTrue();
  });

  it('should select the products if had failure', () => {
    const error = 'Login failed';
    const stateWithError = { ...initialState, error };
    const result = selectProductsFailure.projector(stateWithError);
    expect(result).toEqual(error);
  });

  it('should select the products if is loading', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const result = selectProductsLoading.projector(stateWithLoading);
    expect(result).toBeTrue();
  });
});
