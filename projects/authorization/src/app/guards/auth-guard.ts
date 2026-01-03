import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { take, map, catchError, of } from 'rxjs';
import { AuthService } from '../services/auth-service';

export const authGuard: CanActivateFn = (_, state) => {
  const auth = inject(AuthService);
  const router = inject(Router);

  return auth.checkSession().pipe(
    take(1),
    map(res => {
      if (res.isSuccess && res.accessToken !== '' && res.userId !== '') {
        let targetRoute = '';

        if (res.role === 'admin')
        { targetRoute = '/admin'; }
        else if (res.role === 'student')
        { targetRoute = '/student'; }
        else {
          targetRoute = '/';
        }

        router.navigateByUrl(targetRoute, { replaceUrl: true });
        return false;
      }
      return true;
    }),
    catchError(() => of(true))
  );
};
