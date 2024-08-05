import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { environment } from '../../environments/environment';
import { CommonModule } from '@angular/common'; // Importa CommonModule

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Aggiungi CommonModule
})
export class LoginComponent {
  username: string = '';
  password: string = '';
  errorMessage: string | null = null; // Aggiungi una variabile per l'errore
  errorDetails: any = null; // Aggiungi una variabile per i dettagli dell'errore

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
      this.errorMessage =
        error.response?.data?.detail || 'Errore durante il login'; // Imposta il messaggio di errore
    }
  }

  redirectToRegister() {
    this.router.navigate(['/register']); // Redirect alla pagina /register
  }
  getErrorDetails(): string[] {
    if (!this.errorDetails) {
      return [];
    }

    const details: string[] = [];
    for (const key in this.errorDetails) {
      if (this.errorDetails.hasOwnProperty(key)) {
        const value = this.errorDetails[key];
        if (Array.isArray(value)) {
          details.push(...value);
        } else {
          details.push(value);
        }
      }
    }
    return details;
  }
}
