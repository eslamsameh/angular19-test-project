import { BaseEntity, BaseState } from '.';

export interface LoginProps {
  username: string;
  password: string;
}

export interface RefreshTokenHttpProps {
  accessToken: string;
  refreshToken: string;
}

export interface UserProps extends BaseEntity, RefreshTokenHttpProps {
  email: string;
  username: string;
  firstName: string;
  gender: 'female' | 'mail';
  image: string;
  lastName: string;
}

export interface LoginState extends BaseState {
  user: UserProps | null;
}
