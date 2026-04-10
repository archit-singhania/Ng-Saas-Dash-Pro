import { Injectable, signal, inject, PLATFORM_ID } from '@angular/core';
import { Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';

export interface AuthUser {
  name: string;
  email: string;
  role: string;
}

const STORAGE_KEY = 'ops-console-auth';

interface StoredAuth {
  loggedIn: boolean;
  user: AuthUser;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  private router = inject(Router);

  isLoggedIn = signal<boolean>(this.loadAuth());
  currentUser = signal<AuthUser | null>(this.loadUser());

  login(email: string, _password: string): boolean {
    const user: AuthUser = {
      name: 'Admin Operator',
      email,
      role: 'Super Admin'
    };
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ loggedIn: true, user }));
    }
    return true;
  }

  register(name: string, email: string, _password: string): boolean {
    const user: AuthUser = { name, email, role: 'Operator' };
    this.isLoggedIn.set(true);
    this.currentUser.set(user);
    if (this.isBrowser) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ loggedIn: true, user }));
    }
    return true;
  }

  logout(): void {
    this.isLoggedIn.set(false);
    this.currentUser.set(null);
    if (this.isBrowser) localStorage.removeItem(STORAGE_KEY);
    void this.router.navigate(['/']);
  }

  private loadAuth(): boolean {
    if (!this.isBrowser) return false;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return false;
      const parsed = JSON.parse(raw) as StoredAuth;
      return parsed.loggedIn === true;
    } catch { return false; }
  }

  private loadUser(): AuthUser | null {
    if (!this.isBrowser) return null;
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return null;
      const parsed = JSON.parse(raw) as StoredAuth;
      return parsed.user ?? null;
    } catch { return null; }
  }
}
