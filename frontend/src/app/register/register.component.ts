import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router'; // Importa RouterModule e Router

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule], // Aggiungi RouterModule agli imports
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'], // Correggi 'styleUrl' in 'styleUrls'
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

  constructor(private router: Router) {} // Inietta il Router

  async register(credentials: {
    username: string;
    email: string;
    password: string;
  }) {
    console.log('Credenziali:', credentials);
    try {
      const response = await axios.post(
        'http://localhost:8000/api/register/',
        credentials
      );
      console.log('Registrazione riuscita:', response.data);
      //redirect to login
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Errore durante la registrazione:', error.response.data);
    }
  }
}
