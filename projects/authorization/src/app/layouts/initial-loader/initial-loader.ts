import { Component, inject, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { timer, Subject } from 'rxjs';
import { switchMap, tap, retry, takeUntil, finalize } from 'rxjs/operators';
import { AuthService } from '../../services/auth-service';
import { AuthResponseDTO } from '../../interfaces/auth-response-dto';

@Component({
  selector: 'app-initial-loader',
  standalone: true,
  imports: [],
  templateUrl: './initial-loader.html',
  styleUrl: './initial-loader.scss',
})
export class InitialLoader implements OnInit, OnDestroy {
  private readonly authService = inject(AuthService);
  private readonly router = inject(Router);
  private readonly destroy$ = new Subject<void>();

  showLoader = true;

  private baseDelay = 3000;  // Initial poll + retry base
  private maxDelay = 30000;  // Cap at 30s between retries

  ngOnInit(): void {
    this.startSessionCheck();
  }

  private startSessionCheck(): void {
    let attempt = 0;

    timer(0, this.baseDelay)
      .pipe(
        switchMap(() => {
          attempt++;
          if (attempt > 1) {
            console.warn(`Checking session... Attempt ${attempt}`);
          }
          return this.authService.checkSession();
        }),
        tap((res: AuthResponseDTO) => {
          // We got a valid response from the server (success or failure)
          // Stop retrying and navigate accordingly
          this.navigateBasedOnSessionResult(res);
          // Throw to stop the retry chain – we have our answer
          throw new Error('SESSION_CHECK_COMPLETED');
        }),
        retry({
          count: Infinity,
          delay: (_, retryCount) => {
            const delay = Math.min(this.baseDelay * Math.pow(2, retryCount), this.maxDelay);
            console.warn(`Session check failed or server unreachable. Retrying in ${delay / 1000}s...`);
            return timer(delay);
          },
        }),
        // This catchError only triggers on unexpected errors (not on our intentional throw)
        // But we suppress it to avoid console noise since retry handles it
        finalize(() => {
          // In case something goes terribly wrong, hide loader
          this.showLoader = false;
        }),
        takeUntil(this.destroy$)
      )
      .subscribe({
        error: (err) => {
          // We only reach here if we threw 'SESSION_CHECK_COMPLETED'
          if (err.message !== 'SESSION_CHECK_COMPLETED') {
            console.error('Unexpected error in session polling:', err);
          }
          // No further action needed – navigation already triggered in tap()
        }
      });
  }

  private navigateBasedOnSessionResult(res: AuthResponseDTO): void {
    setTimeout(() => {
      this.showLoader = false;

      let targetRoute = '/sign-in'; // Default: not logged in

      if (res.isSuccess && res.role) {
        if (res.role === 'admin') {
          targetRoute = '/admin/dashboard';
        } else if (res.role === 'student') {
          targetRoute = '/student';
        } else {
          targetRoute = '/'; // or '/dashboard' for other roles
        }
      }
      // If !res.isSuccess → stays '/sign-in'

      this.router.navigateByUrl(targetRoute, { replaceUrl: true });
    }, 3000); // Show loader for at least 3 seconds after getting a response
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
