import { Component, inject, OnInit } from '@angular/core';
import { Sidebar } from "../components/sidebar/sidebar";
import { Navbar } from "../components/navbar/navbar";
import { Router, RouterOutlet } from '@angular/router';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-modules',
  imports: [NgClass, Sidebar, Navbar, RouterOutlet],
  templateUrl: './modules.html',
  styleUrl: './modules.scss',
})
export class Modules implements OnInit {
  private readonly router = inject(Router);
  protected isCollapsed : boolean = sessionStorage.getItem('is_collapsed') === 'false' ? false : true;

  ngOnInit(): void {
    setTimeout(() => {
      this.router.navigateByUrl('/admin/dashboard', { replaceUrl: true });
    }, 0)

    sessionStorage.setItem('is_collapsed', `${this.isCollapsed}`);
  }

  protected toggleCollapsed(): void
  {
    this.isCollapsed = !this.isCollapsed;
    sessionStorage.setItem('is_collapsed', `${this.isCollapsed}`);
  }
}
