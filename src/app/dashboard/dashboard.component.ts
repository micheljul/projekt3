import { Component, inject } from '@angular/core';
import { Firestore, collection, onSnapshot } from '@angular/fire/firestore'; // collectionData entfernt, onSnapshot hinzugefügt
import { Observable } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {
  private firestore: Firestore = inject(Firestore);

  schuelerListe$: Observable<any[]>;
  lehrerListe$: Observable<any[]>;

  constructor() {
    // 1. Schüler-Liste live laden
    const schuelerCollection = collection(this.firestore, 'schueler_profile');
    this.schuelerListe$ = new Observable(observer => {
      return onSnapshot(schuelerCollection, (snapshot) => {
        const daten = snapshot.docs.map(doc => doc.data());
        observer.next(daten);
      });
    });

    // 2. Lehrer-Liste live laden
    const lehrerCollection = collection(this.firestore, 'lehrer_profile');
    this.lehrerListe$ = new Observable(observer => {
      return onSnapshot(lehrerCollection, (snapshot) => {
        const daten = snapshot.docs.map(doc => doc.data());
        observer.next(daten);
      });
    });
  }
}
