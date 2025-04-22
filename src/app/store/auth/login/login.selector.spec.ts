import {
  selectLoginAuthState,
  selectLoginSuccess,
  selectLoginFailure,
  selectLoginLoading,
  selectUserLogout,
} from './login.selectors';
import { LoginState } from '@/interface';

describe('LoginSelectors', () => {
  const initialState: LoginState = {
    user: null,
    loading: false,
    error: null,
    isSuccess: false,
  };

  it('should select the login state', () => {
    const result = selectLoginAuthState.projector(initialState);
    expect(result).toEqual(initialState);
  });

  it('should select login success', () => {
    const stateWithSuccess = { ...initialState, isSuccess: true };
    const result = selectLoginSuccess.projector(stateWithSuccess);
    expect(result).toBeTrue();
  });

  it('should select login failure', () => {
    const error = 'Login failed';
    const stateWithError = { ...initialState, error };
    const result = selectLoginFailure.projector(stateWithError);
    expect(result).toEqual(error);
  });

  it('should select login loading', () => {
    const stateWithLoading = { ...initialState, loading: true };
    const result = selectLoginLoading.projector(stateWithLoading);
    expect(result).toBeTrue();
  });

  it('should select user logout state', () => {
    const logoutState = {
      user: null,
      loading: false,
      error: null,
      isSuccess: false,
    };
    const result = selectUserLogout.projector(logoutState);
    expect(result).toBeTrue();
  });

  it('should not select user logout when loading', () => {
    const loadingState = { ...initialState, loading: true };
    const result = selectUserLogout.projector(loadingState);
    expect(result).toBeFalse();
  });
});
