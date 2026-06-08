import {Component} from '@angular/core';
import {RouterModule} from '@angular/router';

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
