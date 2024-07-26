import { Component } from '@angular/core';
import axios from 'axios';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  email: string = '';
  username: string = '';
  password: string = '';

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
    }
  }
}
