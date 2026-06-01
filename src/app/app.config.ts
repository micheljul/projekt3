import { ApplicationConfig, provideBrowserGlobalErrorListeners } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDIMP1yzTEnbdK0j0mx-OnLV0sqa13Yfk",
  authDomain: "projekt3-8baec.firebaseapp.com",
  projectId: "projekt3-8baec",
  storageBucket: "projekt3-8baec.firebasestorage.app",
  messagingSenderId: "993252235161",
  appId: "1:993252235161:web:80f29b82943c2a21d36508",
  measurementId: "G-0FZ4EJK78P"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideRouter(routes),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore())
  ]
};
