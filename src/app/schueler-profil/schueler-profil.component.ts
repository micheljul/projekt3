import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

import {getDownloadURL, getStorage, ref, uploadBytes} from 'firebase/storage';

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

  private firestore: Firestore = inject(Firestore);
  private router = inject(Router);

  selectedFile: File | null = null;

  // 📁 Datei auswählen
  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async datenSpeichern() {
    const storage = getStorage();
    let downloadURL = "";

    // 📤 Bild hochladen
    if (this.selectedFile) {
      const filePath = `schueler-bilder/${Date.now()}_${this.selectedFile.name}`;
      const storageRef = ref(storage, filePath);

      await uploadBytes(storageRef, this.selectedFile);
      downloadURL = await getDownloadURL(storageRef);
    }

    // 🧠 Firestore speichern
    const schuelerCollection = collection(this.firestore, 'schueler_profile');

    await addDoc(schuelerCollection, {
      name: this.neuerName,
      klasse: this.neueKlasse,
      bildUrl: downloadURL
    });

    alert('Profil erfolgreich gespeichert!');
    this.router.navigate(['/login']);
  }
}
