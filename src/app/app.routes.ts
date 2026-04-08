import { Routes } from '@angular/router';
import { AppLayout } from './layout/app-layout/app-layout';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./pages/dashboard/dashboard').then(m => m.Dashboard),
        title: 'Overview — Operations Console'
      },
      {
        path: 'calls',
        loadComponent: () => import('./pages/calls/calls').then(m => m.Calls),
        title: 'Call Logs — Operations Console'
      },
      {
        path: 'features',
        loadComponent: () => import('./pages/features/features').then(m => m.Features),
        title: 'Features — Operations Console'
      },
      {
        path: 'features/bookings',
        loadComponent: () => import('./pages/features/bookings/bookings').then(m => m.Bookings),
        title: 'Bookings — Operations Console'
      },
      {
        path: 'features/transcripts',
        loadComponent: () => import('./pages/features/transcripts/transcripts').then(m => m.Transcripts),
        title: 'Transcripts — Operations Console'
      },
      {
        path: 'features/analytics',
        loadComponent: () => import('./pages/features/analytics/analytics').then(m => m.Analytics),
        title: 'Analytics — Operations Console'
      },
      {
        path: 'features/sentiment',
        loadComponent: () => import('./pages/features/sentiment/sentiment').then(m => m.Sentiment),
        title: 'Sentiment — Operations Console'
      },
      {
        path: 'features/crm',
        loadComponent: () => import('./pages/features/crm/crm').then(m => m.Crm),
        title: 'CRM — Operations Console'
      },
      {
        path: 'settings',
        loadComponent: () => import('./pages/settings/settings').then(m => m.Settings),
        title: 'Settings — Operations Console'
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

