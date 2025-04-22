import { loginReducer } from './login.reducer';
import {
  login,
  loginSuccess,
  loginFailure,
  loginReset,
  authRehydrate,
} from './login.actions';
import { LoginState } from '@/interface';

describe('LoginReducer', () => {
  const initialState: LoginState = {
    user: null,
    loading: false,
    error: null,
    isSuccess: false,
  };

  it('should return the initial state', () => {
    const action = {} as any;
    const state = loginReducer(undefined, action);
    expect(state).toEqual(initialState);
  });

  it('should handle login', () => {
    const action = login({ username: 'test', password: 'pass' });
    const state = loginReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      loading: true,
      error: null,
      isSuccess: false,
    });
  });

  it('should handle loginSuccess', () => {
    const user = { id: 1, username: 'testuser' } as any;
    const action = loginSuccess({ user });
    const state = loginReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      user,
      loading: false,
      isSuccess: true,
    });
  });

  it('should handle loginFailure', () => {
    const error = 'Login failed';
    const action = loginFailure({ error });
    const state = loginReducer(initialState, action);
    expect(state).toEqual({
      ...initialState,
      error,
      loading: false,
      isSuccess: false,
    });
  });

  it('should handle authRehydrate with new user', () => {
    const userData = {
      username: 'testuser',
      email: 'test@test.com',
    };
    const action = authRehydrate({
      user: JSON.stringify(userData),
      accessToken: 'token',
      refreshToken: 'refresh',
    });
    const state = loginReducer(initialState, action);
    expect(state.user).toEqual({
      ...userData,
      accessToken: 'token',
      refreshToken: 'refresh',
    } as any);
  });
});
