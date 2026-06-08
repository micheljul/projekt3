import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Firestore, doc, updateDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-schueler-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './schueler-detail.component.html',
  styleUrl: './schueler-detail.component.scss'
})
export class SchuelerDetailComponent {
  profil: any = {};
  istBearbeiten: boolean = false;
  darfBearbeiten: boolean = false;
  private firestore: Firestore = inject(Firestore);

  constructor() {
    this.profil = history.state.profil || {};
    this.darfBearbeiten = history.state.darfBearbeiten || false;
  }

  modusWechseln() {
    this.istBearbeiten = !this.istBearbeiten;
  }

  async speichern() {
    if (this.profil.id) {
      // Dokument in Firebase aktualisieren
      const profilRef = doc(this.firestore, `schueler_profile/${this.profil.id}`);
      await updateDoc(profilRef, {
        name: this.profil.name,
        klasse: this.profil.klasse,
        hobbys: this.profil.hobbys,
        beschreibung: this.profil.beschreibung
      });
    }
    // Bearbeitungsmodus beenden
    this.istBearbeiten = false;
  }
}
