import { Routes } from '@angular/router';
import { AppLayout } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then(m => m.Landing),
    title: 'Operations Console — AI Voice Agent Dashboard'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    title: 'Sign In — Operations Console'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
    title: 'Create Account — Operations Console'
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard').then(m => m.Dashboard),          title: 'Overview — Operations Console'                   },
      { path: 'calls',     loadComponent: () => import('./features/calls/pages/calls-page/calls').then(m => m.Calls),                          title: 'Call Logs — Operations Console'                  },
      { path: 'features',  loadComponent: () => import('./features/feature-tracker/features').then(m => m.Features),                           title: 'Features — Operations Console'                   },
      { path: 'features/bookings',       loadComponent: () => import('./features/feature-tracker/bookings/bookings').then(m => m.Bookings),             title: 'Bookings Calendar — Operations Console'          },
      { path: 'features/transcripts',    loadComponent: () => import('./features/feature-tracker/transcripts/transcripts').then(m => m.Transcripts),   title: 'Transcripts & Recordings — Operations Console'   },
      { path: 'features/prompt-settings',loadComponent: () => import('./features/feature-tracker/prompt-settings/prompt-settings').then(m => m.PromptSettings), title: 'Prompt & Knowledge Base — Operations Console' },
      { path: 'features/analytics',      loadComponent: () => import('./features/feature-tracker/analytics/analytics').then(m => m.Analytics),         title: 'Data Analytics — Operations Console'             },
      { path: 'features/sentiment',      loadComponent: () => import('./features/feature-tracker/sentiment/sentiment').then(m => m.Sentiment),         title: 'Sentiment Analysis — Operations Console'         },
      { path: 'features/crm',            loadComponent: () => import('./features/feature-tracker/crm/crm').then(m => m.Crm),                           title: 'CRM Integration — Operations Console'            },
      { path: 'settings',                loadComponent: () => import('./features/settings/pages/settings-page/settings').then(m => m.Settings),        title: 'Settings — Operations Console'                   },
    ]
  },
  { path: '**', redirectTo: '' }
];
