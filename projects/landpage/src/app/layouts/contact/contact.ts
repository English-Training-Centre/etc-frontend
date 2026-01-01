import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { TextareaModule } from 'primeng/textarea';
import { InputMaskModule } from 'primeng/inputmask';
import { CardLocation } from '../../components/card-location/card-location';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-contact',
  imports: [Ripple, CardLocation, FormsModule, IconFieldModule, InputIconModule, InputTextModule, TextareaModule, InputMaskModule],
  templateUrl: './contact.html',
  styleUrl: './contact.scss'
})
export class Contact implements OnInit, AfterViewInit {
  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  ngAfterViewInit() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.simple-in').forEach(el => {
    observer.observe(el);
  });
}
}
