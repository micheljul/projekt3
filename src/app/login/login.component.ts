import { Component } from '@angular/core';
import {Router, RouterModule} from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  message: string = "";
  messageColor: string = "black";
  correctPassword: string = "test";

  login(firstName: string, lastName: string, password: string) {

    if (!firstName || !lastName) {

      this.message = "Vorname und Nachname müssen ausgefüllt sein ❗";
      this.messageColor = "orange";
      return;

    }

    if (password === this.correctPassword) {

      this.message = `Login erfolgreich. Willkommen ${firstName} ${lastName}`;
      this.messageColor = "green";

    } else {

      this.message = "Falsches Passwort";
      this.messageColor = "red";

    }
  }
}
