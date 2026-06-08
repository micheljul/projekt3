import {Component} from '@angular/core';
import {Router} from '@angular/router';
import {createUserWithEmailAndPassword} from 'firebase/auth';
import {doc, setDoc} from 'firebase/firestore';
import {auth, db} from '../firebase.config';

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
    console.log('REGISTER BUTTON GEKLICKT');

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

    try {
      // 1. Firebase Auth User erstellen
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      const firebaseUser = userCredential.user;

      console.log('Auth User erstellt:', firebaseUser.uid);

      // 2. Firestore User-Daten speichern
      await setDoc(doc(db, 'users', firebaseUser.uid), {
        firstName: firstName,
        lastName: lastName,
        email: email,
        createdAt: new Date()
      });

      this.message = 'Registrierung erfolgreich!';
      this.messageColor = 'green';

      // kleine Verzögerung für UX
      setTimeout(() => {
        this.router.navigate(['/role-selection']);
      }, 800);

    } catch (error) {
      console.error('Firebase Fehler:', error);

      this.message = 'Registrierung fehlgeschlagen';
      this.messageColor = 'red';
    }
  }
}
