import {Component, inject} from '@angular/core';
import {collection, Firestore, onSnapshot} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {signOut} from '@angular/fire/auth';
import {auth} from '../firebase.config'; // Router hinzugefügt

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private firestore: Firestore = inject(Firestore);

  // Ein kleiner Stream, der sich merkt, was du eintippst
  suchBegriff$ = new BehaviorSubject<string>('');

  schuelerListe$: Observable<any[]>;
  lehrerListe$: Observable<any[]>;

  constructor(private router: Router) {
    // 1. Rohdaten aus Firebase holen (Schüler)
    const schuelerCollection = collection(this.firestore, 'schueler_profile');
    const roheSchueler$ = new Observable<any[]>(observer => {
      return onSnapshot(schuelerCollection, (snapshot) => {
        observer.next(snapshot.docs.map(doc => ({id: doc.id, ...doc.data()})));
      });
    });

    // 2. Rohdaten aus Firebase holen (Lehrer)
    const lehrerCollection = collection(this.firestore, 'lehrer_profile');
    const roheLehrer$ = new Observable<any[]>(observer => {
      return onSnapshot(lehrerCollection, (snapshot) => {
        observer.next(snapshot.docs.map(doc => doc.data()));
      });
    });

    // 3. Live-Filterung: Wenn Suchbegriff leer ist, wird ALLES angezeigt
    this.schuelerListe$ = combineLatest([roheSchueler$, this.suchBegriff$]).pipe(
      map(([schueler, begriff]) =>
        schueler.filter(s => s.name?.toLowerCase().includes(begriff.toLowerCase()))
      )
    );

    this.lehrerListe$ = combineLatest([roheLehrer$, this.suchBegriff$]).pipe(
      map(([lehrer, begriff]) =>
        lehrer.filter(l => l.name?.toLowerCase().includes(begriff.toLowerCase()))
      )
    );
  }

  // Diese Funktion wird aufgerufen, wenn du tippst
  aufSucheEingabe(event: any) {
    this.suchBegriff$.next(event.target.value);
  }

  // HIER IST DIE FEHLENDE FUNKTION:
  oeffneSchuelerDetails(schuelerDaten: any) {
    console.log("Klick wurde registriert!", schuelerDaten);
    this.router.navigate(['/schueler-detail'], {state: {profil: schuelerDaten}});
  }

  async logout() {

    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout Fehler:', error);

    }

  }
}
