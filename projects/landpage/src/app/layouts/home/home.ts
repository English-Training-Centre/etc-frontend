import { AfterViewInit, Component, OnInit, signal } from '@angular/core';
import { CardLatestNews } from "../../components/card-latest-news/card-latest-news";
import { Ripple } from 'primeng/ripple';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Ripple, CardLatestNews, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements OnInit, AfterViewInit {
  protected readonly homeUrl = signal<string>('/assets/images/home_img.svg');

  ngOnInit(): void {
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
  }

  ngAfterViewInit() {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    document
      .querySelectorAll('.animate-in')
      .forEach(el => observer.observe(el));
  }

  protected scrollTo(id: string): void {
    document.getElementById(id)?.scrollIntoView({
      behavior: 'smooth'
    });
  }
}
