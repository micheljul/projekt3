import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

@Component({
  selector: 'app-schueler-profil',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './schueler-profil.component.html',
  styleUrl: './schueler-profil.component.scss'
})
export class SchuelerProfilComponent {

  neuerName: string = "";
  neueKlasse: string = "";
  neuesHobby: string = ""; // Hinzugefügt
  neuesLieblingsfach: string = ""; // Hinzugefügt

  bildUrl: string = "";

  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      const img = new Image();

      img.onload = () => {
        const canvas = document.createElement('canvas');

        const maxWidth = 300;
        const scale = maxWidth / img.width;

        canvas.width = maxWidth;
        canvas.height = img.height * scale;

        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

        this.bildUrl = canvas.toDataURL('image/jpeg', 0.6);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  async datenSpeichern() {

    const schuelerCollection = collection(this.firestore, 'schueler_profile');

    await addDoc(schuelerCollection, {
      name: this.neuerName,
      klasse: this.neueKlasse,
      hobby: this.neuesHobby, // Wird jetzt in Firebase gespeichert
      lieblingsfach: this.neuesLieblingsfach, // Wird jetzt in Firebase gespeichert
      bildUrl: this.bildUrl
    });

    alert('Profil erfolgreich gespeichert!');

    this.router.navigate(['/login']);
  }
}
