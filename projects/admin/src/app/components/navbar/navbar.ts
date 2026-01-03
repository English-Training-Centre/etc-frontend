import { Component, EventEmitter, Inject, inject, Input, OnDestroy, OnInit, Output, PLATFORM_ID, signal } from '@angular/core';
import { Toolbar } from 'primeng/toolbar';
import { CommonModule, isPlatformBrowser, NgClass } from '@angular/common';
import { AvatarModule } from 'primeng/avatar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { BreadCrumb, BreadCrumbRepository } from '../../repositories/bread-crumb-repository';
import { OverlayBadgeModule } from 'primeng/overlaybadge';
import { ThemeRepository } from '../../../../../core/src/lib/repositories/theme-repository';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-navbar',
  imports: [Ripple, Toolbar, NgClass, OverlayBadgeModule, AvatarModule, CommonModule],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy {
  private readonly router = inject(Router);
  private readonly themeRep = inject(ThemeRepository);
  private readonly breadCrumbRep = inject(BreadCrumbRepository);
  protected breadcrumbs: BreadCrumb[] = [];

  @Input() isCollapsed: boolean = false;
  @Output() toggleCollapsed = new EventEmitter<void>();

  private subs = new Subscription();
  protected isDark = signal<boolean>(false);
  private isBrowser = false;

  protected readonly logoUrl = signal<string>('/assets/images/logo_etc.svg');

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);

    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.body.classList.toggle('dark', this.isDark());
    document.body.classList.toggle('light', !this.isDark());
  }

  ngOnInit(): void {
    this.subs.add(
      this.breadCrumbRep.breadcrumbs$.subscribe(b => {
        this.breadcrumbs = b;
      })
    );
  }

  ngOnDestroy(): void {
    if (this.subs) this.subs.unsubscribe();
  }

  toggleTheme() {
    if (!this.isBrowser) return;

    this.themeRep.toggleTheme();
    this.isDark.set(this.themeRep.getStoredTheme() === 'dark');

    document.documentElement.classList.toggle('dark', this.isDark());
    document.documentElement.classList.toggle('light', !this.isDark());
  }

  toggleLanguage(): void {
    //this.languageRepository.toggleLanguage()
  }

  navigateTo (breadcrumbs: { icon: string, label: string, url?:any[] }[]) {
    this.breadCrumbRep.setBreadcrumbs(breadcrumbs);
  }

  goPreviousTo() {
    const current = this.breadCrumbRep.getBreadcrumbs();
    if (current.length >= 2) {
      const previous = current[current.length - 2];
      const updated = current.slice(0, current.length - 1);
      this.breadCrumbRep.setBreadcrumbs(updated);

      if (previous.url) {
        this.router.navigate(previous.url);
      }
    }
  }

  goBackTo(label: string) {
    const current = this.breadCrumbRep.getBreadcrumbs();
    const target = current.find(b => b.label === label);

    if (target) {
      const index = current.findIndex(b => b.label === label);
      const updated = current.slice(0, index + 1);

      this.breadCrumbRep.setBreadcrumbs(updated);

      if (target.url) {
        this.router.navigate(target.url);
      }
    }
  }
}
