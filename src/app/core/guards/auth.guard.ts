import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const authGuard: CanActivateFn = (_route, _state) => {
  const router = inject(Router);
  const isAuthenticated = false;
  if (!isAuthenticated) {
    router.navigate(['/dashboard']);
    return false;
  }
  return true;
};
