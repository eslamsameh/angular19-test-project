export interface BaseEntity {
  id: string | number | undefined;
}

export interface BaseState {
  loading: boolean;
  error: any | null;
  isSuccess: boolean;
}

export * from './auth.interface';
export * from './menu.interface';
