import { Routes } from '@angular/router';
import {LoginComponent} from './login/login.component';
import {RegistrierenComponent} from './registrieren/registrieren.component';
import { LehrerProfilComponent } from './lehrer-profil/lehrer-profil.component';
import { SchuelerProfilComponent } from './schueler-profil/schueler-profil.component';
import {RoleSelectionComponent} from './role-selection/role-selection.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SchuelerDetailComponent } from './schueler-detail/schueler-detail.component';

export const routes: Routes = [
  { path: '', component: LoginComponent },
  { path: 'registrieren', component: RegistrierenComponent },
  { path: 'lehrer-profil', component: LehrerProfilComponent },
  { path: 'schueler-profil', component: SchuelerProfilComponent },
  { path: 'role-selection', component: RoleSelectionComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'schueler-detail', component: SchuelerDetailComponent }
];

