import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterModule, Router } from '@angular/router'; // Importa RouterModule e Router
import { AuthService } from '../auth.service';
import { NgZone } from '@angular/core';
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
        'http://localhost:8000/api/token/',
        credentials
      );
      this.authService.setToken(response.data.access);
      console.log('Login riuscito:', response);
      //redirect to login
      this.router.navigate(['/records']);
      console.log("this.router.navigate(['/records']);");
    } catch (error) {
      console.error('Errore durante il login:', error.response.data);
    }
  }
}
