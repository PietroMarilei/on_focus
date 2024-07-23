import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms'; // Importa FormsModule

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
  imports: [FormsModule], // Aggiungi FormsModule agli imports
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor() {}

  async login(credentials: { username: string; password: string }) {
    try {
      const response = await axios.post(
        'http://localhost:8000/api/token/',
        credentials
      );
      console.log('Token di accesso:', response.data.access);
      console.log('Token di refresh:', response.data.refresh);
      localStorage.setItem('accessToken', response.data.access);
      localStorage.setItem('refreshToken', response.data.refresh);
    } catch (error) {
      console.error('Errore durante il login:', error.response.data);
    }
  }
}
