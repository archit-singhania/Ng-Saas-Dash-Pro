export const APP_NAME = 'Pre-Sales 360-AI Unified Customer Experience System';
export const APP_VERSION = '1.0.0';

export const API_BASE = '/api/v1';

export const PAGINATION_ROWS = 10;
export const PAGINATION_OPTIONS = [10, 25, 50, 100];

export const DATE_FORMAT = 'DD MMM YYYY';
export const DATETIME_FORMAT = 'DD MMM YYYY, HH:mm';

export const CALL_STATUSES = ['Completed', 'Missed', 'In Progress'] as const;

export const STORAGE_KEYS = {
  THEME_MODE:    'ops-console-theme',
  THEME_PRIMARY: 'ops-console-primary',
  THEME_SURFACE: 'ops-console-surface',
} as const;
