import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms'; // Importa FormsModule
import { RouterModule, Router } from '@angular/router'; // Importa RouterModule e Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [FormsModule], // Aggiungi FormsModule agli imports
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private router: Router) {}

  async login(credentials: { username: string; password: string }) {
    console.log('Credenziali:', credentials);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        credentials
      );
      console.log('Token di accesso:', response.data.access);
      console.log('Token di refresh:', response.data.refresh);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);

      console.log('Registrazione riuscita:', response.data);
      //redirect to login
      this.router.navigate(['/records']);
    } catch (error) {
      console.error('Errore durante il login:', error.response.data);
    }
  }
}
