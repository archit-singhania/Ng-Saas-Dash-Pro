import { Injectable, signal, effect, PLATFORM_ID, inject } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

export type ThemeMode = 'light' | 'dark' | 'system';

@Injectable({ providedIn: 'root' })
export class ThemeService {
  private readonly STORAGE_KEY = 'ops-console-theme';
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));

  mode = signal<ThemeMode>(this.loadSaved());

  constructor() {
    effect(() => {
      this.applyTheme(this.mode());
      if (this.isBrowser) {
        localStorage.setItem(this.STORAGE_KEY, this.mode());
      }
    });

    if (this.isBrowser) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', () => {
        if (this.mode() === 'system') {
          this.applyTheme('system');
        }
      });
    }
  }

  setMode(mode: ThemeMode): void {
    this.mode.set(mode);
  }

  get isDark(): boolean {
    if (!this.isBrowser) return false;
    const mode = this.mode();
    if (mode === 'dark') return true;
    if (mode === 'light') return false;
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  private loadSaved(): ThemeMode {
    if (!this.isBrowser) return 'system';
    const saved = localStorage.getItem(this.STORAGE_KEY);
    return (saved as ThemeMode) || 'system';
  }

  private applyTheme(mode: ThemeMode): void {
    if (!this.isBrowser) return;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const isDark = mode === 'dark' || (mode === 'system' && prefersDark);
    document.documentElement.setAttribute('data-theme', isDark ? 'dark' : 'light');
  }
}
