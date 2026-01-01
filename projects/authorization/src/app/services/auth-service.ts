import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthRequestDTO } from '../interfaces/auth-request-dto';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { AuthResponseDTO } from '../interfaces/auth-response-dto';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = `${environment.urlAuthService}/api/Auth`;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  signIn(auth: AuthRequestDTO): Observable<AuthResponseDTO>
  {
    return this.http.post<AuthResponseDTO>(`${this.api}/v1/sign-in`, auth)
      .pipe(tap(resp => {
        if (resp.isSuccess && resp.role) {
          if (resp.role === 'admin') {
            this.router.navigateByUrl('/admin', { replaceUrl: true });
          } else if (resp.role === 'student') {
            this.router.navigateByUrl('/student', { replaceUrl: true });
          } else {
            this.router.navigateByUrl('/', { replaceUrl: true });
          }
        }
      }),
      catchError(err => {
        return throwError(() => new Error(err.error?.message || 'Falha no login'));
      }))
  }
}
