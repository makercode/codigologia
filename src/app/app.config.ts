import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAnalytics, provideAnalytics, ScreenTrackingService } from '@angular/fire/analytics';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { provideMarkdown } from 'ngx-markdown';
import { provideHttpClient } from '@angular/common/http';

import { FirebaseBlogPostRepository } from './core/repositories/firebase.blogPost.repository';
import { BlogPostRepository } from './core/repositories/blogPost.repository';



const REPOSITORY_MAP = {
  firebase: FirebaseBlogPostRepository,
  /*
  mongo: MongoBlogPostRepository,
  sql: SqlBlogPostRepository,
  wordpress: WpBlogPostRepository,
  */
};

export const appConfig: ApplicationConfig = {
  providers: [

    provideHttpClient(),
    provideMarkdown(),
    provideZoneChangeDetection(
      { eventCoalescing: true }
    ), 
    provideRouter(routes), 
    provideAnimationsAsync(),
    provideFirebaseApp(
      () => initializeApp(
      {
        projectId: "codigologia-codesectarian", 
        appId: "1:1061106265584:web:c775717880b11675214135", 
        storageBucket: "codigologia-codesectarian.firebasestorage.app", 
        apiKey: "AIzaSyDC30Tv_x0Y-fo7UjqGWuUyEmzRJjgtc2A", 
        authDomain: "codigologia-codesectarian.firebaseapp.com",
        messagingSenderId: "1061106265584", measurementId: "G-NYSHTNPKBZ" 
      })
    ), 
    provideAnalytics(() => getAnalytics()), 
    ScreenTrackingService, provideFirestore(() => getFirestore()),
    [
      { 
        provide: BlogPostRepository,
        useClass: REPOSITORY_MAP["firebase"]
      },
    ],
  ]
};
