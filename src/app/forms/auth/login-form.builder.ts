import { NonNullableFormBuilder, Validators } from '@angular/forms';
import { ToastMessageOptions } from 'primeng/api';

export function buildLoginForm(fb: NonNullableFormBuilder) {
  return fb.group({
    username: fb.control('', [Validators.required]),
    password: fb.control('', [Validators.required, Validators.minLength(6)]),
  });
}

export const toastSuccessLogin: ToastMessageOptions = {
  severity: 'success',
  summary: 'Login Successful',
  detail: 'Welcome back!',
};

export const toastFailLogin: ToastMessageOptions = {
  severity: 'error',
  summary: 'Login Failed',
  detail: 'Invalid credentials.',
};
