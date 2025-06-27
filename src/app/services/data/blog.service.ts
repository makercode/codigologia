import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BlogPost } from '../../interfaces/blog-post';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private firestore: Firestore) {}

  storedBlogPosts:BlogPost[] = [];

  async getBlogPosts(): Promise<BlogPost[]> {
    console.log("called getBlogPosts");
    const blogCollection = collection(this.firestore, 'blog');
    
    try {
      // Convertimos el Observable a Promise
      const data = await firstValueFrom(
        collectionData(blogCollection, { idField: 'id' }).pipe(
          map(data => {
            console.log("data from firebase", data);
            if (!data) return [];
            return Array.isArray(data) ? data : [data];
          })
        )
      );
      
      return data as BlogPost[];
    } catch (error) {
      console.error("Error fetching blog posts:", error);
      return []; // Retorna array vacío en caso de error
    }
  }

  async storeBlogPosts() {
    console.log("called storeBlogPosts")
    if( !this.isBlogPostStored() ) {

      let blogPosts = await this.getBlogPosts();
      localStorage.setItem('storedBlogPosts', JSON.stringify(blogPosts))

      /*
      this.getBlogPosts().subscribe({
        next: (data) => {
          console.log('Datos recibidos:', data);
          // this.posts$ = data;
          localStorage.setItem('storedBlogPosts', JSON.stringify(data))
        },
        error: (err) => console.error('Error:', err)
      });
      */
      
    }
  }

  async getStoredBlogPosts() {
    console.log("called getStoredBlogPosts")
    if( !this.isBlogPostStored() ) {
      console.log("compile storedBlogPosts", localStorage.getItem('storedBlogPosts'))
      await this.storeBlogPosts()
      return this.getLocalStorageBlogPosts()
    }
    console.log("show storedBlogPosts", localStorage.getItem('storedBlogPosts'))
    return this.getLocalStorageBlogPosts()
  }




  getLocalStorageBlogPosts() {
    let storedData = localStorage.getItem('storedBlogPosts');
    if(storedData){
      return JSON.parse(storedData);
    } else {
      return []
    }
  }

  isBlogPostStored():Boolean {
    console.log("called isBlogPostStored")
    if(localStorage.getItem('storedBlogPosts')) {
      return true
    }
    return false
  }

}
