import { bootstrapApplication } from '@angular/platform-browser';
import { provideRouter, RouterModule } from '@angular/router';
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes';

bootstrapApplication(AppComponent, {
  providers: [provideRouter(routes)],
});
