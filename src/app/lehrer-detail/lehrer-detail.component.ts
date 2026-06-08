import {Component, inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {doc, Firestore, updateDoc} from '@angular/fire/firestore';

@Component({
  selector: 'app-lehrer-detail',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  templateUrl: './lehrer-detail.component.html',
  styleUrl: './lehrer-detail.component.scss'
})
export class LehrerDetailComponent {

  private firestore = inject(Firestore);

  profil: any = {
    name: '',
    unterrichtsfach: '',
    sprechstunde: '',
    beschreibung: ''
  };

  istBearbeiten = false;

  constructor() {
    const state = history.state;

    // SAFE LOAD (kein Crash wenn leer)
    if (state?.profil) {
      this.profil = state.profil;
    }

    console.log('Geladener Lehrer:', this.profil);
  }

  modusWechseln() {
    this.istBearbeiten = !this.istBearbeiten;
  }

  async speichern() {

    if (!this.profil?.id) {
      console.warn('Keine ID vorhanden → Update übersprungen');
      return;
    }

    const ref = doc(this.firestore, `lehrer_profile/${this.profil.id}`);

    await updateDoc(ref, {
      name: this.profil.name,
      unterrichtsfach: this.profil.unterrichtsfach,
      sprechstunde: this.profil.sprechstunde,
      beschreibung: this.profil.beschreibung
    });

    this.istBearbeiten = false;
  }
}
