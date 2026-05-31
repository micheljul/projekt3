import { Component } from '@angular/core';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  correctPassword = "test";

  message = "";

  messageColor = "black";

  login(firstName: string, lastName: string, password: string) {

    if (password === this.correctPassword) {
      this.message = `Login erfolgreich`;
      this.messageColor = "green";
    } else {
      this.message = "Falsches Passwort";
      this.messageColor = "red";
    }

  }
}
