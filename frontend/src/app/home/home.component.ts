import { Component } from '@angular/core';
import axios from 'axios';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true,
})
export class HomeComponent {
  username: string = '';
  password: string = '';

  constructor() {}

  async login(event: Event): Promise<void> {
    event.preventDefault();
    const apiUrl = 'http://localhost:8000/auth/api/token/';
    try {
      const response = await axios.post(apiUrl, {
        username: this.username,
        password: this.password,
      });
      localStorage.setItem('access_token', response.data.access);
      localStorage.setItem('refresh_token', response.data.refresh);
      console.log('Login successful', response.data);
    } catch (error) {
      console.error('Login failed', error);
    }
  }
}
