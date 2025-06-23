import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { map, Observable } from 'rxjs';
import { BlogPost } from '../../interfaces/blog-post';


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
