import { Component } from '@angular/core';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router'; // Importa RouterModule
import { bootstrapApplication } from '@angular/platform-browser';
import { HeaderComponent } from './header/header.component';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  standalone: true,
  imports: [HeaderComponent, RouterModule],
  providers: [],
})
export class AppComponent {
  title = 'on_focus';
}

bootstrapApplication(AppComponent);
