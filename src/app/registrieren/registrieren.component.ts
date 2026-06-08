import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {createUserWithEmailAndPassword, getAuth} from 'firebase/auth';

@Component({
  selector: 'app-registrieren',
  standalone: true,
  imports: [],
  templateUrl: './registrieren.component.html',
  styleUrl: './registrieren.component.scss',
})
export class RegistrierenComponent {

  constructor(private router: Router) {
  }

  message: string = '';
  messageColor: string = 'black';

  user = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  };

  async register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {

    // Pflichtfelder prüfen
    if (
      !firstName.trim() ||
      !lastName.trim() ||
      !email.trim() ||
      !password.trim() ||
      !confirmPassword.trim()
    ) {
      this.message = 'Alle Felder müssen ausgefüllt werden.';
      this.messageColor = 'red';
      return;
    }

    // E-Mail prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      this.message = 'Bitte eine gültige E-Mail-Adresse eingeben.';
      this.messageColor = 'red';
      return;
    }

    // Passwort prüfen
    if (password.length < 8) {
      this.message = 'Das Passwort muss mindestens 8 Zeichen lang sein.';
      this.messageColor = 'red';
      return;
    }

    // Passwortvergleich
    if (password !== confirmPassword) {
      this.message = 'Die Passwörter stimmen nicht überein.';
      this.messageColor = 'red';
      return;
    }

    // Firebase Registrierung
    const auth = getAuth();

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log('Firebase User erstellt:', userCredential.user);

      // optional: lokale Speicherung (ohne Passwort wäre besser!)
      this.user = {
        firstName,
        lastName,
        email,
        password
      };

      this.message = 'Registrierung erfolgreich!';
      this.messageColor = 'green';

      console.log('Gespeicherter Benutzer:', this.user);

      // Weiterleitung
      this.router.navigate(['/role-selection']);

    } catch (error) {
      console.error('Firebase Fehler:', error);

      this.message = 'Registrierung fehlgeschlagen';
      this.messageColor = 'red';
    }
  }
}
