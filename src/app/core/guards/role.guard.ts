import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export type AppRole = 'admin' | 'viewer';

export const roleGuard = (requiredRole: AppRole): CanActivateFn => {
  return () => {
    const router = inject(Router);
    const userRole: AppRole = 'viewer';
    if (userRole !== requiredRole) {
      void router.navigate(['/dashboard']);
      return false;
    }
    return true;
  };
};
