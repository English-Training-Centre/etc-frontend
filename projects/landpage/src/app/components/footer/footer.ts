import { Component, inject, signal } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Ripple } from "primeng/ripple";

@Component({
  selector: 'app-footer',
  imports: [Ripple, RouterLink],
  templateUrl: './footer.html',
  styleUrl: './footer.scss',
})
export class Footer {
  protected readonly logoUrl = signal<string>('/assets/images/logo_etc.svg');
  private readonly router = inject(Router);

  goAndScroll(sectionId: string) {
    if (this.router.url === '/' || this.router.url === '/home') {
      this.scroll(sectionId);
      return;
    }

    this.router.navigate(['/']).then(() => {
      setTimeout(() => {
        this.scroll(sectionId);
      }, 50);
    });
  }

  private scroll(id: string) {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
