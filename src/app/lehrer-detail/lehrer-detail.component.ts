import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RouterModule} from '@angular/router';
import {FormsModule} from '@angular/forms';
import {doc, Firestore, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-lehrer-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './lehrer-detail.component.html',
  styleUrl: './lehrer-detail.component.scss'
})
export class LehrerDetailComponent {

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

      const profilRef = doc(this.firestore, `lehrer_profile/${this.profil.id}`);

      await updateDoc(profilRef, {
        name: this.profil.name,
        unterrichtsfach: this.profil.unterrichtsfach,
        sprechstunde: this.profil.sprechstunde,
        beschreibung: this.profil.beschreibung
      });
    }

    this.istBearbeiten = false;
  }
}
