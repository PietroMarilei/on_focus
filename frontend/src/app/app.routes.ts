import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecordsComponent } from './records/records.component';
import { RegisterComponent } from './register/register.component';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'records', component: RecordsComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];
