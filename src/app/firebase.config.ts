import {initializeApp} from 'firebase/app';
import {getAuth} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyBDIMP1yzTEnbdK0j0mx-OnLV0sqa13Yfk",
  authDomain: "projekt3-8baec.firebaseapp.com",
  projectId: "projekt3-8baec",
  storageBucket: "projekt3-8baec.firebasestorage.app",
  messagingSenderId: "993252235161",
  appId: "1:993252235161:web:80f29b82943c2a21d36508",

};

// Firebase App initialisieren
const app = initializeApp(firebaseConfig);

// Exportieren
export const auth = getAuth(app);
export const db = getFirestore(app);
