import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrierenComponent} from './registrieren/registrieren.component';


export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent }
];

