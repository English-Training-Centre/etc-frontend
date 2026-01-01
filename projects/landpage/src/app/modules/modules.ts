import { Component } from '@angular/core';
import { Navbar } from "../components/navbar/navbar";
import { RouterOutlet } from '@angular/router';
import { Footer } from "../components/footer/footer";

@Component({
  selector: 'app-modules',
  imports: [Navbar, RouterOutlet, Footer],
  templateUrl: './modules.html',
  styleUrl: './modules.scss',
})
export class Modules {
}
