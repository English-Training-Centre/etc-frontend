import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Navbar } from '../components/navbar/navbar';
import { NotEnrolled } from '../layouts/not-enrolled/not-enrolled';
import { Footer } from '../components/footer/footer';

@Component({
  selector: 'app-modules',
  imports: [RouterOutlet, Navbar, Footer, NotEnrolled],
  templateUrl: './modules.html',
  styleUrl: './modules.scss',
})
export class Modules {
  protected isNotEnrolled = signal<boolean>(false);
}
