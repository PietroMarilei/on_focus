import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule],
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  async login(credentials: { username: string; password: string }) {
    try {
      const response = await axios.post(
        `${environment.apiDomain}/api/token/`,
        credentials
      );
      this.authService.setToken(response.data.access);
      console.log('Login riuscito:', response);
      this.router.navigate(['/records']);
    } catch (error: any) {
      console.error(
        'Errore durante il login:',
        error.response?.data || error.message || error
      );
    }
  }
}
