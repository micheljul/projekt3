import { Component } from '@angular/core';

@Component({
  selector: 'app-registrieren',
  standalone: true,
  imports: [],
  templateUrl: './registrieren.component.html',
  styleUrl: './registrieren.component.scss',
})
export class RegistrierenComponent {
  message = '';
  messageColor = 'black';

  register(
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  ) {

    // Pflichtfelder
    if (
      !firstName ||
      !lastName ||
      !email ||
      !password ||
      !confirmPassword
    ) {
      this.message = 'Alle Felder müssen ausgefüllt werden.';
      this.messageColor = 'red';
      return;
    }

    // Email prüfen
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      this.message = 'Bitte eine gültige E-Mail-Adresse eingeben.';
      this.messageColor = 'red';
      return;
    }

    // Passwortlänge
    if (password.length < 8) {
      this.message = 'Das Passwort muss mindestens 8 Zeichen haben.';
      this.messageColor = 'red';
      return;
    }

    // Großbuchstabe
    if (!/[A-Z]/.test(password)) {
      this.message = 'Das Passwort muss mindestens einen Großbuchstaben enthalten.';
      this.messageColor = 'red';
      return;
    }

    // Zahl
    if (!/\d/.test(password)) {
      this.message = 'Das Passwort muss mindestens eine Zahl enthalten.';
      this.messageColor = 'red';
      return;
    }

    // Passwortvergleich
    if (password !== confirmPassword) {
      this.message = 'Die Passwörter stimmen nicht überein.';
      this.messageColor = 'red';
      return;
    }

    this.message = 'Registrierung erfolgreich!';
    this.messageColor = 'green';
  }

}
