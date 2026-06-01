import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrierenComponent} from './registrieren/registrieren.component';
import { LehrerProfilComponent } from './lehrer-profil/lehrer-profil.component';
import { SchuelerProfilComponent } from './schueler-profil/schueler-profil.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent },
  { path: 'lehrer-profil', component: LehrerProfilComponent },
  { path: 'schueler-profil', component: SchuelerProfilComponent },
];

