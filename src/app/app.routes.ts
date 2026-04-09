import { Routes } from '@angular/router';
import { AppLayout } from './layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: AppLayout,
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      {
        path: 'dashboard',
        loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard').then(m => m.Dashboard),
        title: 'Overview — Operations Console'
      },
      {
        path: 'calls',
        loadComponent: () => import('./features/calls/pages/calls-page/calls').then(m => m.Calls),
        title: 'Call Logs — Operations Console'
      },
      {
        path: 'features',
        loadComponent: () => import('./features/feature-tracker/features').then(m => m.Features),
        title: 'Features — Operations Console'
      },
      {
        path: 'features/bookings',
        loadComponent: () => import('./features/feature-tracker/bookings/bookings').then(m => m.Bookings),
        title: 'Bookings — Operations Console'
      },
      {
        path: 'features/transcripts',
        loadComponent: () => import('./features/feature-tracker/transcripts/transcripts').then(m => m.Transcripts),
        title: 'Transcripts — Operations Console'
      },
      {
        path: 'features/analytics',
        loadComponent: () => import('./features/feature-tracker/analytics/analytics').then(m => m.Analytics),
        title: 'Analytics — Operations Console'
      },
      {
        path: 'features/sentiment',
        loadComponent: () => import('./features/feature-tracker/sentiment/sentiment').then(m => m.Sentiment),
        title: 'Sentiment — Operations Console'
      },
      {
        path: 'features/crm',
        loadComponent: () => import('./features/feature-tracker/crm/crm').then(m => m.Crm),
        title: 'CRM — Operations Console'
      },
      {
        path: 'settings',
        loadComponent: () => import('./features/settings/pages/settings-page/settings').then(m => m.Settings),
        title: 'Settings — Operations Console'
      }
    ]
  },
  { path: '**', redirectTo: 'dashboard' }
];

