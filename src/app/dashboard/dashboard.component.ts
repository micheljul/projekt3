import {Component, inject} from '@angular/core';
import {collection, Firestore, onSnapshot, doc, getDoc} from '@angular/fire/firestore';
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


    // 🔍 DIMMING & SORTIEREN
    this.schuelerListe$ = combineLatest([roheSchueler$, this.suchBegriff$]).pipe(
      map(([schueler, begriff]) => {
        // 1. Status berechnen (Dimmed oder nicht)
        const liste = schueler.map(s => ({
          ...s,
          isDimmed: begriff.length > 0 && !s.name?.toLowerCase().includes(begriff.toLowerCase())
        }));

        // 2. Sortieren: Die Treffer (isDimmed = false) kommen nach oben
        return liste.sort((a, b) => {
          if (a.isDimmed === b.isDimmed) return 0; // Gleicher Status, Reihenfolge beibehalten
          return a.isDimmed ? 1 : -1; // Wenn a gedimmt ist, schieb es nach unten (1), sonst nach oben (-1)
        });
      })
    );

// Genau das Gleiche für die Lehrer
    this.lehrerListe$ = combineLatest([roheLehrer$, this.suchBegriff$]).pipe(
      map(([lehrer, begriff]) => {
        const liste = lehrer.map(l => ({
          ...l,
          isDimmed: begriff.length > 0 && !l.name?.toLowerCase().includes(begriff.toLowerCase())
        }));

        return liste.sort((a, b) => {
          if (a.isDimmed === b.isDimmed) return 0;
          return a.isDimmed ? 1 : -1;
        });
      })
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

  // 👤 MEIN PROFIL
  async oeffneMeinProfil() {
    const user = auth.currentUser;

    if (!user) {
      alert('Niemand ist eingeloggt!');
      return;
    }

    const uid = user.uid;
    let profilDaten = null;
    let zielRoute = '';

    // 1. Prüfen, ob der User in der Schüler-Sammlung ist
    const schuelerRef = doc(this.firestore, 'schueler_profile', uid);
    const schuelerSnap = await getDoc(schuelerRef);

    if (schuelerSnap.exists()) {
      profilDaten = { id: schuelerSnap.id, ...schuelerSnap.data() };
      zielRoute = '/schueler-detail';
    } else {
      // 2. Falls nicht, prüfen ob er in der Lehrer-Sammlung ist
      const lehrerRef = doc(this.firestore, 'lehrer_profile', uid);
      const lehrerSnap = await getDoc(lehrerRef);

      if (lehrerSnap.exists()) {
        profilDaten = { id: lehrerSnap.id, ...lehrerSnap.data() };
        zielRoute = '/lehrer-detail';
      }
    }

    // 3. Navigation mit den geladenen Daten
    if (profilDaten && zielRoute) {
      this.router.navigate([zielRoute], {
        state: {
          profil: profilDaten,
          darfBearbeiten: true // Schaltet Bearbeitungs-Buttons frei
        }
      });
    } else {
      alert('Profil nicht gefunden. Hast du dein Profil beim Registrieren gespeichert?');
    }
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
