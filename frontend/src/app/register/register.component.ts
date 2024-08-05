import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { CommonModule } from '@angular/common'; // Importa CommonModule
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule, CommonModule], // Aggiungi CommonModule
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';
  errorMessage: string | null = null; // Aggiungi una variabile per l'errore
  errorDetails: any = null; // Aggiungi una variabile per i dettagli dell'errore

  constructor(private router: Router) {}

  async register(credentials: {
    username: string;
    email: string;
    password: string;
  }) {
    console.log('Credenziali:', credentials);
    try {
      const response = await axios.post(
        `${environment.apiDomain}/api/register/`,
        credentials
      );
      console.log('Registrazione riuscita:', response.data);
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.error(
        'Errore durante la registrazione:',
        error.response?.data || error.message || error
      );
      this.errorMessage = 'Errore durante la registrazione';
      this.errorDetails = error.response?.data || error.message || error; // Imposta i dettagli dell'errore
    }
  }

  redirectToLogin() {
    this.router.navigate(['/login']); // Redirect alla pagina /login
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
