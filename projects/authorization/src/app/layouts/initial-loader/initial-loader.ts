import { Component, inject, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-initial-loader',
  imports: [],
  templateUrl: './initial-loader.html',
  styleUrl: './initial-loader.scss',
})
export class InitialLoader implements OnInit {
  private readonly router = inject(Router);

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/auth/sign-in', { replaceUrl: true })
    }, 3000)
  }
}
