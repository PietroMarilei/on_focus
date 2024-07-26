// auth.guard.ts
import { inject } from '@angular/core';
import { Router, CanActivateFn } from '@angular/router';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const accessToken = localStorage.getItem('token');

  if (!accessToken) {
    router.navigate(['/login']);
    return false;
  }

  return true;
};
