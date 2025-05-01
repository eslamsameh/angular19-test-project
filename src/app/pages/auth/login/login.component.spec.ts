import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { provideMockStore, MockStore } from '@ngrx/store/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import {
  loginAction,
  loginReset,
  selectLoginFailure,
  selectLoginLoading,
  selectLoginSuccess,
} from '@/store';
import { toastFailLogin, toastSuccessLogin } from '@/forms';
import { RouterModule } from '@angular/router';
import { routes } from '@/app.routes';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let store: MockStore;
  let messageService: MessageService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        ButtonModule,
        InputTextModule,
        CardModule,
        ToastModule,
        LoginComponent,
        RouterModule.forRoot(routes),
      ],
      providers: [
        MessageService,
        provideMockStore({
          initialState: {},
          selectors: [
            { selector: selectLoginSuccess, value: false },
            { selector: selectLoginFailure, value: false },
            { selector: selectLoginLoading, value: false },
          ],
        }),
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    store = TestBed.inject(MockStore);
    messageService = TestBed.inject(MessageService);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize login form with required validators', () => {
    const form = component.loginForm();
    expect(form).toBeTruthy();
    expect(form.get('username')?.hasError('required')).toBeTrue();
    expect(form.get('password')?.hasError('required')).toBeTrue();
  });

  it('should dispatch loginAction when form is valid and submitted', () => {
    const dispatchSpy = spyOn(store, 'dispatch');
    const form = component.loginForm();

    // Set valid values
    form.patchValue({
      username: 'testuser',
      password: 'password123',
    });

    component.onSubmit();

    expect(dispatchSpy).toHaveBeenCalledWith(
      loginAction({
        username: 'testuser',
        password: 'password123',
      })
    );
  });

  it('should show success toast when loginSuccess is true', () => {
    const addSpy = spyOn(messageService, 'add');

    // First ensure the effect runs by triggering change detection
    fixture.detectChanges();

    // Now override the selector and refresh state
    store.overrideSelector(selectLoginSuccess, true);
    store.refreshState();

    // Trigger change detection again to ensure the effect runs
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith(toastSuccessLogin);
  });

  it('should show fail toast when loginError is true', () => {
    const addSpy = spyOn(messageService, 'add');

    // First ensure the effect runs by triggering change detection
    fixture.detectChanges();

    // Now override the selector and refresh state
    store.overrideSelector(selectLoginFailure, true);
    store.refreshState();

    // Trigger change detection again to ensure the effect runs
    fixture.detectChanges();

    expect(addSpy).toHaveBeenCalledWith(toastFailLogin);
  });

  it('should have computed controls', () => {
    expect(component.usernameControl()).toBe(
      component.loginForm().get('username')
    );
    expect(component.passwordControl()).toBe(
      component.loginForm().get('password')
    );
  });

  it('should update validity messages when controls are touched', () => {
    const form = component.loginForm();
    const usernameControl = form.get('username');
    const passwordControl = form.get('password');

    // Initially not touched
    fixture.detectChanges();
    let errorElements = fixture.nativeElement.querySelectorAll('.p-error');
    expect(errorElements.length).toBe(0);

    // Touch and blur controls
    usernameControl?.markAsTouched();
    passwordControl?.markAsTouched();
    fixture.detectChanges();

    errorElements = fixture.nativeElement.querySelectorAll('.p-error');
    expect(errorElements.length).toBe(4); // two for each field
  });

  it('should navigate to register page when Register link is clicked', () => {
    const loginLink =
      fixture.debugElement.nativeElement.querySelector('.register-link');
    expect(loginLink).toBeTruthy();

    loginLink.click();
    const href = loginLink.getAttribute('href');

    expect(href).toBe('/auth/register');
  });
});
