import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { firstValueFrom, map, Observable } from 'rxjs';
import { BlogPost } from '../../domain/blogPost.model';
import { BlogPostRepository } from '../../repositories/blogPost.repository';
import { FirebaseBlogPostRepository } from '../../repositories/firebase.blogPost.repository';


@Injectable({
  providedIn: 'root'
})
export class BlogService {
  constructor(private firestore: Firestore, private blogPostRepository: BlogPostRepository) {}

  storedBlogPosts:BlogPost[] = [];

  async getBlogPosts(): Promise<BlogPost[]> {
    console.log("called getBlogPosts");
    
    try {
      const data = await this.blogPostRepository.getBlogPosts();
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

  

  async getStoredBlogPost(slug:string) {
    if( !this.isBlogPostStored( )) {
      await this.storeBlogPosts()
    }
    let posts = await this.getStoredBlogPosts()
    let post = posts.find((post: BlogPost) => post.slug === slug)
    return post
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
