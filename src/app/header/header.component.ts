import {Component, inject, Input} from '@angular/core';
import {auth} from '../firebase.config';
import {Router} from '@angular/router';
import {collection, Firestore, getDocs, query, where} from '@angular/fire/firestore';
import {signOut} from '@angular/fire/auth';

@Component({
  selector: 'app-header',
  standalone: true,
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {

  @Input() showDashboardButtons = false;

  private firestore: Firestore = inject(Firestore);

  constructor(private router: Router) {
  }

  async oeffneProfil() {

    const user = auth.currentUser;

    if (!user) {
      alert('Nicht eingeloggt');
      return;
    }

    console.log('🔥 User:', user.email);

    const email = user.email;

    if (!email) {
      alert('Keine Email im Login gefunden');
      return;
    }

    let profilDaten: any = null;
    let zielRoute = '';

    // 🔍 SCHÜLER
    const schuelerRef = collection(this.firestore, 'schueler_profile');
    const schuelerQ = query(schuelerRef, where('email', '==', email));
    const schuelerSnap = await getDocs(schuelerQ);

    console.log('📘 Schüler gefunden:', schuelerSnap.size);

    if (!schuelerSnap.empty) {

      const data = schuelerSnap.docs[0];

      profilDaten = {
        id: data.id,
        ...data.data()
      };

      zielRoute = '/schueler-detail';
    }

    // 🔍 LEHRER
    else {
      const lehrerRef = collection(this.firestore, 'lehrer_profile');
      const lehrerQ = query(lehrerRef, where('email', '==', email));
      const lehrerSnap = await getDocs(lehrerQ);

      console.log('📗 Lehrer gefunden:', lehrerSnap.size);

      if (!lehrerSnap.empty) {

        const data = lehrerSnap.docs[0];

        profilDaten = {
          id: data.id,
          ...data.data()
        };

        zielRoute = '/lehrer-detail';
      }
    }

    console.log('👉 PROFIL:', profilDaten);

    if (profilDaten) {
      this.router.navigate([zielRoute], {
        state: {
          profil: profilDaten,
          darfBearbeiten: true
        }
      });
    } else {
      alert('❌ Profil nicht gefunden (Email stimmt nicht mit Firestore überein)');
    }
  }

  async logout() {
    await signOut(auth);
    this.router.navigate(['/login']);
  }
}
