import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { CounterComponent } from './counter/counter.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'counter', component: CounterComponent },
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];
