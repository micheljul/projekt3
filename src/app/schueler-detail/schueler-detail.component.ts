import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-schueler-detail',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './schueler-detail.component.html',
  styleUrls: ['./schueler-detail.component.scss']
})
export class SchuelerDetailComponent {
  profil: any;

  constructor() {
    // Holt das Profil aus dem Dashboard-Klick
    this.profil = history.state.profil;
  }
}
