import { createFeatureSelector, createSelector } from '@ngrx/store';
import { LoginState, UserProps } from '@/interface';

export const selectLoginAuthState = createFeatureSelector<LoginState>('login');

export const selectLoginSuccess = createSelector(
  selectLoginAuthState,
  (state) => {
    return state.isSuccess;
  }
);

export const selectLoginFailure = createSelector(
  selectLoginAuthState,
  (state) => state.error
);

export const selectLoginLoading = createSelector(
  selectLoginAuthState,
  (state) => state.loading
);

export const selectUserLogout = createSelector(
  selectLoginAuthState,
  (state) =>
    !state.loading && !state.error && state.user === null && !state.isSuccess
);
