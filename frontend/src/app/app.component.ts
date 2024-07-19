import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { DEFAULT_TIMEFRAME } from '../data/constants';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    <nav>
      <a routerLink="/home">Home</a>
      <a routerLink="/about">About</a>
    </nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  timeframe = DEFAULT_TIMEFRAME;

  onTimeframeChange(newTimeframe: string) {
    this.timeframe = newTimeframe;
  }
}
