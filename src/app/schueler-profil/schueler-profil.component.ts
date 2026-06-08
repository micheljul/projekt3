import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms'; // Wichtig für die Eingabefelder
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

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
  private router = inject(Router);

  async datenSpeichern() {
    const schuelerCollection = collection(this.firestore, 'schueler_profile');

    // Hier werden die Variablen aus dem HTML an Firebase geschickt
    await addDoc(schuelerCollection, {
      name: this.neuerName,
      klasse: this.neueKlasse
    });

    alert('Profil erfolgreich gespeichert!');
    this.router.navigate(['/login']);
  }
}
