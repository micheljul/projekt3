import {Component} from '@angular/core';
import {Router, RouterModule} from '@angular/router';
import {signInWithEmailAndPassword} from 'firebase/auth';
import {auth} from '../firebase.config';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {

  constructor(private router: Router) {
  }

  message: string = "";
  messageColor: string = "black";

  async login(email: string, password: string) {

    if (!email || !password) {
      this.message = "E-Mail und Passwort müssen ausgefüllt sein ❗";
      this.messageColor = "orange";
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      const user = userCredential.user;

      this.message = `Login erfolgreich. Willkommen ${user.email}`;
      this.messageColor = "green";

      // optional Weiterleitung
      this.router.navigate(['/dashboard']);

    } catch (error) {
      this.message = "Login fehlgeschlagen ❌ (E-Mail oder Passwort falsch)";
      this.messageColor = "red";

      console.error(error);
    }
  }
}
