import { Routes } from '@angular/router';
import { Modules } from './modules/modules';
import { Home } from './layouts/home/home';
import { Contact } from './layouts/contact/contact';
import { Enrolment } from './layouts/enrolment/enrolment';
import { News } from './layouts/news/news';

export const routes: Routes = [
  // landpage
  {
    path: '',
    component: Modules,
    children:
    [
      {
        path: '',
        title: 'English Training Center',
        component: Home
      },
      {
        path: 'news',
        title: 'ETC · News',
        component: News
      },
      {
        path: 'contact',
        title: 'ETC · Contact',
        component: Contact
      },
      {
        path: 'enrolment',
        title: 'ETC · Course Enrolment',
        component: Enrolment
      }
    ]
  }
];
