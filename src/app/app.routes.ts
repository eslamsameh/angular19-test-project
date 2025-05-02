import { Routes } from '@angular/router';
import { singleProductResolver } from '@/core/resolvers';
import { authRedirectGuard } from '@/core/guards';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('@/pages/main/main.component').then((m) => m.MainComponent),
    children: [
      {
        path: 'home',
        loadComponent: () =>
          import('@/pages/main/home/home.component').then(
            (m) => m.HomeComponent
          ),
        title: 'Home - Explore The App Features',
      },
      {
        path: 'products/:id',
        loadComponent: () =>
          import('@/pages/main/single-product/single-product.component').then(
            (m) => m.SingleProductComponent
          ),
        resolve: {
          productLoaded: singleProductResolver,
        },
      },
      {
        path: '',
        redirectTo: '/home',
        pathMatch: 'full',
      },
    ],
    // all pages with header
  },

  {
    path: 'auth',
    canActivate: [authRedirectGuard],
    loadComponent: () =>
      import('@/pages/auth/auth.component').then((m) => m.AuthComponent),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('@/pages/auth/login/login.component').then(
            (m) => m.LoginComponent
          ),
        title: 'Login - Login now to start explore the app features',
      },
      {
        path: 'register',
        loadComponent: () =>
          import('@/pages/auth/register/register.component').then(
            (m) => m.RegisterComponent
          ),
        title:
          'Register - Not have an account signup to explore the app features',
      },
      {
        path: '',
        redirectTo: '/auth/login',
        pathMatch: 'full',
      },
    ],
  },
  { path: '**', redirectTo: '' },
];
