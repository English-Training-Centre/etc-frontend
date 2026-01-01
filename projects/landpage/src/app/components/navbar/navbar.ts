import { Component, HostListener, inject, signal, Inject, PLATFORM_ID } from '@angular/core';
import { ThemeRepository } from '../../../../../core/src/lib/repositories/theme-repository';
import { RippleModule } from 'primeng/ripple';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { NgClass, isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-navbar',
  imports: [RippleModule, RouterLink, RouterLinkActive, NgClass],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.scss'],
  standalone: true
})
export class Navbar {
  private readonly themeRep = inject(ThemeRepository);

  protected readonly logoUrl = signal<string>('/assets/images/logo_etc.svg');
  protected isDark = signal<boolean>(false);

  protected scrolled: boolean = false;
  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.body.classList.toggle('dark', this.isDark());
    document.body.classList.toggle('light', !this.isDark());
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (!this.isBrowser) return;
    this.scrolled = window.scrollY > 0;
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.themeRep.toggleTheme();
    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.documentElement.classList.toggle('dark', this.isDark());
    document.documentElement.classList.toggle('light', !this.isDark());
  }

  onSignIn(): void
  {
    window.location.assign("http://localhost:4201");
  }
}
