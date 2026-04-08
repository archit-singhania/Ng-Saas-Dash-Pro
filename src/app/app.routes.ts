import { Routes } from '@angular/router';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      {
        path: '',
        redirectTo: 'dashboard',
        pathMatch: 'full'
      },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        title: 'Dashboard — VoBiz'
      },
      {
        path: 'features',
        loadComponent: () => import('./pages/features/features').then(m => m.Features),
        title: 'Features — VoBiz'
      },
      {
        path: 'calls',
        loadComponent: () => import('./pages/calls/calls').then(m => m.Calls),
        title: 'Call Logs — VoBiz'
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.Settings),
        title: 'Settings — VoBiz'
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];
