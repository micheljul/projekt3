import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms'; // Wichtig für die Eingabefelder
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-schueler-profil',
  standalone: true,
  imports: [FormsModule], // Hier das Modul hinzufügen
  templateUrl: './schueler-profil.component.html',
  styleUrl: './schueler-profil.component.scss'
})
export class SchuelerProfilComponent {

  // Diese Variablen halten das, was du im HTML eintippst
  neuerName: string = "";
  neueKlasse: string = "";

  private firestore: Firestore = inject(Firestore);

  async datenSpeichern() {
    const schuelerCollection = collection(this.firestore, 'schueler_profile');

    // Hier werden die Variablen aus dem HTML an Firebase geschickt
    await addDoc(schuelerCollection, {
      name: this.neuerName,
      klasse: this.neueKlasse
    });

    alert('Profil erfolgreich gespeichert!');
  }
}
