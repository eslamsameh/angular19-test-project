import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('@/pages/main/home/home.component').then(
            (m) => m.HomeComponent
          ),
      },
    ],
    // all pages with header
  },

  {
    path: 'auth',
    loadComponent: () =>
      import('@/pages/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@/pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@/pages/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
