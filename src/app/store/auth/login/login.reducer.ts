import { createReducer, on } from '@ngrx/store';
import {
  login,
  loginSuccess,
  loginFailure,
  loginReset,
  authRehydrate,
} from './login.actions';
import { LoginState } from '@/interface';

export const initialState: LoginState = {
  user: null,
  loading: false,
  error: null,
  isSuccess: false,
};

export const loginReducer = createReducer(
  initialState,
  on(login, (state) => ({
    ...state,
    loading: true,
    error: null,
    isSuccess: false,
  })),
  on(loginSuccess, (state, { user }) => {
    return {
      ...state,
      user,
      loading: false,
      isSuccess: true,
    };
  }),
  on(loginFailure, (state, { error }) => ({
    ...state,
    error,
    loading: false,
    isSuccess: false,
  })),
  on(loginReset, (state) => ({
    error: null,
    loading: false,
    isSuccess: false,
    user: state.user,
  })),
  on(authRehydrate, (state, { user, accessToken, refreshToken }) => {
    const retreviedUser = JSON.parse(decodeURI(user));
    return {
      ...state,
      user: { ...retreviedUser, accessToken, refreshToken },
      isSuccess: false,
      error: null,
    };
  })
);
