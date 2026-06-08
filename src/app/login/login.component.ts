import { Component, inject } from '@angular/core';
import {RouterModule} from '@angular/router';
import { Firestore, collection, addDoc } from '@angular/fire/firestore';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  private firestore: Firestore = inject(Firestore);

  async testSpeichern() {
    const schuelerCollection = collection(this.firestore, 'schueler_profile');

    await addDoc(schuelerCollection, {
      name: 'Mark (Test vom Login-Screen)',
      klasse: '4AHITM',
      hobbys: 'Es funktioniert!'
    });

    alert('Daten wurden erfolgreich an Firebase gesendet!');
  }

  message: string = "";
  messageColor: string = "black";
  correctPassword: string = "test";

  login(email: string, password: string) {

    if (!email || !password) {
      this.message = "E-Mail und Passwort müssen ausgefüllt sein ❗";
      this.messageColor = "orange";
      return;
    }

    if (password === this.correctPassword) {
      this.message = `Login erfolgreich. Willkommen ${email}`;
      this.messageColor = "green";
    } else {
      this.message = "Falsches Passwort";
      this.messageColor = "red";
    }
  }
}
