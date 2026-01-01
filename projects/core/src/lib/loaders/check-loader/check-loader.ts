import { Component, inject, signal } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'lib-check-loader',
  imports: [],
  templateUrl: './check-loader.html',
  styleUrl: './check-loader.css',
})
export class CheckLoader {
  private readonly router = inject(Router);
  protected isLoading = signal<boolean>(true);

  ngOnInit(): void {
    setTimeout(() => {
      this.isLoading.set(false);
      this.router.navigateByUrl('student/dashboard')
    }, 4000)
  }
}
