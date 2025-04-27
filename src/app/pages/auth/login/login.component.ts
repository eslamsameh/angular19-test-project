import {
  ChangeDetectionStrategy,
  Component,
  computed,
  effect,
  inject,
  OnDestroy,
  Signal,
  signal,
} from '@angular/core';
import {
  ReactiveFormsModule,
  NonNullableFormBuilder,
  FormGroup,
} from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { Store } from '@ngrx/store';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { Router, RouterModule } from '@angular/router';
import { buildLoginForm, toastFailLogin, toastSuccessLogin } from '@/forms';
import { InputGroupModule } from 'primeng/inputgroup';

import {
  loginAction,
  selectLoginFailure,
  selectLoginLoading,
  selectLoginSuccess,
} from '@/store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ToastModule,
    RouterModule,
    InputGroupModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private store = inject(Store);
  private messageService = inject(MessageService);
  private router = inject(Router);
  readonly loginSuccess = this.store.selectSignal(selectLoginSuccess);
  readonly loginError = this.store.selectSignal(selectLoginFailure);
  readonly loginLoading = this.store.selectSignal(selectLoginLoading);
  loginForm: Signal<FormGroup> = signal(buildLoginForm(this.fb));

  usernameControl = computed(() => this.loginForm().get('username'));
  passwordControl = computed(() => this.loginForm().get('password'));

  constructor() {
    effect(() => {
      if (this.loginSuccess()) {
        this.messageService.add(toastSuccessLogin);
        this.router.navigate(['']);
      }

      if (this.loginError()) {
        this.messageService.add(toastFailLogin);
      }
    });
  }

  onSubmit() {
    if (this.loginForm().valid) {
      this.store.dispatch(loginAction(this.loginForm().getRawValue()));
    }
  }
}
