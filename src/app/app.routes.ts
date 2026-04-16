import { Routes } from '@angular/router';
import { AppLayout } from './layout/layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/landing/landing').then(m => m.Landing),
    title: 'Pre-Sales 360-AI Unified Customer Experience System — AI Voice Agent Dashboard'
  },
  {
    path: 'login',
    loadComponent: () => import('./features/auth/login/login').then(m => m.Login),
    title: 'Sign In — Pre-Sales 360-AI Unified Customer Experience System'
  },
  {
    path: 'register',
    loadComponent: () => import('./features/auth/register/register').then(m => m.Register),
    title: 'Create Account — Pre-Sales 360-AI Unified Customer Experience System'
  },
  {
    path: '',
    component: AppLayout,
    canActivate: [authGuard],
    children: [
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/pages/dashboard-page/dashboard').then(m => m.Dashboard),          title: 'Overview — Pre-Sales 360-AI Unified Customer Experience System'                   },
      { path: 'calls',     loadComponent: () => import('./features/calls/pages/calls-page/calls').then(m => m.Calls),                          title: 'Call Logs — Pre-Sales 360-AI Unified Customer Experience System'                  },
      { path: 'features',  loadComponent: () => import('./features/feature-tracker/features').then(m => m.Features),                           title: 'Features — Pre-Sales 360-AI Unified Customer Experience System'                   },
      { path: 'features/bookings',       loadComponent: () => import('./features/feature-tracker/bookings/bookings').then(m => m.Bookings),             title: 'Bookings Calendar — Pre-Sales 360-AI Unified Customer Experience System'          },
      { path: 'features/transcripts',    loadComponent: () => import('./features/feature-tracker/transcripts/transcripts').then(m => m.Transcripts),   title: 'Transcripts & Recordings — Pre-Sales 360-AI Unified Customer Experience System'   },
      { path: 'features/prompt-settings',loadComponent: () => import('./features/feature-tracker/prompt-settings/prompt-settings').then(m => m.PromptSettings), title: 'Prompt & Knowledge Base — Pre-Sales 360-AI Unified Customer Experience System' },
      { path: 'features/analytics',      loadComponent: () => import('./features/feature-tracker/analytics/analytics').then(m => m.Analytics),         title: 'Data Analytics — Pre-Sales 360-AI Unified Customer Experience System'             },
      { path: 'features/sentiment',      loadComponent: () => import('./features/feature-tracker/sentiment/sentiment').then(m => m.Sentiment),         title: 'Sentiment Analysis — Pre-Sales 360-AI Unified Customer Experience System'         },
      { path: 'features/crm',            loadComponent: () => import('./features/feature-tracker/crm/crm').then(m => m.Crm),                           title: 'CRM Integration — Pre-Sales 360-AI Unified Customer Experience System'            },
      { path: 'settings',                loadComponent: () => import('./features/settings/pages/settings-page/settings').then(m => m.Settings),        title: 'Settings — Pre-Sales 360-AI Unified Customer Experience System'                   },
    ]
  },
  { path: '**', redirectTo: '' }
];
