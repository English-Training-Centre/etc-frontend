import { Component } from '@angular/core';
import { NavbarAuth } from "../components/navbar-auth/navbar-auth";
import { RouterOutlet } from '@angular/router';
import { FooterAuth } from "../components/footer-auth/footer-auth";

@Component({
  selector: 'lib-module-auth',
  imports: [NavbarAuth, RouterOutlet, FooterAuth],
  templateUrl: './module-auth.html',
  styleUrl: './module-auth.scss',
})
export class ModuleAuth {
}
