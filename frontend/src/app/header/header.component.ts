import { Router, Event, NavigationEnd } from '@angular/router';
import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  standalone: true,
  imports: [RouterModule],
})
export class HeaderComponent {
  isLoggedIn: boolean = false;

  constructor(private router: Router) {
    this.router.events.subscribe((event: Event) => {
      //controlla ogni volta che il router cambia
      if (event instanceof NavigationEnd) {
        this.checkLoginStatus();
      }
    });
  }

  checkLoginStatus() {
    this.isLoggedIn = !!localStorage.getItem('accessToken');
  }

  handleLoginLogout() {
    if (this.isLoggedIn) {
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
      this.isLoggedIn = false;
      this.router.navigate(['/login']);
    } else {
      this.router.navigate(['/login']);
    }
  }
}
