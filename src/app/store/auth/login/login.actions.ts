import { createAction, props } from '@ngrx/store';
import { LoginProps, UserProps } from '@/interface';

export const LOGIN_ACTION = '[Auth] Login';
export const LOGIN_SUCCESS_ACTION = '[Auth] Login Success';
export const LOGIN_FAILURE_ACTION = '[Auth] Login Failure';
export const LOGIN_LOADING_ACTION = '[Auth] Login Loading';
export const LOGIN_RESET_ACTION = '[Auth] Login reset';
export const AUTH_REHYDRATE = '[Auth] Login reset';

export const login = createAction(LOGIN_ACTION, props<LoginProps>());

export const loginSuccess = createAction(
  LOGIN_SUCCESS_ACTION,
  props<{ user: UserProps }>()
);

export const loginFailure = createAction(
  LOGIN_FAILURE_ACTION,
  props<{ error: any }>()
);

export const loginLoading = createAction(
  LOGIN_LOADING_ACTION,
  props<{ isloading: boolean }>()
);

export const authRehydrate = createAction(
  AUTH_REHYDRATE,
  props<{ user: string; accessToken: string; refreshToken: string }>()
);

export const loginReset = createAction(LOGIN_RESET_ACTION);
