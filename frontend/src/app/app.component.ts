import { Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { bootstrapApplication } from '@angular/platform-browser';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [
    // HttpClientModule,
    RouterModule, // Aggiungi RouterModule qui
  ],
  providers: [],
})
export class AppComponent {
  title = 'on_focus';
}

bootstrapApplication(AppComponent);
