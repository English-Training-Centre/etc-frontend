import { Component, inject } from '@angular/core';
import { NavbarAuth } from "../../components/navbar-auth/navbar-auth";
import { Router, RouterOutlet } from '@angular/router';
import { FooterAuth } from "../../components/footer-auth/footer-auth";

@Component({
  selector: 'lib-module-auth',
  imports: [NavbarAuth, RouterOutlet, FooterAuth],
  templateUrl: './module-auth.html',
  styleUrl: './module-auth.scss',
})
export class ModuleAuth {
  private readonly router = inject(Router);

  constructor() { this.router.navigateByUrl('/auth/sign-in', { replaceUrl: true }); }
}
