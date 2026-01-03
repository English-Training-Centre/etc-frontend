import { Component, inject, Input, OnDestroy, OnInit } from '@angular/core';
import { BreadCrumbRepository } from '../../repositories/bread-crumb-repository';
import { NavigationEnd, Router, RouterModule } from '@angular/router';
import { Ripple } from 'primeng/ripple';
import { DividerModule } from 'primeng/divider';
import { BadgeModule } from 'primeng/badge';
import { CommonModule } from '@angular/common';
import { filter, Subscription } from 'rxjs';
import { AvatarModule } from 'primeng/avatar';

@Component({
  selector: 'app-sidebar',
  imports: [RouterModule, Ripple, DividerModule, BadgeModule, CommonModule, AvatarModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
})
export class Sidebar implements OnInit, OnDestroy {
  @Input() isCollapsed: boolean = false;

  private readonly router = inject(Router);
  private readonly subs = new Subscription();

  protected isOpenAcademic: boolean = false;
  protected isActiveAcademic: boolean = false;

  protected isOpenFinancial: boolean = false;
  protected isActiveFinancial: boolean = false;

  protected isOpenAccounting: boolean = false;
  protected isActiveAccounting: boolean = false;

  ngOnInit(): void {
    const currentUrl = this.router.url;

    this.isRouter(currentUrl);

    this.subs.add(
      this.router.events
        .pipe(filter((event) =>
        event instanceof NavigationEnd))
        .subscribe(() => {
          const currentUrl = this.router.url;

          this.isRouter(currentUrl);
        })
    );
  }

  ngOnDestroy(): void {

  }

  protected toggleBtn(format: string): void
  {
    switch (format)
    {
      case 'academic':
        this.isOpenAcademic = !this.isOpenAcademic;
        break;
      case 'financial':
        this.isOpenFinancial = !this.isOpenFinancial;
        break;
      case 'accounting':
        this.isOpenAccounting = !this.isOpenAccounting;
        break;
    }
  }

  private isRouter(currentUrl: string): void
  {
    if (
      (currentUrl === '/admin/academic-management-students') ||
      (currentUrl === '/admin/academic-management-assessments') ||
      (currentUrl === '/admin/academic-management-new-enrollment')
    )
    {
      this.isActiveAcademic = true;
    }
    else
    {
      this.isActiveAcademic = false;
    }

    if (
      (currentUrl === '/admin/financial-management-payments') ||
      (currentUrl === '/admin/financial-management-accounts-payable') ||
      (currentUrl === '/admin/financial-management-accounts-receivable') ||
      (currentUrl === '/admin/financial-management-cash-movements') ||
      (currentUrl === '/admin/financial-management-student-financial-statement') ||
      (currentUrl === '/admin/financial-management-receipts') ||
      (currentUrl === '/admin/financial-management-reports')
    )
    {
      this.isActiveFinancial = true;
    }
    else
    {
      this.isActiveFinancial = false;
    }

    if (
      (currentUrl === '/admin/accounting-chart-of-accounts') ||
      (currentUrl === '/admin/accounting-journal-entries') ||
      (currentUrl === '/admin/accounting-cash-flow') ||
      (currentUrl === '/admin/accounting-general-ledger') ||
      (currentUrl === '/admin/accounting-reports')
    )
    {
      this.isActiveAccounting = true;
    }
    else
    {
      this.isActiveAccounting = false;
    }
  }

  @Input() collapsed: boolean = false;

  private readonly breadCrumbRep = inject(BreadCrumbRepository);

  protected navigateTo (breadcrumbs: { icon?: string, label: string, url?:any[] }[])
  {
    this.breadCrumbRep.setBreadcrumbs(breadcrumbs);
  }
}
