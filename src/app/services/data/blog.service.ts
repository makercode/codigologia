import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';

interface BlogPost {
  Extract: string;
  blog: string;
  date: any; // O usa firestore.Timestamp si importas el tipo
  image: string;
  markdown: string;
  slug: string;
  title: string;
  tags: any;
}

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  getBlogPosts(): Observable<BlogPost[]> {
    const blogCollection = collection(this.firestore, 'blog');
    
    return collectionData(blogCollection, { idField: 'id' }).pipe(
      map(data => {
        console.log("data from firebase", data);
        // Asegura que siempre sea un array
        if (!data) return [];
        return Array.isArray(data) ? data : [data];
      })
    ) as Observable<BlogPost[]>;
  }
}
