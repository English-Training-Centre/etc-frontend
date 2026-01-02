import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    title: 'ETC · Loading...',
    loadComponent: () => import('./module-auth/module-auth').then(a => a.ModuleAuth),
    children:
    [
      {
        path: '',
        title: 'ETC · Loading...',
        loadComponent: () => import('./layouts/initial-loader/initial-loader').then(l => l.InitialLoader)
      },
      {
        path: 'sign-in',
        title: 'ETC · Sign In',
        loadComponent: () => import('./layouts/sign-in-auth/sign-in-auth').then(a => a.SignInAuth)
      },
      {
        path: 'forgot-password',
        title: 'ETC · Forgot Password',
        loadComponent: () => import('./layouts/forgot-password-auth/forgot-password-auth').then(a => a.ForgotPasswordAuth)
      },
      {
        path: 'validate-code',
        title: 'ETC · Validadte Code',
        loadComponent: () => import('./layouts/validate-code-auth/validate-code-auth').then(a => a.ValidateCodeAuth)
      },
      {
        path: 'reset-password',
        title: 'ETC · Reset Password',
        loadComponent: () => import('./layouts/reset-password-auth/reset-password-auth').then(a => a.ResetPasswordAuth)
      },
      {
        path: 'success',
        title: 'ETC · Success',
        loadComponent: () => import('./layouts/success-auth/success-auth').then(a => a.SuccessAuth)
      }
    ]
  },
  {
    path: 'admin',
    title: 'ETC · Admin',
    loadChildren: () => import('../../../admin/src/app/app.routes').then(a => a.routes)
  },
  {
    path: 'student',
    title: 'ETC · Student',
    loadChildren: () => import('../../../student/src/app/app.routes').then(s => s.routes)
  }
];
