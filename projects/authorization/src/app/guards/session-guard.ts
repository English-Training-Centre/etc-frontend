import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const sessionGuard: CanActivateFn = (_, state) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map(res => {
      if (res.isSuccess && res.accessToken !== '' && res.userId !== '') return true;

      const returnUrl = state.url;
      return router.createUrlTree([''], { queryParams: { returnUrl } });
    }),
    catchError(() => {
      return of(
        router.createUrlTree([''], {
          queryParams: { returnUrl: state.url }
        })
      )
    })
  );
};
