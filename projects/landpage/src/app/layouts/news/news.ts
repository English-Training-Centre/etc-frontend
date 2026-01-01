import { AfterViewInit, Component, OnInit } from '@angular/core';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { CardLatestNews } from '../../components/card-latest-news/card-latest-news';
import { Ripple } from 'primeng/ripple';

@Component({
  selector: 'app-news',
  imports: [Ripple, IconFieldModule, InputIconModule, InputTextModule, CardLatestNews],
  templateUrl: './news.html',
  styleUrl: './news.scss',
})
export class News implements OnInit, AfterViewInit {
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

    document.querySelectorAll('.news-animate-in, .news-card-stagger').forEach(el => {
      observer.observe(el);
    });
  }
}
