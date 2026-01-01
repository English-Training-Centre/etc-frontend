import { isPlatformBrowser, NgClass } from '@angular/common';
import { Component, inject, Inject, OnInit, PLATFORM_ID, signal } from '@angular/core';
import { RippleModule } from 'primeng/ripple';
import { ThemeRepository } from '../../../../../core/src/lib/repositories/theme-repository';

@Component({
  selector: 'lib-navbar-auth',
  imports: [RippleModule, NgClass],
  templateUrl: './navbar-auth.html',
  styleUrl: './navbar-auth.scss',
})
export class NavbarAuth implements OnInit {
  private readonly themeRep = inject(ThemeRepository);
  protected readonly logoUrl = signal<string>('/assets/images/logo_etc.svg');
  protected isDark = signal<boolean>(false);

  private isBrowser = false;

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  ngOnInit(): void {
    if (!this.isBrowser) return;

    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.documentElement.classList.toggle('dark', this.isDark());
    document.documentElement.classList.toggle('light', !this.isDark());
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.themeRep.toggleTheme();
    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.documentElement.classList.toggle('dark', this.isDark());
    document.documentElement.classList.toggle('light', !this.isDark());
  }
}
