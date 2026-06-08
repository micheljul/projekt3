import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';

@Component({
  selector: 'app-lehrer-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './lehrer-profil.component.html',
  styleUrl: './lehrer-profil.component.scss'
})
export class LehrerProfilComponent {

  neuerName: string = "";
  neuesFach: string = "";
  neueHobbys: string = "";

  private firestore: Firestore = inject(Firestore);

  async datenSpeichern() {
    const lehrerCollection = collection(this.firestore, 'lehrer_profile');

    await addDoc(lehrerCollection, {
      name: this.neuerName,
      unterrichtsfach: this.neuesFach,
      hobbys: this.neueHobbys,
    });

    alert('Lehrer-Profil erfolgreich gespeichert!');
  }
}
