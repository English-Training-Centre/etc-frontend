import { Routes } from '@angular/router';
import { Modules } from './modules/modules';

export const routes: Routes = [
  {
    path: '',
    title: 'ETC · Student',
    loadComponent: () => import('../../../core/src/lib/loaders/check-loader/check-loader').then(l => l.CheckLoader)
  },
  {
    path: 'student',
    component: Modules,
    children: [
      {
        path: 'dashboard',
        title: 'ETC · Student · Dashboard',
        loadComponent:() => import('./layouts/dashboard/dashboard').then(m => m.Dashboard)
      },
      {
        path: 'payments',
        title: 'ETC · Student · Payments',
        loadComponent:() => import('./layouts/payments/payments').then(m => m.Payments)
      }
    ]
  }
];
