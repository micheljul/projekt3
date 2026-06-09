import {Component, inject} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {addDoc, collection, Firestore} from '@angular/fire/firestore';
import {Router} from '@angular/router';

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

        // 👉 DAS wird gespeichert
        this.bildUrl = canvas.toDataURL('image/jpeg', 0.6);
      };

      img.src = reader.result as string;
    };

    reader.readAsDataURL(file);
  }

  async datenSpeichern() {

    const lehrerCollection = collection(this.firestore, 'lehrer_profile');

    await addDoc(lehrerCollection, {
      name: this.neuerName,
      unterrichtsfach: this.neuesFach,
      hobbys: this.neueHobbys,
      bildUrl: this.bildUrl
    });
    alert('Lehrer-Profil erfolgreich gespeichert!');
    this.router.navigate(['/login']);
  }
}
