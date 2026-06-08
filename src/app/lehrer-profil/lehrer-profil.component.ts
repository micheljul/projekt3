import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';
import {getDownloadURL, getStorage, ref, uploadBytes} from '@angular/fire/storage';

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
  private router = inject(Router);

  selectedFile: File | null = null;
  imageUrl: string = "";

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0];
  }

  async datenSpeichern() {

    const storage = getStorage();
    let downloadURL = "";

    // 📤 1. Bild hochladen
    if (this.selectedFile) {
      const filePath = `lehrer-bilder/${Date.now()}_${this.selectedFile.name}`;
      const storageRef = ref(storage, filePath);
      await uploadBytes(storageRef, this.selectedFile);
      downloadURL = await getDownloadURL(storageRef);
    }

    // 🧠 2. Firestore speichern

    const lehrerCollection = collection(this.firestore, 'lehrer_profile');
    await addDoc(lehrerCollection, {
      name: this.neuerName,
      unterrichtsfach: this.neuesFach,
      hobbys: this.neueHobbys,
      bildUrl: downloadURL
    });

    alert('Lehrer-Profil erfolgreich gespeichert!');

    this.router.navigate(['/login']);
  }
}
