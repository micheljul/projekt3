import {Component, inject} from '@angular/core';
import {collection, Firestore, onSnapshot} from '@angular/fire/firestore';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {AsyncPipe} from '@angular/common';
import {Router} from '@angular/router';
import {signOut} from '@angular/fire/auth';
import {auth} from '../firebase.config';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  private firestore: Firestore = inject(Firestore);

  suchBegriff$ = new BehaviorSubject<string>('');

  schuelerListe$: Observable<any[]>;
  lehrerListe$: Observable<any[]>;

  constructor(private router: Router) {

    // 👇 SCHÜLER
    const schuelerCollection = collection(this.firestore, 'schueler_profile');
    const roheSchueler$ = new Observable<any[]>(observer => {
      return onSnapshot(schuelerCollection, (snapshot) => {
        observer.next(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });
    });

    // 👇 LEHRER
    const lehrerCollection = collection(this.firestore, 'lehrer_profile');
    const roheLehrer$ = new Observable<any[]>(observer => {
      return onSnapshot(lehrerCollection, (snapshot) => {
        observer.next(snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data()
        })));
      });
    });

    // 🔍 FILTER SCHÜLER
    this.schuelerListe$ = combineLatest([roheSchueler$, this.suchBegriff$]).pipe(
      map(([schueler, begriff]) =>
        schueler.filter(s =>
          s.name?.toLowerCase().includes(begriff.toLowerCase())
        )
      )
    );

    // 🔍 FILTER LEHRER
    this.lehrerListe$ = combineLatest([roheLehrer$, this.suchBegriff$]).pipe(
      map(([lehrer, begriff]) =>
        lehrer.filter(l =>
          l.name?.toLowerCase().includes(begriff.toLowerCase())
        )
      )
    );
  }

  // 🔎 SEARCH
  aufSucheEingabe(event: any) {
    this.suchBegriff$.next(event.target.value);
  }

  // 👤 SCHÜLER DETAIL
  oeffneSchuelerDetails(schuelerDaten: any) {
    this.router.navigate(['/schueler-detail'], {
      state: {
        profil: schuelerDaten,
        darfBearbeiten: false
      }
    });
  }

  // 👨‍🏫 LEHRER DETAIL (NEU)
  oeffneLehrerDetails(lehrerDaten: any) {
    this.router.navigate(['/lehrer-detail'], {
      state: {
        profil: lehrerDaten,
        darfBearbeiten: false
      }
    });
  }

  // 👤 MEIN SCHÜLER PROFIL
  oeffneMeinProfil() {
    const meinProfil = {
      name: 'Mein Account',
      klasse: 'Meine Klasse'
    };

    this.router.navigate(['/schueler-detail'], {
      state: {
        profil: meinProfil,
        darfBearbeiten: true
      }
    });
  }

  // 🚪 LOGOUT
  async logout() {
    try {
      await signOut(auth);
      this.router.navigate(['/login']);
    } catch (error) {
      console.error('Logout Fehler:', error);
    }
  }
}
