import { inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthRequestDTO } from '../interfaces/auth-request-dto';
import { BehaviorSubject, catchError, Observable, of, tap, throwError } from 'rxjs';
import { AuthResponseDTO } from '../interfaces/auth-response-dto';

export interface ICheckSession {
  userId: string;
  role: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly api = `${environment.urlAuthService}/api/v1/Auth`;
  private readonly http = inject(HttpClient);
  private readonly router = inject(Router);

  private loggedIn$ = new BehaviorSubject<boolean>(false);
  isLoggedIn$ = this.loggedIn$.asObservable();

  private accessToken: string | null = null;

  private sessionSubject = new BehaviorSubject<ICheckSession>({ userId: '', role: '' });
  session$ = this.sessionSubject.asObservable();

  get isLoggedIn(): boolean {
    return this.loggedIn$.value;
  }

  signIn(auth: AuthRequestDTO): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.api}/sign-in`, auth).pipe(
      tap((resp) => {
        if (resp.isSuccess && resp.accessToken) {
          this.accessToken = resp.accessToken;
          this.loggedIn$.next(true);

          if (resp.role) {
            this.updateSession({ userId: resp.userId || '', role: resp.role });
            this.navigateByRole(resp.role);
          }
        }
      }),
      catchError((err) => {
        return throwError(() => new Error(err.error?.message || 'Falha no login'));
      })
    );
  }

  refreshToken(): Observable<AuthResponseDTO> {
    return this.http.post<AuthResponseDTO>(`${this.api}/refresh`, null).pipe(
      tap((res) => {
        if (res.isSuccess && res.accessToken) {
          this.accessToken = res.accessToken;
          this.loggedIn$.next(true);
          if (res.role && res.userId) {
            this.updateSession({ userId: res.userId, role: res.role });
          }
        } else {
          this.handleLogout();
        }
      }),
      catchError((err) => {
        console.warn('Token refresh failed:', err);
        this.handleLogout();
        return throwError(() => err);
      })
    );
  }

  signOut(): void {
    this.http
      .post<boolean>(`${this.api}/sign-out`, null)
      .pipe(
        tap(() => this.handleLogout()),
        catchError(() => of(null)) // Always continue logout even if request fails
      )
      .subscribe(() => {
        this.router.navigate(['/sign-in'], { replaceUrl: true });
      });
  }

  checkSession(): Observable<AuthResponseDTO> {
    return this.http.get<AuthResponseDTO>(`${this.api}/check-session`).pipe(
      tap((res) => {
        if (res.isSuccess) {
          this.loggedIn$.next(true);
          this.accessToken = res.accessToken || this.accessToken; // Update if provided
          this.updateSession({ userId: res.userId || '', role: res.role || '' });
        } else {
          this.handleLogout();
        }
      }),
      catchError((err) => {
        console.warn('checkSession failed:', err);
        this.handleLogout();
        return of({} as AuthResponseDTO);
      })
    );
  }

  private navigateByRole(role: string): void {
    if (role === 'admin') {
      this.router.navigateByUrl('/admin', { replaceUrl: true });
    } else if (role === 'student') {
      this.router.navigateByUrl('/student', { replaceUrl: true });
    } else {
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  private handleLogout(): void {
    this.loggedIn$.next(false);
    this.accessToken = null;
    this.updateSession({ userId: '', role: '' });
  }

  private updateSession(session: ICheckSession): void {
    this.sessionSubject.next(session);
  }

  getAccessToken(): string | null {
    return this.accessToken;
  }

  setAccessToken(token: string): void {
    this.accessToken = token;
  }
}
