import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getDatabase, provideDatabase } from '@angular/fire/database';
import { provideFirestore, Firestore } from '@angular/fire/firestore';  // Import Firestore from Firebase
import { getFirestore } from 'firebase/firestore';

export const appConfig: ApplicationConfig = {
  
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() =>
      initializeApp({
        apiKey: 'AIzaSyA8AoaDkFEHkyKF4zUPPgsrVwJQ0aIluyg',
        authDomain: 'messagerie-angular.firebaseapp.com',
        projectId: 'messagerie-angular',
        storageBucket: 'messagerie-angular.firebasestorage.app',
        messagingSenderId: '215383210469',
        appId: '1:215383210469:web:6c6026c89d15251d20170c',
        measurementId: 'G-M435K9CDG6',
      })
    ),
    
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),  // Pass the Firestore instance here
  ],
};
