import { Routes } from '@angular/router';
import { Dashboard } from './layouts/dashboard/dashboard';

export const routes: Routes = [
  {
    path: '',
    title: 'ETC · Admin',
    loadComponent: () => import('./modules/modules').then(m => m.Modules),
    children: [
      {
        path: 'dashboard',
        title: 'ETC · Admin · Dashboard',
        component: Dashboard
      },
      {
        path: 'human-resources',
        title: 'ETC · Admin · Human Resources',
        loadComponent: () => import('./layouts/human-resources/human-resources').then(l => l.HumanResources)
      },
      {
        path: 'messages',
        title: 'ETC · Admin · Messages',
        loadComponent: () => import('./layouts/messages/messages').then(l => l.Messages)
      },
      {
        path: 'notifications',
        title: 'ETC · Admin · Notifications',
        loadComponent: () => import('./layouts/notifications/notifications').then(l => l.Notifications)
      },
      {
        path: 'users',
        title: 'ETC · Admin · Users',
        loadComponent: () => import('./layouts/users/users').then(l => l.Users)
      },
      {
        path: 'settings',
        title: 'ETC · Admin · Settings',
        loadComponent: () => import('./layouts/settings/settings').then(l => l.Settings)
      },

      // Academic Management
      {
        path: 'academic-management-students',
        title: 'ETC · Admin · Academic Management - Students',
        loadComponent: () => import('./layouts/academic-students/academic-students').then(l => l.AcademicStudents)
      },
      {
        path: 'academic-management-assessments',
        title: 'ETC · Admin · Academic Management - Assessments',
        loadComponent: () => import('./layouts/academic-assessments/academic-assessments').then(l => l.AcademicAssessments)
      },
      {
        path: 'academic-management-new-enrollment',
        title: 'ETC · Admin · Academic Management - New Enrollment',
        loadComponent: () => import('./layouts/academic-new-enrollment/academic-new-enrollment').then(l => l.AcademicNewEnrollment)
      },

      // Financial Management
      {
        path: 'financial-management-payments',
        title: 'ETC · Admin · Financial Management - Payments',
        loadComponent: () => import('./layouts/financial-payments/financial-payments').then(l => l.FinancialPayments)
      },
      {
        path: 'financial-management-accounts-payable',
        title: 'ETC · Admin · Financial Management - Accounts Payable',
        loadComponent: () => import('./layouts/financial-accounts-payable/financial-accounts-payable').then(l => l.FinancialAccountsPayable)
      },
      {
        path: 'financial-management-accounts-receivable',
        title: 'ETC · Admin · Financial Management - Accounts Receivable',
        loadComponent: () => import('./layouts/financial-accounts-receivable/financial-accounts-receivable').then(l => l.FinancialAccountsReceivable)
      },
      {
        path: 'financial-management-cash-movements',
        title: 'ETC · Admin · Financial Management - Cash Movements',
        loadComponent: () => import('./layouts/financial-cash-movements/financial-cash-movements').then(l => l.FinancialCashMovements)
      },
      {
        path: 'financial-management-student-financial-statement',
        title: 'ETC · Admin · Financial Management - Student Financial Statement',
        loadComponent: () => import('./layouts/financial-student-financial-statement/financial-student-financial-statement').then(l => l.FinancialStudentFinancialStatement)
      },
      {
        path: 'financial-management-receipts',
        title: 'ETC · Admin · Financial Management - Receipts',
        loadComponent: () => import('./layouts/financial-receipts/financial-receipts').then(l => l.FinancialReceipts)
      },
      {
        path: 'financial-management-reports',
        title: 'ETC · Admin · Financial Management - Reports',
        loadComponent: () => import('./layouts/financial-reports/financial-reports').then(l => l.FinancialReports)
      },

      // Accounting
      {
        path: 'accounting-chart-of-accounts',
        title: 'ETC · Admin · Accounting - Chart Of Accounts',
        loadComponent: () => import('./layouts/accounting-chart-of-accounts/accounting-chart-of-accounts').then(l => l.AccountingChartOfAccounts)
      },
      {
        path: 'accounting-journal-entries',
        title: 'ETC · Admin · Accounting - Journal Entries',
        loadComponent: () => import('./layouts/accounting-journal-entries/accounting-journal-entries').then(l => l.AccountingJournalEntries)
      },
      {
        path: 'accounting-cash-flow',
        title: 'ETC · Admin · Accounting - Cash Flow',
        loadComponent: () => import('./layouts/accounting-cash-flow/accounting-cash-flow').then(l => l.AccountingCashFlow)
      },
      {
        path: 'accounting-general-ledger',
        title: 'ETC · Admin · Accounting - General Ledger',
        loadComponent: () => import('./layouts/accounting-general-ledger/accounting-general-ledger').then(l => l.AccountingGeneralLedger)
      },
      {
        path: 'accounting-reports',
        title: 'ETC · Admin · Accounting - Reports',
        loadComponent: () => import('./layouts/accounting-reports/accounting-reports').then(l => l.AccountingReports)
      }
    ]
  }
];
