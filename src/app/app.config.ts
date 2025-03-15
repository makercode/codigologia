import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), provideAnimationsAsync(), provideFirebaseApp(() => initializeApp({"projectId":"codigologia-codesectarian","appId":"1:1061106265584:web:0776ead1abe5fd12214135","storageBucket":"codigologia-codesectarian.firebasestorage.app","apiKey":"AIzaSyDC30Tv_x0Y-fo7UjqGWuUyEmzRJjgtc2A","authDomain":"codigologia-codesectarian.firebaseapp.com","messagingSenderId":"1061106265584","measurementId":"G-H1FCW7LTFX"})), provideAnalytics(() => getAnalytics()), ScreenTrackingService, provideFirestore(() => getFirestore())]
};
