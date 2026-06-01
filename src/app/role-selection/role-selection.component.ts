import { Component } from '@angular/core';
import {Router} from '@angular/router';

@Component({
  selector: 'app-role-selection',
  imports: [],
  templateUrl: './role-selection.component.html',
  styleUrl: './role-selection.component.scss',
})
export class RoleSelectionComponent {
  constructor(private router: Router) {}

  selectRole(role: string) {

    // optional: speichern

    localStorage.setItem('role', role);

    if (role === 'teacher') {

      this.router.navigate(['/lehrer-profil']);

    }

    if (role === 'student') {

      this.router.navigate(['/schueler-profil']);

    }

  }
}
