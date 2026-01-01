import { Injectable, Inject, PLATFORM_ID, OnDestroy } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ThemeRepository implements OnDestroy {
  private themeSubject = new BehaviorSubject<string | null>(null);
  theme$ = this.themeSubject.asObservable();

  private readonly storageKey = 'theme';
  private mediaQueryListener?: (event: MediaQueryListEvent) => void;

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.initialize();
  }

  private initialize(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const savedTheme = localStorage.getItem(this.storageKey);
    if (savedTheme) {
      this.applyTheme(savedTheme, false);
    } else {
      this.useSystemTheme();
    }

    this.setupSystemThemeListener();
  }

  private useSystemTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const systemTheme = this.getSystemTheme();
    this.applyTheme(systemTheme, false);
    localStorage.setItem(this.storageKey, systemTheme);
  }

  private getSystemTheme(): string {
    if (!isPlatformBrowser(this.platformId)) return 'light';
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  private setupSystemThemeListener(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');

    this.mediaQueryListener = (event: MediaQueryListEvent) => {
      if (!localStorage.getItem(this.storageKey)) {
        const newSystemTheme = event.matches ? 'dark' : 'light';
        this.applyTheme(newSystemTheme, false);
        this.themeSubject.next(newSystemTheme);
      }
    };

    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', this.mediaQueryListener);
    }
  }

  toggleTheme(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const newTheme = this.getStoredTheme() === 'light' ? 'dark' : 'light';
    this.applyTheme(newTheme, true);
    this.themeSubject.next(newTheme);
  }

  getStoredTheme(): string {
    if (!isPlatformBrowser(this.platformId)) return this.getSystemTheme();
    return localStorage.getItem(this.storageKey) || this.getSystemTheme();
  }

  setStoredTheme(theme: string): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.applyTheme(theme, true);
    this.themeSubject.next(theme);
  }

  private applyTheme(theme: string, updateStorage: boolean = true): void {
    if (!isPlatformBrowser(this.platformId)) return;

    this.updatePrimengTheme(theme);
    this.updateTailwindTheme(theme);

    document.body.classList.remove('dark', 'light');
    document.body.classList.add(theme);

    if (updateStorage) {
      localStorage.setItem(this.storageKey, theme);
    }
  }

  private updatePrimengTheme(theme: string): void {
    const head = document.getElementsByTagName('head')[0];
    const existingLink = document.getElementById('primeng-theme') as HTMLLinkElement;

    const themeHref = theme === 'dark' ? 'assets/theme/darkMode.scss' : 'assets/theme/lightMode.scss';

    if (existingLink) {
      existingLink.href = themeHref;
    } else {
      const link = document.createElement('link');
      link.id = 'primeng-theme';
      link.rel = 'stylesheet';
      link.href = themeHref;
      head.appendChild(link);
    }
  }

  private updateTailwindTheme(theme: string): void {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
      document.body.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
      document.body.classList.remove('dark');
    }
  }

  ngOnDestroy(): void {
    if (!isPlatformBrowser(this.platformId)) return;

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    if (this.mediaQueryListener && mediaQuery.removeEventListener) {
      mediaQuery.removeEventListener('change', this.mediaQueryListener);
    }
  }
}
